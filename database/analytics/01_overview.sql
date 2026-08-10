SELECT COUNT(*) FROM matches;

SELECT SUM(total_runs) FROM deliveries;

SELECT COUNT(*) FROM deliveries WHERE is_wicket=1;

SELECT COUNT(*) FROM deliveries WHERE batsman_runs=4;

SELECT COUNT(*) FROM deliveries WHERE batsman_runs=6;