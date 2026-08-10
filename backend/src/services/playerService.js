const pool = require("../config/db");


const getPlayerAnalysisData = async (team, season) => {

    let params = [team];

    let seasonFilter = "";

    if (season) {

        params.push(season);

        seasonFilter = "AND m.season = $2";

    }


    // =====================================================
    // PLAYER BATTING + BOWLING STATISTICS
    // =====================================================

    const playerStatsQuery = `

        WITH team_matches AS (

            SELECT id

            FROM matches

            WHERE
                (team1 = $1 OR team2 = $1)
                ${seasonFilter}

        ),

        batting_stats AS (

            SELECT

                d.batter AS player,

                SUM(d.batsman_runs) AS runs,

                COUNT(*) FILTER (
                    WHERE d.extras_type IS NULL
                ) AS balls_faced,

                COUNT(*) FILTER (
                    WHERE d.batsman_runs = 4
                ) AS fours,

                COUNT(*) FILTER (
                    WHERE d.batsman_runs = 6
                ) AS sixes,

                COUNT(*) FILTER (
                    WHERE
                        d.is_wicket = 1
                        AND d.player_dismissed = d.batter
                ) AS dismissals

            FROM deliveries d

            JOIN team_matches tm
                ON d.match_id = tm.id

            WHERE
                d.batting_team = $1

            GROUP BY
                d.batter

        ),

        bowling_stats AS (

            SELECT

                d.bowler AS player,

                COUNT(*) FILTER (

                    WHERE
                        d.is_wicket = 1
                        AND d.player_dismissed IS NOT NULL
                        AND d.dismissal_kind NOT IN (
                            'run out',
                            'retired hurt',
                            'obstructing the field'
                        )

                ) AS wickets,

                SUM(d.total_runs) AS runs_conceded,

                COUNT(*) FILTER (
                    WHERE d.extras_type IS NULL
                    OR d.extras_type NOT IN (
                        'wides',
                        'noballs'
                    )
                ) AS legal_balls,

                COUNT(*) FILTER (
                    WHERE
                        d.total_runs = 0
                        AND (
                            d.extras_type IS NULL
                            OR d.extras_type NOT IN (
                                'wides',
                                'noballs'
                            )
                        )
                ) AS dot_balls

            FROM deliveries d

            JOIN team_matches tm
                ON d.match_id = tm.id

            WHERE
                d.bowling_team = $1

            GROUP BY
                d.bowler

        ),

        all_players AS (

            SELECT player
            FROM batting_stats

            UNION

            SELECT player
            FROM bowling_stats

        )

        SELECT

            p.player,

            COALESCE(b.runs, 0) AS runs,

            COALESCE(b.balls_faced, 0) AS balls_faced,

            COALESCE(b.fours, 0) AS fours,

            COALESCE(b.sixes, 0) AS sixes,

            COALESCE(b.dismissals, 0) AS dismissals,

            COALESCE(w.wickets, 0) AS wickets,

            COALESCE(w.runs_conceded, 0) AS runs_conceded,

            COALESCE(w.legal_balls, 0) AS legal_balls,

            COALESCE(w.dot_balls, 0) AS dot_balls

        FROM all_players p

        LEFT JOIN batting_stats b
            ON p.player = b.player

        LEFT JOIN bowling_stats w
            ON p.player = w.player

        ORDER BY
            runs DESC;

    `;


    const result = await pool.query(
        playerStatsQuery,
        params
    );


    // =====================================================
    // PROCESS PLAYER DATA
    // =====================================================

    const players = result.rows.map(row => {

        const runs =
            Number(row.runs);

        const ballsFaced =
            Number(row.balls_faced);

        const dismissals =
            Number(row.dismissals);

        const wickets =
            Number(row.wickets);

        const runsConceded =
            Number(row.runs_conceded);

        const legalBalls =
            Number(row.legal_balls);


        // -----------------------------
        // STRIKE RATE
        // -----------------------------

        const strikeRate =

            ballsFaced > 0

                ? Number(
                    (
                        (runs / ballsFaced)
                        * 100
                    ).toFixed(2)
                )

                : 0;


        // -----------------------------
        // BATTING AVERAGE
        // -----------------------------

        const average =

            dismissals > 0

                ? Number(
                    (
                        runs /
                        dismissals
                    ).toFixed(2)
                )

                : runs;


        // -----------------------------
        // ECONOMY
        // -----------------------------

        const economy =

            legalBalls > 0

                ? Number(
                    (
                        runsConceded /
                        (legalBalls / 6)
                    ).toFixed(2)
                )

                : 0;


        // -----------------------------
        // OVERS
        // -----------------------------

        const completeOvers =
            Math.floor(
                legalBalls / 6
            );

        const remainingBalls =
            legalBalls % 6;

        const overs =
            `${completeOvers}.${remainingBalls}`;


        return {

            player: row.player,

            runs,

            ballsFaced,

            fours:
                Number(row.fours),

            sixes:
                Number(row.sixes),

            dismissals,

            strikeRate,

            average,

            wickets,

            runsConceded,

            legalBalls,

            overs,

            economy,

            dotBalls:
                Number(row.dot_balls)

        };

    });


    // =====================================================
    // SORT PLAYERS
    // =====================================================

    const topRunScorer =

        [...players]
            .sort(
                (a, b) =>
                    b.runs - a.runs
            )[0];


    const topWicketTaker =

        [...players]
            .sort(
                (a, b) =>
                    b.wickets - a.wickets
            )[0];


    const bestStrikeRate =

        [...players]
            .filter(
                player =>
                    player.ballsFaced >= 50
            )
            .sort(
                (a, b) =>
                    b.strikeRate -
                    a.strikeRate
            )[0];


    const bestEconomy =

        [...players]
            .filter(
                player =>
                    player.legalBalls >= 60
            )
            .sort(
                (a, b) =>
                    a.economy -
                    b.economy
            )[0];


    // =====================================================
    // FINAL RESPONSE
    // =====================================================

    return {

        team,

        season:
            season || "All Seasons",


        kpis: {

            totalPlayers:
                players.length,


            topRunScorer:
                topRunScorer
                    ? topRunScorer.player
                    : null,


            topRunScorerRuns:
                topRunScorer
                    ? topRunScorer.runs
                    : 0,


            topWicketTaker:
                topWicketTaker
                    ? topWicketTaker.player
                    : null,


            topWicketTakerWickets:
                topWicketTaker
                    ? topWicketTaker.wickets
                    : 0,


            bestStrikeRate:
                bestStrikeRate
                    ? bestStrikeRate.player
                    : null,


            bestStrikeRateValue:
                bestStrikeRate
                    ? bestStrikeRate.strikeRate
                    : 0,


            bestEconomy:
                bestEconomy
                    ? bestEconomy.player
                    : null,


            bestEconomyValue:
                bestEconomy
                    ? bestEconomy.economy
                    : 0

        },


        players

    };

};


module.exports = {

    getPlayerAnalysisData

};