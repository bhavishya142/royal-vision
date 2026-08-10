import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { getTeamAnalysis } from "../api/teamApi";
import KpiCard from "../components/team/KpiCard";
import WinsBySeasonChart from "../components/charts/WinsBySeasonChart";
import VenuePerformanceChart from "../components/charts/VenuePerformanceChart";
import TossDecisionChart from "../components/charts/TossDecisionChart";
import OpponentPerformanceChart from "../components/charts/OpponentPerformanceChart";
import MatchResultsTable from "../components/team/MatchResultsTable";
import TeamSpotlight from "../components/team/TeamSpotlight";
import teamAssets from "../data/teamAssets"
import ChartCard from "../components/common/ChartCard";

function Team() {

    const [teamData, setTeamData] = useState(null);

    const [selectedTeam, setSelectedTeam] = useState("Rajasthan Royals");

    const currentTeam = teamAssets[selectedTeam];

    useEffect(() => {

        loadData();

    }, [selectedTeam]);

    const loadData = async () => {

        try {

            const data = await getTeamAnalysis(selectedTeam);

            setTeamData(data);

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <Layout>

            <div
    className="hero-banner"
    style={{
        background: `linear-gradient(135deg, ${currentTeam.primary}, ${currentTeam.secondary})`
    }}
>

    <div>

        <img
            src={currentTeam.logo}
            alt={selectedTeam}
            className="team-logo"
        />

        <span className="hero-tag">

            TEAM ANALYTICS

        </span>

        <h1>

            {selectedTeam}

        </h1>

        <p>

            Performance insights across IPL seasons 2022–2024

        </p>

        <select
            className="team-select"
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
        >

            <option>Rajasthan Royals</option>
            <option>Mumbai Indians</option>
            <option>Chennai Super Kings</option>
            <option>Royal Challengers Bangalore</option>
            <option>Kolkata Knight Riders</option>
            <option>Delhi Capitals</option>
            <option>Sunrisers Hyderabad</option>
            <option>Punjab Kings</option>
            <option>Lucknow Super Giants</option>
            <option>Gujarat Titans</option>

        </select>

    </div>

    <div className="hero-right">

        <div className="hero-stat">

            <h2>

                {teamData ? teamData.kpis.winPercentage : 0}%

            </h2>

            <span>

                Win Percentage

            </span>

        </div>

    </div>

</div>

            {

                teamData && (

                    <>

                        {/* ================= KPI SECTION ================= */}

                        <div className="kpi-grid">

                            <KpiCard
                                title="Matches"
                                value={teamData.kpis.matches}
                                color="#3B82F6"
                            />

                            <KpiCard
                                title="Wins"
                                value={teamData.kpis.wins}
                                color="#10B981"
                            />

                            <KpiCard
                                title="Losses"
                                value={teamData.kpis.losses}
                                color="#EF4444"
                            />

                            <KpiCard
                                title="Win %"
                                value={teamData.kpis.winPercentage + "%"}
                                color="#F59E0B"
                            />

                            <KpiCard
                                title="Highest Score"
                                value={teamData.kpis.highestScore}
                                color="#7C3AED"
                            />

                        </div>

                        <div className="section-heading">
                            <h2>Team Spotlight</h2>
                            <p>Key performers for the selected franchise.</p>
                        </div>
                        <TeamSpotlight data={teamData.playerSpotlight}/>


                        



                        {/* ================= CHARTS ================= */}


                        <div className="section-heading">

    <h2>

        Performance Analytics

    </h2>

    <p>

        Interactive insights into seasonal performance, venues, toss decisions and opponents.

    </p>

</div>

                        <div className="dashboard-grid">

                            <ChartCard title="Wins by Season">

    <WinsBySeasonChart
    data={teamData.winsBySeason}
    color={currentTeam.primary}
/>

</ChartCard>

                            <ChartCard title="Toss Analysis">

    <TossDecisionChart
        data={teamData.tossDecision}
        color={currentTeam.primary}
    />

</ChartCard>

                            <ChartCard title="Venue Performance">

    <VenuePerformanceChart
        data={teamData.venuePerformance}
        color={currentTeam.primary}
    />

</ChartCard>

                          <ChartCard title="Opponent Analysis">

    <OpponentPerformanceChart
        data={teamData.opponentPerformance}
        color={currentTeam.primary}
    />

</ChartCard>

                        </div>

                        {/* ================= RECENT MATCHES ================= */}

                        <div className="section-heading">

    <h2>

        Recent Matches

    </h2>

    <p>

        Latest performances of the selected franchise.

    </p>

</div>

<div style={{ marginTop: "20px" }}>

    <MatchResultsTable
        data={teamData.matchResults}
        team={selectedTeam}
    />

</div>

                    </>

                )

            }

        </Layout>

    );

}

export default Team;