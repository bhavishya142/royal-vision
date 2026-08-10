-- ==========================================================
-- ROYAL VISION
-- Module 03 : Bowling Analytics
-- ==========================================================
-- 1. Purple Cap (Top Wicket Takers)
SELECT
    bowler,
    COUNT(*) AS wickets
FROM deliveries
WHERE is_wicket = 1
GROUP BY bowler
ORDER BY wickets DESC
LIMIT 10;

-- 2. Economy Rate (Minimum 120 Legal Balls)
SELECT
    bowler,
    COUNT(*) AS legal_balls,
    SUM(total_runs) AS runs_conceded,
    ROUND(
        SUM(total_runs) * 6.0 / COUNT(*),
        2
    ) AS economy
FROM deliveries
WHERE extras_type IS NULL
   OR extras_type <> 'wides'
GROUP BY bowler
HAVING COUNT(*) >= 120
ORDER BY economy ASC
LIMIT 10;

-- 3. Bowling Strike Rate
SELECT
    bowler,
    COUNT(*) AS legal_balls,
    COUNT(player_dismissed) AS wickets,
    ROUND(
        COUNT(*)::NUMERIC /
        NULLIF(COUNT(player_dismissed), 0),
        2
    ) AS bowling_strike_rate
FROM deliveries
GROUP BY bowler
HAVING COUNT(player_dismissed) >= 10
ORDER BY bowling_strike_rate ASC
LIMIT 10;

-- 4. Bowling Average

SELECT
    bowler,
    SUM(total_runs) AS runs_conceded,
    COUNT(player_dismissed) AS wickets,
    ROUND(
        SUM(total_runs)::NUMERIC /
        NULLIF(COUNT(player_dismissed), 0),
        2
    ) AS bowling_average
FROM deliveries
GROUP BY bowler
HAVING COUNT(player_dismissed) >= 10
ORDER BY bowling_average ASC
LIMIT 10;


-- 5. Most Dot Balls
SELECT
    bowler,
    COUNT(*) AS legal_balls,
    SUM(CASE WHEN total_runs = 0 THEN 1 ELSE 0 END) AS dot_balls
FROM deliveries
WHERE extras_type IS NULL
   OR extras_type <> 'wides'
GROUP BY bowler
ORDER BY dot_balls DESC
LIMIT 10;