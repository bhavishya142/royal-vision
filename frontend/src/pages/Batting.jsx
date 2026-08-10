import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";

import { getBattingAnalysis } from "../api/battingApi";

import KpiCard from "../components/team/KpiCard";

import teamAssets from "../data/teamAssets";

import BattingSeasonChart
    from "../components/charts/BattingSeasonChart";

import ChartCard
    from "../components/common/ChartCard";

import TopRunScorersChart
    from "../components/charts/TopRunScorersChart";

import BattingTable
    from "../components/team/BattingTable";


function Batting() {

    const [battingData, setBattingData] = useState(null);

    const [selectedTeam, setSelectedTeam] =
        useState("Rajasthan Royals");


    const currentTeam =
        teamAssets[selectedTeam];


    useEffect(() => {

        loadData();

    }, [selectedTeam]);


    const loadData = async () => {

        try {

            const data =
                await getBattingAnalysis(
                    selectedTeam
                );

            setBattingData(data);

        } catch (error) {

            console.error(
                "Failed to load batting data:",
                error
            );

        }

    };


    return (

        <Layout>

            {/* =========================
                HERO
            ========================= */}

            <div
                className="hero-banner"
                style={{
                    background:
                        `linear-gradient(
                            135deg,
                            ${currentTeam.primary},
                            ${currentTeam.secondary}
                        )`
                }}
            >

                <div>

                    <img
                        src={currentTeam.logo}
                        alt={selectedTeam}
                        className="team-logo"
                    />

                    <span className="hero-tag">

                        BATTING ANALYSIS

                    </span>

                    <h1>

                        {selectedTeam}

                    </h1>

                    <p>

                        Batting performance across IPL
                        seasons 2022–2024

                    </p>


                    <select
                        className="team-select"
                        value={selectedTeam}
                        onChange={(e) =>
                            setSelectedTeam(
                                e.target.value
                            )
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


                <div className="hero-right">

                    <div className="hero-stat">

                        <h2>

                            {battingData
                                ? battingData.kpis.totalRuns.toLocaleString()
                                : 0
                            }

                        </h2>

                        <span>

                            Total Runs

                        </span>

                    </div>

                </div>

            </div>


            {/* =========================
                KPI SECTION
            ========================= */}

            {battingData && (

                <>

                    <div className="kpi-grid">

                        <KpiCard
                            title="Total Runs"
                            value={
                                battingData.kpis.totalRuns
                            }
                            color="#3B82F6"
                        />

                        <KpiCard
                            title="Highest Score"
                            value={
                                battingData.kpis.highestScore
                            }
                            color="#7C3AED"
                        />

                        <KpiCard
                            title="Average"
                            value={
                                battingData.kpis.average
                            }
                            color="#10B981"
                        />

                        <KpiCard
                            title="Strike Rate"
                            value={
                                battingData.kpis.strikeRate
                            }
                            color="#F59E0B"
                        />

                        <KpiCard
                            title="Fours"
                            value={
                                battingData.kpis.fours
                            }
                            color="#EF4444"
                        />

                        <KpiCard
                            title="Sixes"
                            value={
                                battingData.kpis.sixes
                            }
                            color="#EC4899"
                        />

                    </div>
                    <div className="section-heading">

    <h2>
        Batting Performance
    </h2>

    <p>
        Season-wise scoring and leading run scorers
        for the selected franchise.
    </p>

</div>


<div className="dashboard-grid">

    <ChartCard title="Runs by Season">

        <BattingSeasonChart
            data={battingData.seasonRuns}
            color={currentTeam.primary}
        />

    </ChartCard>


    <ChartCard title="Top Run Scorers">

        <TopRunScorersChart
            data={battingData.topRunScorers}
            color={currentTeam.primary}
        />

    </ChartCard>

</div>

<div className="section-heading">

    <h2>
        Player Performance
    </h2>

    <p>
        Detailed batting statistics for the leading
        players of the selected franchise.
    </p>

</div>


<div style={{ marginTop: "20px" }}>

    <BattingTable
        data={battingData.topRunScorers}
    />

</div>


                    

                </>

            )}

        </Layout>

    );

}


export default Batting;