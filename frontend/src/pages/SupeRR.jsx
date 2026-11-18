import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import {
    Trophy,
    Shield,
    Activity,
    Target
} from "lucide-react";

import {
    getSuperrBatters,
    getSuperrBowlers
} from "../api/superrApi";

import "../styles/superr.css";


const SupeRR = () => {

    const [batters, setBatters] = useState([]);
    const [bowlers, setBowlers] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        const fetchData = async () => {

            try {

                const [battersData, bowlersData] =
                    await Promise.all([
                        getSuperrBatters(),
                        getSuperrBowlers()
                    ]);

                setBatters(battersData);
                setBowlers(bowlersData);

            } catch (err) {

                console.error(err);

                setError("Failed to load SupeRR Analytics");

            } finally {

                setLoading(false);

            }

        };

        fetchData();

    }, []);


    if (loading) {

        return (
            <div className="superr-loading">

                <Activity size={28} />

                <h2>Loading SupeRR Analytics...</h2>

                <p>
                    Calculating pressure-performance rankings.
                </p>

            </div>
        );

    }


    if (error) {

        return (
            <div className="superr-loading">

                <h2>Unable to load analytics</h2>

                <p>{error}</p>

            </div>
        );

    }


    const totalPressureBatters = batters.length;
    const totalPressureBowlers = bowlers.length;

    const topBatter = batters[0];
    const topBowler = bowlers[0];


    return (
        <Layout>

            <div className="superr-page">

                {/* HERO */}

                <section className="superr-hero">

                    <div className="superr-hero-content">

                        <span className="superr-tag">
                            SUPERR SELECTOR
                        </span>

                        <h1>
                            SupeRR Analytics
                        </h1>

                        <p>
                            Identify players who perform consistently
                            when the pressure is highest.
                        </p>

                    </div>


                    <div className="superr-hero-stats">

                        {/* TOP BATTER */}

                        <div className="superr-hero-stat">

                            <span>
                                TOP PRESSURE BATTER
                            </span>

                            <strong>
                                {topBatter?.player_name || "-"}
                            </strong>

                            <small>
                                {topBatter?.team_name || "-"}
                            </small>

                            <small>
                                Score{" "}
                                {Number(
                                    topBatter?.final_score || 0
                                ).toFixed(2)}
                            </small>

                        </div>


                        {/* TOP BOWLER */}

                        <div className="superr-hero-stat">

                            <span>
                                TOP PRESSURE BOWLER
                            </span>

                            <strong>
                                {topBowler?.player_name || "-"}
                            </strong>

                            <small>
                                {topBowler?.team_name || "-"}
                            </small>

                            <small>
                                Score{" "}
                                {Number(
                                    topBowler?.final_score || 0
                                ).toFixed(2)}
                            </small>

                        </div>

                    </div>

                </section>


                {/* KPI CARDS */}

                <section className="superr-kpi-grid">

                    <div className="superr-kpi-card">

                        <div className="superr-kpi-icon">
                            <Activity size={20} />
                        </div>

                        <span>
                            PRESSURE BATTERS
                        </span>

                        <strong>
                            {totalPressureBatters}
                        </strong>

                        <small>
                            Ranked players
                        </small>

                    </div>


                    <div className="superr-kpi-card">

                        <div className="superr-kpi-icon">
                            <Shield size={20} />
                        </div>

                        <span>
                            PRESSURE BOWLERS
                        </span>

                        <strong>
                            {totalPressureBowlers}
                        </strong>

                        <small>
                            Ranked players
                        </small>

                    </div>


                    <div className="superr-kpi-card">

                        <div className="superr-kpi-icon">
                            <Trophy size={20} />
                        </div>

                        <span>
                            TOP BATTER SCORE
                        </span>

                        <strong>
                            {Number(
                                topBatter?.final_score || 0
                            ).toFixed(2)}
                        </strong>

                        <small>
                            70% Performance · 30% Consistency
                        </small>

                    </div>


                    <div className="superr-kpi-card">

                        <div className="superr-kpi-icon">
                            <Target size={20} />
                        </div>

                        <span>
                            TOP BOWLER SCORE
                        </span>

                        <strong>
                            {Number(
                                topBowler?.final_score || 0
                            ).toFixed(2)}
                        </strong>

                        <small>
                            70% Performance · 30% Consistency
                        </small>

                    </div>

                </section>


                {/* BATTERS */}

                <section className="superr-section">

                    <div className="superr-section-heading">

                        <div>

                            <span>
                                FINAL SELECTION RANKING
                            </span>

                            <h2>
                                Top Pressure Batters
                            </h2>

                            <p>
                                Final ranking based on 70% pressure
                                performance and 30% match consistency.
                            </p>

                        </div>

                    </div>


                    <div className="superr-table-card">

                        <div className="superr-table-wrapper">

                            <table className="superr-table">

                                <thead>

                                    <tr>

                                        <th>Rank</th>

                                        <th>Player</th>

                                        <th>Team</th>

                                        <th>Performance</th>

                                        <th>Consistency</th>

                                        <th>Pressure Matches</th>

                                        <th>Positive Matches</th>

                                        <th>Final Score</th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {batters.map((player, index) => (

                                        <tr key={player.player_id}>

                                            <td>

                                                <span
                                                    className={
                                                        index === 0
                                                            ? "superr-rank top"
                                                            : "superr-rank"
                                                    }
                                                >
                                                    {index + 1}
                                                </span>

                                            </td>


                                            <td className="superr-player-name">
                                                {player.player_name}
                                            </td>


                                            <td>
                                                {player.team_name}
                                            </td>


                                            <td className="superr-score">
                                                {Number(
                                                    player.performance_score
                                                ).toFixed(2)}
                                            </td>


                                            <td>
                                                {Number(
                                                    player.consistency_score
                                                ).toFixed(2)}%
                                            </td>


                                            <td>
                                                {player.pressure_matches}
                                            </td>


                                            <td>
                                                {player.positive_matches}
                                            </td>


                                            <td className="superr-score">
                                                {Number(
                                                    player.final_score
                                                ).toFixed(2)}
                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </section>


                {/* BOWLERS */}

                <section className="superr-section">

                    <div className="superr-section-heading">

                        <div>

                            <span>
                                FINAL SELECTION RANKING
                            </span>

                            <h2>
                                Top Pressure Bowlers
                            </h2>

                            <p>
                                Final ranking based on 70% pressure
                                performance and 30% match consistency.
                            </p>

                        </div>

                    </div>


                    <div className="superr-table-card">

                        <div className="superr-table-wrapper">

                            <table className="superr-table">

                                <thead>

                                    <tr>

                                        <th>Rank</th>

                                        <th>Player</th>

                                        <th>Team</th>

                                        <th>Performance</th>

                                        <th>Consistency</th>

                                        <th>Pressure Matches</th>

                                        <th>Positive Matches</th>

                                        <th>Final Score</th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {bowlers.map((player, index) => (

                                        <tr key={player.player_id}>

                                            <td>

                                                <span
                                                    className={
                                                        index === 0
                                                            ? "superr-rank top"
                                                            : "superr-rank"
                                                    }
                                                >
                                                    {index + 1}
                                                </span>

                                            </td>


                                            <td className="superr-player-name">
                                                {player.player_name}
                                            </td>


                                            <td>
                                                {player.team_name}
                                            </td>


                                            <td className="superr-score">
                                                {Number(
                                                    player.performance_score
                                                ).toFixed(2)}
                                            </td>


                                            <td>
                                                {Number(
                                                    player.consistency_score
                                                ).toFixed(2)}%
                                            </td>


                                            <td>
                                                {player.pressure_matches}
                                            </td>


                                            <td>
                                                {player.positive_matches}
                                            </td>


                                            <td className="superr-score">
                                                {Number(
                                                    player.final_score
                                                ).toFixed(2)}
                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </section>


                {/* METHODOLOGY */}

                <section className="superr-methodology">

                    <span>
                        HOW THE MODEL WORKS
                    </span>

                    <h2>
                        Pressure Performance Score
                    </h2>

                    <p>
                        The final ranking combines pressure performance
                        with match-level consistency rather than relying
                        on a single statistic.
                    </p>


                    <div className="superr-method-grid">

                        <div>

                            <strong>
                                70% Performance
                            </strong>

                            <span>
                                Pressure-performance score based on
                                role-specific pressure metrics.
                            </span>

                        </div>


                        <div>

                            <strong>
                                30% Consistency
                            </strong>

                            <span>
                                Percentage of qualifying pressure
                                matches where the player met or
                                exceeded their normal performance.
                            </span>

                        </div>


                        <div>

                            <strong>
                                Batters
                            </strong>

                            <span>
                                Strike Rate · Runs/Dismissal ·
                                Boundary Impact · SR Uplift
                            </span>

                        </div>


                        <div>

                            <strong>
                                Bowlers
                            </strong>

                            <span>
                                Economy · Wicket Rate ·
                                Dot Balls · Economy Uplift
                            </span>

                        </div>

                    </div>

                </section>

            </div>

        </Layout>
    );

};


export default SupeRR;