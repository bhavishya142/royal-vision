const pool = require("../config/db");


const getBattingAnalysisData = async (team, season) => {

    let params = [team];
    let seasonFilter = "";

    if (season) {
        params.push(season);
        seasonFilter = "AND m.season = $2";
    }


    // =========================
    // BATTING KPIs
    // =========================

    const battingKpiQuery = `

        SELECT

            COALESCE(SUM(d.batsman_runs), 0) AS total_runs,

            COALESCE(
                SUM(
                    CASE
                        WHEN d.batsman_runs = 4
                        THEN 1
                        ELSE 0
                    END
                ),
                0
            ) AS fours,

            COALESCE(
                SUM(
                    CASE
                        WHEN d.batsman_runs = 6
                        THEN 1
                        ELSE 0
                    END
                ),
                0
            ) AS sixes

        FROM deliveries d

        JOIN matches m
            ON d.match_id = m.id

        WHERE d.batting_team = $1
        ${seasonFilter};

    `;


    // =========================
    // HIGHEST INDIVIDUAL SCORE
    // =========================

    const highestScoreQuery = `

        SELECT

            COALESCE(
                MAX(player_score),
                0
            ) AS highest_score

        FROM (

            SELECT

                d.match_id,

                d.batter,

                SUM(d.batsman_runs) AS player_score

            FROM deliveries d

            JOIN matches m
                ON d.match_id = m.id

            WHERE d.batting_team = $1
            ${seasonFilter}

            GROUP BY
                d.match_id,
                d.batter

        ) scores;

    `;


    // =========================
    // PLAYER BATTING STATS
    // =========================

    const playerStatsQuery = `

        SELECT

            d.batter,

            SUM(d.batsman_runs) AS runs,

            COUNT(*) FILTER (
                WHERE d.batsman_runs = 4
            ) AS fours,

            COUNT(*) FILTER (
                WHERE d.batsman_runs = 6
            ) AS sixes,

            COUNT(*) FILTER (
                WHERE d.extras_type IS NULL
            ) AS balls_faced,

            COUNT(*) FILTER (
                WHERE d.is_wicket = 1
                AND d.player_dismissed = d.batter
            ) AS dismissals

        FROM deliveries d

        JOIN matches m
            ON d.match_id = m.id

        WHERE d.batting_team = $1
        ${seasonFilter}

        GROUP BY d.batter

        ORDER BY runs DESC;

    `;


    // =========================
    // RUNS BY SEASON
    // =========================

    const seasonRunsQuery = `

        SELECT

            m.season,

            SUM(d.batsman_runs) AS runs

        FROM deliveries d

        JOIN matches m
            ON d.match_id = m.id

        WHERE d.batting_team = $1
        ${seasonFilter}

        GROUP BY m.season

        ORDER BY m.season;

    `;


    const [
        battingKpiResult,
        highestScoreResult,
        playerStatsResult,
        seasonRunsResult
    ] = await Promise.all([

        pool.query(
            battingKpiQuery,
            params
        ),

        pool.query(
            highestScoreQuery,
            params
        ),

        pool.query(
            playerStatsQuery,
            params
        ),

        pool.query(
            seasonRunsQuery,
            params
        )

    ]);


    // =========================
    // PROCESS PLAYER DATA
    // =========================

    const players = playerStatsResult.rows.map(row => {

        const runs = Number(row.runs);

        const balls = Number(
            row.balls_faced
        );

        const dismissals = Number(
            row.dismissals
        );


        const strikeRate =
            balls > 0
                ? Number(
                    (
                        (runs / balls) * 100
                    ).toFixed(2)
                )
                : 0;


        const average =
            dismissals > 0
                ? Number(
                    (
                        runs / dismissals
                    ).toFixed(2)
                )
                : runs;


        return {

            batter: row.batter,

            runs,

            fours: Number(row.fours),

            sixes: Number(row.sixes),

            ballsFaced: balls,

            dismissals,

            strikeRate,

            average

        };

    });


    // =========================
    // TEAM LEVEL KPIs
    // =========================

    const kpiRow =
        battingKpiResult.rows[0];


    const totalRuns =
        Number(kpiRow.total_runs);


    const totalFours =
        Number(kpiRow.fours);


    const totalSixes =
        Number(kpiRow.sixes);


    const highestScore =
        Number(
            highestScoreResult.rows[0].highest_score
        );


    // =========================
    // TEAM BALLS
    // =========================

    const totalBalls =
        players.reduce(
            (sum, player) =>
                sum + player.ballsFaced,
            0
        );


    // =========================
    // TEAM DISMISSALS
    // =========================

    const totalDismissals =
        players.reduce(
            (sum, player) =>
                sum + player.dismissals,
            0
        );


    // =========================
    // TEAM STRIKE RATE
    // =========================

    const strikeRate =
        totalBalls > 0
            ? Number(
                (
                    (totalRuns / totalBalls) *
                    100
                ).toFixed(2)
            )
            : 0;


    // =========================
    // TEAM BATTING AVERAGE
    // =========================

    const average =
        totalDismissals > 0
            ? Number(
                (
                    totalRuns /
                    totalDismissals
                ).toFixed(2)
            )
            : 0;


    // =========================
    // FINAL RESPONSE
    // =========================

    return {

        team,

        season:
            season || "All Seasons",

        kpis: {

            totalRuns,

            highestScore,

            average,

            strikeRate,

            fours: totalFours,

            sixes: totalSixes

        },

        topRunScorers:
            players.slice(0, 10),

        seasonRuns:
            seasonRunsResult.rows.map(row => ({

                season: Number(row.season),

                runs: Number(row.runs)

            }))

    };

};


module.exports = {

    getBattingAnalysisData

};