-- ==========================================================
-- ROYAL VISION
-- Module 04 : Team Analytics
-- ==========================================================
-- 1: Matches Played by Each Team
SELECT
    team,
    COUNT(*) AS matches_played
FROM (
    SELECT team1 AS team FROM matches
    UNION ALL
    SELECT team2 AS team FROM matches
) t
GROUP BY team
ORDER BY matches_played DESC;

-- 2: Matches Won by Each Team
SELECT
    winner AS team,
    COUNT(*) AS wins
FROM matches
WHERE winner IS NOT NULL
GROUP BY winner
ORDER BY wins DESC;

-- 3: Win Percentage
WITH matches_played AS (
    SELECT
        team,
        COUNT(*) AS played
    FROM (
        SELECT team1 AS team FROM matches
        UNION ALL
        SELECT team2 AS team FROM matches
    ) t
    GROUP BY team
),
matches_won AS (
    SELECT
        winner AS team,
        COUNT(*) AS wins
    FROM matches
    WHERE winner IS NOT NULL
    GROUP BY winner
)

SELECT
    p.team,
    p.played,
    COALESCE(w.wins,0) AS wins,
    ROUND(
        COALESCE(w.wins,0) * 100.0 / p.played,
        2
    ) AS win_percentage
FROM matches_played p
LEFT JOIN matches_won w
ON p.team = w.team
ORDER BY win_percentage DESC;

-- 4: Toss Winner Also Won Match
SELECT
    COUNT(*) AS toss_match_same
FROM matches
WHERE toss_winner = winner;


-- 5: Toss Decision Distribution
SELECT
    toss_decision,
    COUNT(*) AS matches
FROM matches
GROUP BY toss_decision;

-- 6: Wins While Batting First vs Chasing
SELECT
    result,
    COUNT(*) AS matches
FROM matches
GROUP BY result;