-- ==========================================================
-- ROYAL VISION
-- Module 05 : Venue Analytics
-- ==========================================================
-- 1: Matches Played at Each Venue
SELECT
    venue,
    COUNT(*) AS matches_played
FROM matches
GROUP BY venue
ORDER BY matches_played DESC;


-- 2: Average First Innings Score by Venue
SELECT
    m.venue,
    ROUND(AVG(score),2) AS avg_first_innings_score
FROM (
    SELECT
        match_id,
        SUM(total_runs) AS score
    FROM deliveries
    WHERE inning = 1
    GROUP BY match_id
) d
JOIN matches m
ON d.match_id = m.id
GROUP BY m.venue
ORDER BY avg_first_innings_score DESC;

-- 3: Highest Team Total at Each Venue

SELECT
    m.venue,
    MAX(score) AS highest_score
FROM (
    SELECT
        match_id,
        inning,
        SUM(total_runs) AS score
    FROM deliveries
    GROUP BY match_id, inning
) d
JOIN matches m
ON d.match_id = m.id
GROUP BY m.venue
ORDER BY highest_score DESC;

-- 4: Lowest Team Total at Each Venue


SELECT
    m.venue,
    MIN(score) AS lowest_score
FROM (
    SELECT
        match_id,
        inning,
        SUM(total_runs) AS score
    FROM deliveries
    GROUP BY match_id, inning
) d
JOIN matches m
ON d.match_id = m.id
GROUP BY m.venue
ORDER BY lowest_score;


-- 5: Chasing Success by Venue

SELECT
    venue,
    COUNT(*) FILTER (WHERE result = 'wickets') AS successful_chases,
    COUNT(*) AS total_matches,
    ROUND(
        COUNT(*) FILTER (WHERE result = 'wickets') * 100.0 /
        COUNT(*),
        2
    ) AS chase_success_percentage
FROM matches
GROUP BY venue
ORDER BY chase_success_percentage DESC;
