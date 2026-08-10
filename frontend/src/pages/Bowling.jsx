import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";

import { getBowlingAnalysis } from "../api/bowlingApi";

import KpiCard from "../components/team/KpiCard";

import WicketsBySeasonChart
    from "../components/charts/WicketsBySeasonChart";

import ChartCard from "../components/common/ChartCard";

import teamAssets from "../data/teamAssets";
import playerAssets from "../data/playerAssets";

function Bowling() {

    const [bowlingData, setBowlingData] = useState(null);

    const [selectedTeam, setSelectedTeam] =
        useState("Rajasthan Royals");

    const currentTeam = teamAssets[selectedTeam];
    const players = playerAssets[selectedTeam] || {};
    const currentPlayers = playerAssets[selectedTeam];


    useEffect(() => {

        loadData();

    }, [selectedTeam]);


    const loadData = async () => {

        try {

            const data =
                await getBowlingAnalysis(selectedTeam);

            setBowlingData(data);

        } catch (error) {

            console.error(
                "Failed to load bowling data:",
                error
            );

        }

    };


    return (

        <Layout>

            {/* ================= HERO ================= */}

            <div
                className="hero-banner"
                style={{
                    background:
                        `linear-gradient(135deg, ${currentTeam.primary}, ${currentTeam.secondary})`
                }}
            >

                <div>

                    <img
                        src={currentTeam.logo}
                        alt={selectedTeam}
                        className="team-logo"
                    />

                    <span className="hero-tag">
                        BOWLING ANALYTICS
                    </span>

                    <h1>
                        {selectedTeam}
                    </h1>

                    <p>
                        Bowling performance across IPL seasons
                        2022–2024
                    </p>


                    <select
                        className="team-select"
                        value={selectedTeam}
                        onChange={(e) =>
                            setSelectedTeam(e.target.value)
                        }
                    >

                        <option>
                            Rajasthan Royals
                        </option>

                        <option>
                            Mumbai Indians
                        </option>

                        <option>
                            Chennai Super Kings
                        </option>

                        <option>
                            Royal Challengers Bangalore
                        </option>

                        <option>
                            Kolkata Knight Riders
                        </option>

                        <option>
                            Delhi Capitals
                        </option>

                        <option>
                            Sunrisers Hyderabad
                        </option>

                        <option>
                            Punjab Kings
                        </option>

                        <option>
                            Lucknow Super Giants
                        </option>

                        <option>
                            Gujarat Titans
                        </option>

                    </select>

                </div>


                {/* HERO RIGHT */}

                <div className="hero-right">

                    <div className="hero-stat">

                        <h2>
                            {bowlingData
                                ? bowlingData.kpis.totalWickets
                                : 0}
                        </h2>

                        <span>
                            Total Wickets
                        </span>

                    </div>

                </div>

            </div>


            {/* ================= DATA ================= */}

            {bowlingData && (

                <>

                    {/* ================= KPI SECTION ================= */}

                    <div className="kpi-grid">

    <KpiCard
        title="Total Wickets"
        value={bowlingData.kpis.totalWickets}
    />

    <KpiCard
        title="Economy"
        value={bowlingData.kpis.economy}
    />

    <KpiCard
        title="Runs Conceded"
        value={bowlingData.kpis.totalRunsConceded}
    />

    <KpiCard
        title="Dot Balls"
        value={bowlingData.kpis.dotBalls}
    />

    <KpiCard
        title="Total Overs"
        value={bowlingData.kpis.totalOvers}
    />

    <KpiCard
        title="Dot Ball %"
        value={bowlingData.kpis.dotBallPercentage + "%"}
    />

</div>

                    {/* ================= BOWLING PERFORMANCE ================= */}

                    <div className="section-heading">

                        <h2>
                            Bowling Performance
                        </h2>

                        <p>
                            Seasonal wicket trends and key
                            bowling performances for the
                            selected franchise.
                        </p>

                    </div>


                    {/* ================= ANALYTICS CARDS ================= */}

                    <div className="dashboard-grid">


                        {/* WICKETS BY SEASON */}

                        <ChartCard title="Wickets by Season">

                            <WicketsBySeasonChart
                                data={
                                    bowlingData.wicketsBySeason
                                }
                                color={
                                    currentTeam.primary
                                }
                            />

                        </ChartCard>


                        {/* LEADING WICKET TAKER */}

<ChartCard title="Leading Wicket Taker">

    <div className="leading-bowler-card">

        <div className="leading-bowler-image">

            <img
                src={currentPlayers?.bowler}
                alt={bowlingData.kpis.bestBowler}
            />

        </div>

        <div className="leading-bowler-content">

            <span className="leading-bowler-label">
                TOP WICKET TAKER
            </span>

            <h2>
                {bowlingData.kpis.bestBowler}
            </h2>

            <div className="leading-bowler-divider"></div>

            <div className="leading-bowler-stat">

                <strong>
                    {bowlingData.kpis.bestBowlerWickets}
                </strong>

                <span>
                    WICKETS
                </span>

            </div>

            <p>
                Most wickets for {selectedTeam}
            </p>

        </div>

    </div>

</ChartCard>
                    </div>


                    {/* ================= BOWLER TABLE ================= */}

                    <div className="section-heading">

                        <h2>
                            Bowler Performance
                        </h2>

                        <p>
                            Top wicket takers for the selected
                            franchise.
                        </p>

                    </div>


                    <div className="table-card">

                        <div className="table-header">

                            <h3>
                                Bowling Performance
                            </h3>

                        </div>


                        <div className="table-wrapper">

                            <table className="performance-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Rank
                                        </th>

                                        <th>
                                            Bowler
                                        </th>

                                        <th>
                                            Wickets
                                        </th>

                                        <th>
                                            Runs
                                        </th>

                                        <th>
                                            Overs
                                        </th>

                                        <th>
                                            Economy
                                        </th>

                                        <th>
                                            Dot Balls
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {
                                        bowlingData
                                            .topWicketTakers
                                            .map(
                                                (player, index) => (

                                                    <tr
                                                        key={
                                                            player.bowler
                                                        }
                                                    >

                                                        <td>
                                                            {index + 1}
                                                        </td>


                                                        <td className="player-name">
                                                            {
                                                                player.bowler
                                                            }
                                                        </td>


                                                        <td>
                                                            {
                                                                player.wickets
                                                            }
                                                        </td>


                                                        <td>
                                                            {
                                                                player.runsConceded
                                                            }
                                                        </td>


                                                        <td>
                                                            {
                                                                player.overs
                                                            }
                                                        </td>


                                                        <td className="economy-value">
                                                            {
                                                                player.economy
                                                            }
                                                        </td>


                                                        <td>
                                                            {
                                                                player.dotBalls
                                                            }
                                                        </td>

                                                    </tr>

                                                )
                                            )
                                    }

                                </tbody>

                            </table>

                        </div>

                    </div>

                </>

            )}

        </Layout>

    );

}


export default Bowling;