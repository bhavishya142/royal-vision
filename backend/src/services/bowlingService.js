const pool = require("../config/db");

const getBowlingAnalysisData = async (team, season) => {

    let params = [team];
    let seasonFilter = "";

    if (season) {
        params.push(season);
        seasonFilter = "AND m.season = $2";
    }


    // =========================
    // BOWLING PLAYER STATS
    // =========================

    const bowlerStatsQuery = `

        SELECT

            d.bowler,

            COUNT(*) FILTER (
                WHERE d.is_wicket = 1
                AND d.dismissal_kind NOT IN (
                    'run out',
                    'retired hurt',
                    'obstructing the field'
                )
            ) AS wickets,

            SUM(d.total_runs) AS runs_conceded,

            COUNT(*) FILTER (
                WHERE d.total_runs = 0
                AND d.extras_type IS NULL
            ) AS dot_balls,

            COUNT(*) FILTER (
                WHERE d.extras_type IS NULL
            ) AS legal_balls

        FROM deliveries d

        JOIN matches m
            ON d.match_id = m.id

        WHERE d.bowling_team = $1

        ${seasonFilter}

        GROUP BY d.bowler

        ORDER BY wickets DESC;

    `;


    // =========================
    // WICKETS BY SEASON
    // =========================

    const wicketsBySeasonQuery = `

        SELECT

            m.season,

            COUNT(*) FILTER (
                WHERE d.is_wicket = 1
                AND d.dismissal_kind NOT IN (
                    'run out',
                    'retired hurt',
                    'obstructing the field'
                )
            ) AS wickets

        FROM deliveries d

        JOIN matches m
            ON d.match_id = m.id

        WHERE d.bowling_team = $1

        ${seasonFilter}

        GROUP BY m.season

        ORDER BY m.season;

    `;


    // =========================
    // BOWLING KPI DATA
    // =========================

    const bowlingKpiQuery = `

        SELECT

            COUNT(*) FILTER (
                WHERE d.is_wicket = 1
                AND d.dismissal_kind NOT IN (
                    'run out',
                    'retired hurt',
                    'obstructing the field'
                )
            ) AS total_wickets,

            SUM(d.total_runs) AS total_runs_conceded,

            COUNT(*) FILTER (
                WHERE d.extras_type IS NULL
            ) AS legal_balls,

            COUNT(*) FILTER (
                WHERE d.total_runs = 0
                AND d.extras_type IS NULL
            ) AS dot_balls

        FROM deliveries d

        JOIN matches m
            ON d.match_id = m.id

        WHERE d.bowling_team = $1

        ${seasonFilter};

    `;


    const [
        bowlerStatsResult,
        wicketsBySeasonResult,
        bowlingKpiResult
    ] = await Promise.all([

        pool.query(
            bowlerStatsQuery,
            params
        ),

        pool.query(
            wicketsBySeasonQuery,
            params
        ),

        pool.query(
            bowlingKpiQuery,
            params
        )

    ]);


    // =========================
    // PROCESS BOWLER DATA
    // =========================

    const bowlers = bowlerStatsResult.rows.map(row => {

        const wickets = Number(row.wickets);
        const runsConceded = Number(row.runs_conceded || 0);
        const legalBalls = Number(row.legal_balls || 0);
        const dotBalls = Number(row.dot_balls || 0);

        const overs = Math.floor(legalBalls / 6);

        const balls = legalBalls % 6;

        const oversDisplay = `${overs}.${balls}`;

        const economy =
            legalBalls > 0
                ? Number(
                    (
                        runsConceded /
                        (legalBalls / 6)
                    ).toFixed(2)
                )
                : 0;

        return {

            bowler: row.bowler,

            wickets,

            runsConceded,

            legalBalls,

            overs: oversDisplay,

            economy,

            dotBalls

        };

    });


    // =========================
    // TEAM LEVEL KPIs
    // =========================

    const kpiRow = bowlingKpiResult.rows[0];

    const totalWickets =
        Number(kpiRow.total_wickets || 0);

    const totalRunsConceded =
        Number(kpiRow.total_runs_conceded || 0);

    const totalLegalBalls =
        Number(kpiRow.legal_balls || 0);

    const totalDotBalls =
        Number(kpiRow.dot_balls || 0);


    const dotBallPercentage =
    totalLegalBalls > 0
        ? Number(
            (
                (totalDotBalls / totalLegalBalls) * 100
            ).toFixed(2)
        )
        : 0;

    const totalOvers =
        totalLegalBalls / 6;


    const economy =
        totalLegalBalls > 0
            ? Number(
                (
                    totalRunsConceded /
                    totalOvers
                ).toFixed(2)
            )
            : 0;


    // =========================
    // BEST BOWLING FIGURES
    // =========================

    const bestBowler =
        bowlers.length > 0
            ? bowlers[0]
            : null;


    // =========================
    // FINAL RESPONSE
    // =========================

    return {

        team,

        season: season || "All Seasons",

        kpis: {

    totalWickets,

    totalRunsConceded,

    totalOvers: Number(
        totalOvers.toFixed(1)
    ),

    economy,

    dotBalls: totalDotBalls,

    dotBallPercentage,

    bestBowler: bestBowler
        ? bestBowler.bowler
        : "N/A",

    bestBowlerWickets: bestBowler
        ? bestBowler.wickets
        : 0

},

        topWicketTakers:
            bowlers.slice(0, 10),


        wicketsBySeason:
            wicketsBySeasonResult.rows.map(row => ({

                season: Number(row.season),

                wickets: Number(row.wickets)

            }))

    };

};


module.exports = {

    getBowlingAnalysisData

};