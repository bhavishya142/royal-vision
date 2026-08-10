const pool = require("../config/db");

const getOverviewData = async () => {

    const totalMatchesQuery = `
        SELECT COUNT(*) AS total_matches
        FROM matches;
    `;

    const totalRunsQuery = `
        SELECT SUM(total_runs) AS total_runs
        FROM deliveries;
    `;

    const totalWicketsQuery = `
        SELECT SUM(is_wicket) AS total_wickets
        FROM deliveries;
    `;

    const totalFoursQuery = `
        SELECT COUNT(*) AS total_fours
        FROM deliveries
        WHERE batsman_runs = 4;
    `;

    const totalSixesQuery = `
        SELECT COUNT(*) AS total_sixes
        FROM deliveries
        WHERE batsman_runs = 6;
    `;

    const averageScoreQuery = `
        SELECT ROUND(AVG(team_score),2) AS average_score
        FROM (
            SELECT
                match_id,
                inning,
                SUM(total_runs) AS team_score
            FROM deliveries
            WHERE inning = 1
            GROUP BY match_id, inning
        ) scores;
    `;

    const matchesBySeasonQuery = `
    SELECT
        season,
        COUNT(*) AS matches
    FROM matches
    GROUP BY season
    ORDER BY season;
`;

const topRunScorerQuery = `
SELECT
    d.batter,

    SUM(d.batsman_runs) AS runs,

    COUNT(*) FILTER (
        WHERE d.batsman_runs = 4
    ) AS fours,

    COUNT(*) FILTER (
        WHERE d.batsman_runs = 6
    ) AS sixes,

    COUNT(DISTINCT d.match_id) AS matches,

    MAX(match_scores.player_score) AS highest_score,

    ROUND(
        SUM(d.batsman_runs)::numeric
        /
        NULLIF(
            COUNT(*) FILTER (
                WHERE d.is_wicket = 1
                AND d.player_dismissed = d.batter
            ),
            0
        ),
        2
    ) AS batting_average

FROM deliveries d

JOIN (
    SELECT
        match_id,
        batter,
        SUM(batsman_runs) AS player_score
    FROM deliveries
    GROUP BY
        match_id,
        batter
) match_scores

    ON d.match_id = match_scores.match_id
    AND d.batter = match_scores.batter

GROUP BY
    d.batter

ORDER BY
    runs DESC

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
            WHERE extras_type IS NULL
        ) AS legal_balls,

        COUNT(*) FILTER (
            WHERE extras_type IS NULL
            AND batsman_runs = 0
        ) AS dot_balls

    FROM deliveries

    GROUP BY
        bowler,
        match_id
),

bowler_totals AS (

    SELECT
        bowler,

        SUM(wickets_in_match) AS wickets,

        COUNT(DISTINCT match_id) AS matches,

        SUM(dot_balls) AS dot_balls,

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
        ) AS economy,

        ROUND(
            SUM(runs_conceded)::numeric
            /
            NULLIF(
                SUM(wickets_in_match),
                0
            ),
            2
        ) AS bowling_average

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

    bt.economy,

    bt.bowling_average,

    bt.dot_balls,

    bf.best_wickets,

    bf.best_runs

FROM bowler_totals bt

JOIN best_figures bf
    ON bt.bowler = bf.bowler

ORDER BY
    bt.wickets DESC

LIMIT 1;
`;
    const [
        matches,
        runs,
        wickets,
        fours,
        sixes,
        average,
    matchesBySeason,
    topRunScorer,
    topWicketTaker
    ] = await Promise.all([
        pool.query(totalMatchesQuery),
        pool.query(totalRunsQuery),
        pool.query(totalWicketsQuery),
        pool.query(totalFoursQuery),
        pool.query(totalSixesQuery),
        pool.query(averageScoreQuery),
        pool.query(matchesBySeasonQuery),
    pool.query(topRunScorerQuery),
    pool.query(topWicketTakerQuery)
    ]);

    return {
        totalMatches: Number(matches.rows[0].total_matches),
        totalRuns: Number(runs.rows[0].total_runs),
        totalWickets: Number(wickets.rows[0].total_wickets),
        totalFours: Number(fours.rows[0].total_fours),
        totalSixes: Number(sixes.rows[0].total_sixes),
        averageFirstInningsScore: Number(average.rows[0].average_score),
        matchesBySeason: matchesBySeason.rows.map(row => ({
    season: Number(row.season),
    matches: Number(row.matches)
})),

topRunScorer: {
    batter: topRunScorer.rows[0].batter,
    matches: Number(topRunScorer.rows[0].matches),
    runs: Number(topRunScorer.rows[0].runs),
    fours: Number(topRunScorer.rows[0].fours),
    sixes: Number(topRunScorer.rows[0].sixes),
     highestScore: Number(topRunScorer.rows[0].highest_score),
      battingAverage: Number(
        topRunScorer.rows[0].batting_average
    )
},

topWicketTaker: {
    bowler: topWicketTaker.rows[0].bowler,
    wickets: Number(topWicketTaker.rows[0].wickets),
    matches: Number(topWicketTaker.rows[0].matches),
    economy: Number(topWicketTaker.rows[0].economy),
     bowlingAverage: Number(
        topWicketTaker.rows[0].bowling_average
    ),
    dotBalls: Number(
        topWicketTaker.rows[0].dot_balls
    ),
    bestWickets: Number(topWicketTaker.rows[0].best_wickets),
    bestRuns: Number(topWicketTaker.rows[0].best_runs)

}
    };
};

module.exports = {
    getOverviewData
};