const pool = require("../config/db");

const getTeamAnalysisData = async (team, season) => {

    let params = [team];
    let seasonFilter = "";

    if (season) {
        params.push(season);
        seasonFilter = "AND season = $2";
    }

    const matchesQuery = `
        SELECT
            COUNT(*) AS matches,
            SUM(CASE WHEN winner = $1 THEN 1 ELSE 0 END) AS wins,
            SUM(CASE WHEN winner <> $1 AND winner IS NOT NULL THEN 1 ELSE 0 END) AS losses
        FROM matches
        WHERE (team1 = $1 OR team2 = $1)
        ${seasonFilter};
    `;

    const highestScoreQuery = `
        SELECT MAX(team_score) AS highest_score
        FROM (
            SELECT
                match_id,
                batting_team,
                SUM(total_runs) AS team_score
            FROM deliveries
            GROUP BY match_id, batting_team
        ) scores
        WHERE batting_team = $1;
    `;

    const winsBySeasonQuery = `
    SELECT
        season,
        COUNT(*) AS wins
    FROM matches
    WHERE winner = $1
    GROUP BY season
    ORDER BY season;
    `;

    const venuePerformanceQuery = `
    SELECT
        venue,
        COUNT(*) AS matches,
        SUM(CASE WHEN winner = $1 THEN 1 ELSE 0 END) AS wins
    FROM matches
    WHERE team1 = $1
       OR team2 = $1
    GROUP BY venue
    HAVING COUNT(*) >= 2
    ORDER BY
        (SUM(CASE WHEN winner = $1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) DESC
    LIMIT 10;
`;

    const tossDecisionQuery = `
    SELECT
        toss_decision,
        COUNT(*) AS matches,
        SUM(CASE WHEN winner = $1 THEN 1 ELSE 0 END) AS wins
    FROM matches
    WHERE team1 = $1
       OR team2 = $1
    GROUP BY toss_decision
    ORDER BY matches DESC;
    `;


    const opponentPerformanceQuery = `
SELECT

    CASE
        WHEN team1 = $1 THEN team2
        ELSE team1
    END AS opponent,

    COUNT(*) AS matches,

    SUM(
        CASE
            WHEN winner = $1 THEN 1
            ELSE 0
        END
    ) AS wins

FROM matches

WHERE team1 = $1
   OR team2 = $1

GROUP BY opponent

ORDER BY matches DESC;
`;

const topRunScorerQuery = `
WITH batter_match_stats AS (

    SELECT
        batter,
        match_id,

        SUM(batsman_runs) AS runs,

        COUNT(*) FILTER (
            WHERE extras_type IS NULL
        ) AS balls_faced

    FROM deliveries

    WHERE batting_team = $1

    GROUP BY batter, match_id
),

batter_totals AS (

    SELECT
        batter,

        SUM(runs) AS runs,

        COUNT(DISTINCT match_id) AS matches,

        MAX(runs) AS highest_score,

        SUM(balls_faced) AS balls_faced

    FROM batter_match_stats

    GROUP BY batter
),

batter_boundaries AS (

    SELECT
        batter,

        COUNT(*) FILTER (
            WHERE batsman_runs = 4
        ) AS fours,

        COUNT(*) FILTER (
            WHERE batsman_runs = 6
        ) AS sixes

    FROM deliveries

    WHERE batting_team = $1

    GROUP BY batter
),

batter_dismissals AS (

    SELECT
        player_dismissed AS batter,

        COUNT(*) AS dismissals

    FROM deliveries

    WHERE batting_team = $1
      AND is_wicket = 1
      AND player_dismissed IS NOT NULL

    GROUP BY player_dismissed
)

SELECT

    bt.batter,

    bt.runs,

    bt.matches,

    bt.highest_score,

    ROUND(
        bt.runs::numeric /
        NULLIF(bd.dismissals, 0),
        2
    ) AS batting_average,

    ROUND(
        bt.runs::numeric * 100 /
        NULLIF(bt.balls_faced, 0),
        2
    ) AS strike_rate,

    bb.fours,

    bb.sixes

FROM batter_totals bt

JOIN batter_boundaries bb
    ON bt.batter = bb.batter

LEFT JOIN batter_dismissals bd
    ON bt.batter = bd.batter

ORDER BY bt.runs DESC

LIMIT 1;
`;
const topWicketTakerQuery = `
WITH bowler_match_stats AS (

    SELECT
        bowler,
        match_id,

        COUNT(*) FILTER (
            WHERE is_wicket = 1
            AND dismissal_kind NOT IN (
                'run out',
                'retired hurt',
                'obstructing the field'
            )
        ) AS wickets_in_match,

        SUM(
            CASE
                WHEN extras_type IN ('wides', 'noballs')
                    THEN total_runs

                WHEN extras_type IN ('byes', 'legbyes')
                    THEN 0

                ELSE batsman_runs
            END
        ) AS runs_conceded,

        COUNT(*) FILTER (
            WHERE total_runs = 0
        ) AS dot_balls,

        COUNT(*) FILTER (
            WHERE extras_type IS NULL
        ) AS legal_balls

    FROM deliveries

    WHERE bowling_team = $1

    GROUP BY
        bowler,
        match_id
),

bowler_totals AS (

    SELECT

        bowler,

        SUM(wickets_in_match) AS wickets,

        COUNT(DISTINCT match_id) AS matches,

        SUM(runs_conceded) AS runs_conceded,

        SUM(dot_balls) AS dot_balls,

        COUNT(*) FILTER (
            WHERE wickets_in_match >= 3
        ) AS three_wicket_hauls,

        ROUND(
            (
                SUM(runs_conceded) * 6.0
            )
            /
            NULLIF(
                SUM(legal_balls),
                0
            ),
            2
        ) AS economy

    FROM bowler_match_stats

    GROUP BY bowler
),

best_figures AS (

    SELECT DISTINCT ON (bowler)

        bowler,

        wickets_in_match AS best_wickets,

        runs_conceded AS best_runs

    FROM bowler_match_stats

    ORDER BY
        bowler,
        wickets_in_match DESC,
        runs_conceded ASC
)

SELECT

    bt.bowler,

    bt.wickets,

    bt.matches,

    bf.best_wickets,

    bf.best_runs,

    bt.economy,

    ROUND(
        bt.runs_conceded::numeric
        /
        NULLIF(bt.wickets, 0),
        2
    ) AS bowling_average,

    bt.dot_balls,

    bt.three_wicket_hauls

FROM bowler_totals bt

JOIN best_figures bf
    ON bt.bowler = bf.bowler

ORDER BY
    bt.wickets DESC

LIMIT 1;
`;

    const matchResultsQuery = `
    SELECT
    season,

    CASE
        WHEN team1 = $1 THEN team2
        ELSE team1
    END AS opponent,

    venue,

    winner

    FROM matches

    WHERE team1 = $1
    OR team2 = $1

    ORDER BY date DESC

    LIMIT 10;
    `;

    const [
    matchesResult,
    highestResult,
    winsBySeasonResult,
    venueResult,
    tossResult,
    matchResult,
    opponentResult,
    topRunScorerResult,
    topWicketTakerResult
] = await Promise.all([
    pool.query(matchesQuery, params),
    pool.query(highestScoreQuery, [team]),
    pool.query(winsBySeasonQuery, [team]),
    pool.query(venuePerformanceQuery, [team]),
    pool.query(tossDecisionQuery, [team]),
    pool.query(matchResultsQuery, [team]),
pool.query(opponentPerformanceQuery, [team]),
pool.query(topRunScorerQuery, [team]),
pool.query(topWicketTakerQuery, [team])
]);
    const stats = matchesResult.rows[0];

    const matches = Number(stats.matches);
    const wins = Number(stats.wins);
    const losses = Number(stats.losses);

    return {
    kpis: {
        matches,
        wins,
        losses,
        winPercentage: matches ? Number(((wins / matches) * 100).toFixed(2)) : 0,
        highestScore: Number(highestResult.rows[0].highest_score || 0)
    },

    winsBySeason: winsBySeasonResult.rows.map(row => ({
    season: Number(row.season),
    wins: Number(row.wins)
    })),

    venuePerformance: venueResult.rows.map(row => ({
    venue: row.venue,
    matches: Number(row.matches),
    wins: Number(row.wins),
    winPercentage:
        Number(row.matches) === 0
            ? 0
            : Number(
                  (
                      (Number(row.wins) / Number(row.matches)) *
                      100
                  ).toFixed(2)
              )
    })),

    tossDecision: tossResult.rows.map(row => ({
    decision: row.toss_decision,
    matches: Number(row.matches),
    wins: Number(row.wins),
    winPercentage: Number(
        (
            (Number(row.wins) / Number(row.matches)) * 100
        ).toFixed(2)
    )
    })),


    opponentPerformance: opponentResult.rows.map(row => ({

    opponent: row.opponent,

    matches: Number(row.matches),

    wins: Number(row.wins),

    winPercentage: Number(

        (
            Number(row.wins) /
            Number(row.matches) *
            100

        ).toFixed(2)

    )

    })),

    matchResults: matchResult.rows.map(row => ({
    season: Number(row.season),
    opponent: row.opponent,
    venue: row.venue,
    winner: row.winner
    })),


   playerSpotlight: {

    team,

    topRunScorer: {
    batter: topRunScorerResult.rows[0]?.batter,

    runs: Number(
        topRunScorerResult.rows[0]?.runs || 0
    ),

    matches: Number(
        topRunScorerResult.rows[0]?.matches || 0
    ),

    highestScore: Number(
        topRunScorerResult.rows[0]?.highest_score || 0
    ),

    battingAverage: Number(
        topRunScorerResult.rows[0]?.batting_average || 0
    ),

    strikeRate: Number(
        topRunScorerResult.rows[0]?.strike_rate || 0
    ),

    fours: Number(
        topRunScorerResult.rows[0]?.fours || 0
    ),

    sixes: Number(
        topRunScorerResult.rows[0]?.sixes || 0
    )
},

    topWicketTaker: {
    bowler: topWicketTakerResult.rows[0]?.bowler,

    wickets: Number(
        topWicketTakerResult.rows[0]?.wickets || 0
    ),

    matches: Number(
        topWicketTakerResult.rows[0]?.matches || 0
    ),

    bestWickets: Number(
        topWicketTakerResult.rows[0]?.best_wickets || 0
    ),

    bestRuns: Number(
        topWicketTakerResult.rows[0]?.best_runs || 0
    ),

    economy: Number(
        topWicketTakerResult.rows[0]?.economy || 0
    ),

    bowlingAverage: Number(
        topWicketTakerResult.rows[0]?.bowling_average || 0
    ),

    dotBalls: Number(
        topWicketTakerResult.rows[0]?.dot_balls || 0
    ),

    threeWicketHauls: Number(
        topWicketTakerResult.rows[0]?.three_wicket_hauls || 0
    )
}

},


    };
};

module.exports = {
    getTeamAnalysisData
};