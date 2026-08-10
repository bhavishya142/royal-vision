const pool = require("../config/db");


const getVenueAnalysisData = async (team, season) => {

    let params = [team];
    let seasonFilter = "";

    if (season) {
        params.push(season);
        seasonFilter = "AND m.season = $2";
    }


    // =========================================
    // VENUE PERFORMANCE
    // =========================================

    const venuePerformanceQuery = `

        SELECT

            m.venue,

            COUNT(*) AS matches,

            SUM(
                CASE
                    WHEN m.winner = $1 THEN 1
                    ELSE 0
                END
            ) AS wins,

            SUM(
                CASE
                    WHEN m.winner IS NOT NULL
                    AND m.winner <> $1
                    THEN 1
                    ELSE 0
                END
            ) AS losses

        FROM matches m

        WHERE
            (m.team1 = $1 OR m.team2 = $1)

            ${seasonFilter}

        GROUP BY m.venue

        ORDER BY matches DESC;

    `;


    // =========================================
    // AVERAGE SCORE BY VENUE
    // =========================================

    const averageScoreQuery = `

        SELECT

            m.venue,

            ROUND(
                AVG(team_scores.team_score)::numeric,
                2
            ) AS average_score,

            MAX(team_scores.team_score) AS highest_score

        FROM matches m

        JOIN (

            SELECT

                d.match_id,

                d.batting_team,

                SUM(d.total_runs) AS team_score

            FROM deliveries d

            GROUP BY
                d.match_id,
                d.batting_team

        ) team_scores

            ON m.id = team_scores.match_id

        WHERE

            team_scores.batting_team = $1

            ${seasonFilter}

        GROUP BY m.venue

        ORDER BY m.venue;

    `;


    // =========================================
    // TOTAL VENUES
    // =========================================

    const totalVenuesQuery = `

        SELECT

            COUNT(DISTINCT m.venue) AS total_venues,

            COUNT(*) AS total_matches

        FROM matches m

        WHERE
            (m.team1 = $1 OR m.team2 = $1)

            ${seasonFilter};

    `;


    // =========================================
    // RUN ALL QUERIES
    // =========================================

    const [

        venuePerformanceResult,

        averageScoreResult,

        totalVenuesResult

    ] = await Promise.all([

        pool.query(
            venuePerformanceQuery,
            params
        ),

        pool.query(
            averageScoreQuery,
            params
        ),

        pool.query(
            totalVenuesQuery,
            params
        )

    ]);


    // =========================================
    // CREATE SCORE LOOKUP
    // =========================================

    const scoreMap = {};

    averageScoreResult.rows.forEach(row => {

        scoreMap[row.venue] = {

            averageScore:
                Number(row.average_score || 0),

            highestScore:
                Number(row.highest_score || 0)

        };

    });


    // =========================================
    // PROCESS VENUE DATA
    // =========================================

    const venues =
        venuePerformanceResult.rows.map(row => {

            const matches =
                Number(row.matches);

            const wins =
                Number(row.wins);

            const losses =
                Number(row.losses);

            const scoreData =
                scoreMap[row.venue] || {};


            return {

                venue: row.venue,

                matches,

                wins,

                losses,

                winPercentage:
                    matches > 0
                        ? Number(
                            (
                                (wins / matches) *
                                100
                            ).toFixed(2)
                        )
                        : 0,

                averageScore:
                    Number(
                        scoreData.averageScore || 0
                    ),

                highestScore:
                    Number(
                        scoreData.highestScore || 0
                    )

            };

        });


    // =========================================
    // BEST VENUE
    // =========================================

    const bestVenue =
        venues.length > 0
            ? [...venues].sort(
                (a, b) =>
                    b.winPercentage -
                    a.winPercentage
            )[0]
            : null;


    // =========================================
    // MOST PLAYED VENUE
    // =========================================

    const mostPlayedVenue =
        venues.length > 0
            ? [...venues].sort(
                (a, b) =>
                    b.matches -
                    a.matches
            )[0]
            : null;


    // =========================================
    // FINAL RESPONSE
    // =========================================

    return {

        team,

        season:
            season || "All Seasons",

        kpis: {

            totalVenues:
                Number(
                    totalVenuesResult
                        .rows[0]
                        .total_venues || 0
                ),

            totalMatches:
                Number(
                    totalVenuesResult
                        .rows[0]
                        .total_matches || 0
                ),

            bestVenue:
                bestVenue
                    ? bestVenue.venue
                    : "N/A",

            bestVenueWinPercentage:
                bestVenue
                    ? bestVenue.winPercentage
                    : 0,

            mostPlayedVenue:
                mostPlayedVenue
                    ? mostPlayedVenue.venue
                    : "N/A"

        },

        venuePerformance: venues

    };

};


module.exports = {

    getVenueAnalysisData

};