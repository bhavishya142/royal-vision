-- ==========================================================
-- ROYAL VISION
-- Module 02 : Batting Analytics
-- ==========================================================

--------------------------------------------------------------
-- 1. Orange Cap (Top 10 Run Scorers)
--------------------------------------------------------------

SELECT
    batter,
    SUM(batsman_runs) AS total_runs
FROM deliveries
GROUP BY batter
ORDER BY total_runs DESC
LIMIT 10;


--------------------------------------------------------------
-- 2. Top 10 Six Hitters
--------------------------------------------------------------

SELECT
    batter,
    COUNT(*) AS sixes
FROM deliveries
WHERE batsman_runs = 6
GROUP BY batter
ORDER BY sixes DESC
LIMIT 10;


--------------------------------------------------------------
-- 3. Top 10 Four Hitters
--------------------------------------------------------------

SELECT
    batter,
    COUNT(*) AS fours
FROM deliveries
WHERE batsman_runs = 4
GROUP BY batter
ORDER BY fours DESC
LIMIT 10;


--------------------------------------------------------------
-- 4. Strike Rate (Minimum 200 Balls)
--------------------------------------------------------------

SELECT
    batter,
    SUM(batsman_runs) AS runs,
    COUNT(*) AS balls_faced,
    ROUND(
        (SUM(batsman_runs) * 100.0) / COUNT(*),
        2
    ) AS strike_rate
FROM deliveries
WHERE extras_type IS NULL
   OR extras_type <> 'wides'
GROUP BY batter
HAVING COUNT(*) >= 200
ORDER BY strike_rate DESC
LIMIT 10;


--------------------------------------------------------------
-- 5. Batting Average (Minimum 200 Runs)
--------------------------------------------------------------

SELECT
    batter,
    SUM(batsman_runs) AS runs,
    COUNT(player_dismissed) AS dismissals,
    ROUND(
        SUM(batsman_runs)::numeric /
        NULLIF(COUNT(player_dismissed),0),
        2
    ) AS batting_average
FROM deliveries
GROUP BY batter
HAVING SUM(batsman_runs) >= 200
ORDER BY batting_average DESC
LIMIT 10;


--------------------------------------------------------------
-- 6. Dot Ball Percentage
--------------------------------------------------------------

SELECT
    batter,
    COUNT(*) AS balls_faced,
    SUM(CASE WHEN total_runs = 0 THEN 1 ELSE 0 END) AS dot_balls,
    ROUND(
        SUM(CASE WHEN total_runs = 0 THEN 1 ELSE 0 END) * 100.0 /
        COUNT(*),
        2
    ) AS dot_ball_percentage
FROM deliveries
WHERE extras_type IS NULL
   OR extras_type <> 'wides'
GROUP BY batter
HAVING COUNT(*) >= 200
ORDER BY dot_ball_percentage ASC
LIMIT 10;


--------------------------------------------------------------
-- 7. Boundary Percentage
--------------------------------------------------------------

SELECT
    batter,
    COUNT(*) AS balls_faced,
    SUM(CASE WHEN batsman_runs IN (4,6) THEN 1 ELSE 0 END) AS boundary_balls,
    ROUND(
        SUM(CASE WHEN batsman_runs IN (4,6) THEN 1 ELSE 0 END) * 100.0 /
        COUNT(*),
        2
    ) AS boundary_percentage
FROM deliveries
WHERE extras_type IS NULL
   OR extras_type <> 'wides'
GROUP BY batter
HAVING COUNT(*) >= 200
ORDER BY boundary_percentage DESC
LIMIT 10;


--------------------------------------------------------------
-- 8. Runs by Season
--------------------------------------------------------------

SELECT
    m.season,
    d.batter,
    SUM(d.batsman_runs) AS runs
FROM deliveries d
JOIN matches m
ON d.match_id = m.id
GROUP BY m.season, d.batter
ORDER BY m.season, runs DESC;


--------------------------------------------------------------
-- 9. Runs by Venue
--------------------------------------------------------------

SELECT
    m.venue,
    d.batter,
    SUM(d.batsman_runs) AS runs
FROM deliveries d
JOIN matches m
ON d.match_id = m.id
GROUP BY m.venue, d.batter
ORDER BY m.venue, runs DESC;