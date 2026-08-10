import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";

import { getPlayerAnalysis } from "../api/playerApi";

import KpiCard from "../components/team/KpiCard";

import teamAssets from "../data/teamAssets";

import ChartCard from "../components/common/ChartCard";

import PlayerModal from "../components/player/PlayerModal";

import { Search } from "lucide-react";

import PlayerSpotlight
from "../components/player/PlayerSpotlight";

function Player() {

    const [playerData, setPlayerData] = useState(null);

    const [selectedTeam, setSelectedTeam] =
        useState("Rajasthan Royals");


    const currentTeam =
        teamAssets[selectedTeam];

    const [selectedPlayer, setSelectedPlayer] = useState(null);

    const [search, setSearch] = useState("");

    const [sortField, setSortField] = useState("runs");
    
    const [sortDirection, setSortDirection] = useState("desc");


    useEffect(() => {

        loadPlayerData();

    }, [selectedTeam]);

   

    const loadPlayerData = async () => {

        try {

            const data =
                await getPlayerAnalysis(
                    selectedTeam
                );

            setPlayerData(data);

        } catch (error) {

            console.error(
                "Failed to load player data:",
                error
            );

        }

    };


    /*
     * Top run scorers
     */

    const topRunScorers =
        playerData?.players
            ? [...playerData.players]
                .sort(
                    (a, b) =>
                        b.runs - a.runs
                )
                .slice(0, 10)
            : [];


    /*
     * Top wicket takers
     */

    const topWicketTakers =
        playerData?.players
            ? [...playerData.players]
                .filter(
                    player =>
                        player.wickets > 0
                )
                .sort(
                    (a, b) =>
                        b.wickets -
                        a.wickets
                )
                .slice(0, 10)
            : [];


            const getPlayerImage = (playerName) => {
    return `/players/${playerName
        .toLowerCase()
        .replace(/\./g, "")
        .replace(/'/g, "")
        .replace(/\s+/g, "_")}.png`;
};

const filteredPlayers = playerData

    ? [...playerData.players]

        .filter(player =>
            player.player
                .toLowerCase()
                .includes(search.toLowerCase())
        )

        .sort((a, b) => {

            let valueA = a[sortField];
            let valueB = b[sortField];

            if (typeof valueA === "string") {

                valueA = valueA.toLowerCase();
                valueB = valueB.toLowerCase();

            }

            if (valueA < valueB)
                return sortDirection === "asc"
                    ? -1
                    : 1;

            if (valueA > valueB)
                return sortDirection === "asc"
                    ? 1
                    : -1;

            return 0;

        })

    : [];

    const handleSort = (field) => {

    if (sortField === field) {

        setSortDirection(
            sortDirection === "asc"
                ? "desc"
                : "asc"
        );

    } else {

        setSortField(field);
        setSortDirection("desc");

    }

};


    return (

        <Layout>

            {/* =========================================
                HERO
            ========================================= */}

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
                        PLAYER ANALYTICS
                    </span>


                    <h1>
                        {selectedTeam}
                    </h1>


                    <p>
                        Individual batting and bowling
                        performance across IPL seasons 2022–2024
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

                            {
                                playerData
                                    ? playerData.kpis.totalPlayers
                                    : 0
                            }

                        </h2>

                        <span>
                            Players
                        </span>

                    </div>

                </div>

            </div>


            {
                playerData && (

                    <>

                        {/* =========================================
                            KPI SECTION
                        ========================================= */}

                        <div className="kpi-grid">

                            <KpiCard
                                title="Total Players"
                                value={
                                    playerData.kpis.totalPlayers
                                }
                                color="#3B82F6"
                            />


                            <KpiCard
                                title="Top Run Scorer"
                                value={
    <>
        <span className="kpi-player-name">
            {playerData.kpis.topRunScorer}
        </span>

        <span className="kpi-player-stat">
            {playerData.kpis.topRunScorerRuns}
        </span>
    </>
}
                                color="#10B981"
                                compact={true}
                            />


                            <KpiCard
                                title="Top Wicket Taker"
                                value={
    <>
        <span className="kpi-player-name">
            {playerData.kpis.topWicketTaker}
        </span>

        <span className="kpi-player-stat">
            {playerData.kpis.topWicketTakerWickets}
        </span>
    </>
}
                                color="#F59E0B"
                                compact={true}
                            />


                            <KpiCard
                                title="Best Strike Rate"
                               value={
    <>
        <span className="kpi-player-name">
            {playerData.kpis.bestStrikeRate}
        </span>

        <span className="kpi-player-stat">
            {playerData.kpis.bestStrikeRateValue}
        </span>
    </>
}
                                color="#7C3AED"
                                compact={true}
                            />


                            <KpiCard
                                title="Best Economy"
                                value={
    <>
        <span className="kpi-player-name">
            {playerData.kpis.bestEconomy}
        </span>

        <span className="kpi-player-stat">
            {playerData.kpis.bestEconomyValue}
        </span>
    </>
}
                                color="#EC4899"
                                compact={true}
                            />

                        </div>


                        {/* =========================================
                            PLAYER LEADERS
                        ========================================= */}

                       <div className="section-header">

    <div>

        <h2>Player Statistics</h2>

        <p>
            Complete batting and bowling statistics
            for the selected franchise.
        </p>

    </div>

</div>

<div className="player-toolbar">

    <span className="player-count">

        Showing {playerData.players.length} Players

    </span>

   

</div>


                        <div className="dashboard-grid">


                            {/* =====================================
                                TOP RUN SCORERS
                            ===================================== */}

                            <ChartCard
                                title="Top Run Scorers"
                            >
                                <div className="player-ranking-header">
    <span></span>
    <span>Player</span>
    <span>Runs</span>
    <span>Balls</span>
    <span>SR</span>
</div>

                               {topRunScorers.map(
    (player, index) => (

        <div
            className="player-ranking-row"
            key={player.player}
        >

            <div
    className={`player-rank ${index < 3 ? "top-rank" : ""}`}
>
    {index + 1}
</div>

            <div
    className="player-ranking-name clickable-player"
    onClick={() => setSelectedPlayer(player)}
>
    {player.player}
</div>

            <div className="player-ranking-stat">
                {player.runs}
            </div>

            <div className="player-ranking-stat">
                {player.ballsFaced}
            </div>

            <div className="player-ranking-stat">
                {player.strikeRate}
            </div>

        </div>

    )
)}

                            </ChartCard>


                            {/* =====================================
                                TOP WICKET TAKERS
                            ===================================== */}

                            <ChartCard
                                title="Top Wicket Takers"
                            >

<div className="player-ranking-header">
    <span></span>
    <span>Player</span>
    <span>Wickets</span>
    <span>Economy</span>
    <span>Overs</span>
</div>
                                {topWicketTakers.map(
    (player, index) => (

        <div
            className="player-ranking-row"
            key={player.player}
        >

           <div
    className={`player-rank ${index < 3 ? "top-rank" : ""}`}
>
    {index + 1}
</div>
            <div
    className="player-ranking-name clickable-player"
    onClick={() => setSelectedPlayer(player)}
>
    {player.player}
</div>

            <div className="player-ranking-stat">
                {player.wickets}
            </div>

            <div className="player-ranking-stat">
                {player.economy}
            </div>

            <div className="player-ranking-stat">
                {player.overs}
            </div>

        </div>

    )
)}

                            </ChartCard>


                        </div>
                        {/* =========================================
                            PLAYER STATISTICS
                        ========================================= */}

                        <div className="section-heading">
                            <PlayerSpotlight

    player={selectedPlayer}

    team={selectedTeam}

/>

                            <h2>
                                Player Statistics
                            </h2>

                            <p>
                                Complete batting and bowling
                                statistics for the selected franchise.
                            </p>

                        </div>


                        <div className="player-table-card">
                            <div className="table-toolbar">

    <div className="search-box">

        <Search size={18} className="search-icon" />

        <input
    type="text"
    placeholder="Search players..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
/>

    </div>

</div>
                            <div className="player-table-wrapper">
                                <table className="player-table">

                                    <thead>

                                        <tr>

                                            <th>
                                                #
                                            </th>

                                            <th onClick={() => handleSort("player")}>
    Player
    {sortField === "player" &&
        (sortDirection === "asc" ? " ▲" : " ▼")}
</th>

                                            <th onClick={() => handleSort("runs")}>
    Runs
    {sortField === "runs" &&
        (sortDirection === "asc" ? " ▲" : " ▼")}
</th>

                                            <th onClick={() => handleSort("ballsFaced")}>
    Balls
    {sortField === "ballsFaced" &&
        (sortDirection === "asc" ? " ▲" : " ▼")}
</th>
<th onClick={() => handleSort("fours")}>
    4s
    {sortField === "fours" &&
        (sortDirection === "asc" ? " ▲" : " ▼")}
</th>

                                            <th onClick={() => handleSort("sixes")}>
    6s
    {sortField === "sixes" &&
        (sortDirection === "asc" ? " ▲" : " ▼")}
</th>

                                            <th onClick={() => handleSort("strikeRate")}>
    SR
    {sortField === "strikeRate" &&
        (sortDirection === "asc" ? " ▲" : " ▼")}
</th>

                                            <th onClick={() => handleSort("average")}>
    Average
    {sortField === "average" &&
        (sortDirection === "asc" ? " ▲" : " ▼")}
</th>

                                            <th onClick={() => handleSort("wickets")}>
    Wickets
    {sortField === "wickets" &&
        (sortDirection === "asc" ? " ▲" : " ▼")}
</th>

                                            <th onClick={() => handleSort("economy")}>
    Economy
    {sortField === "economy" &&
        (sortDirection === "asc" ? " ▲" : " ▼")}
</th>

                                           <th onClick={() => handleSort("overs")}>
    Overs
    {sortField === "overs" &&
        (sortDirection === "asc" ? " ▲" : " ▼")}
</th>

                                        </tr>

                                    </thead>


                                   <tbody>

    {filteredPlayers.length > 0 ? (

        filteredPlayers.map(
            (
                player,
                index
            ) => (

                <tr
                    key={player.player}
                >

                    <td>
                        {index + 1}
                    </td>

                    <td
                        className="player-name-cell"
                        onClick={() => {
                            setSelectedPlayer(player);
                        }}
                    >
                        {player.player}
                    </td>

                    <td className="player-runs-cell">
                        {player.runs}
                    </td>

                    <td>
                        {player.ballsFaced}
                    </td>

                    <td>
                        {player.fours}
                    </td>

                    <td>
                        {player.sixes}
                    </td>

                    <td className="player-strike-cell">
                        {player.strikeRate}
                    </td>

                    <td>
                        {player.average}
                    </td>

                    <td className="player-wickets-cell">
                        {player.wickets}
                    </td>

                    <td>
                        {player.economy}
                    </td>

                    <td>
                        {player.overs}
                    </td>

                </tr>

            )
        )

    ) : (

        <tr>

            <td
                colSpan="11"
                className="player-no-results"
            >
                No players found
            </td>

        </tr>

    )}

</tbody>

                                </table>

                            </div>

                        </div>

                    </>

                )

            }
           {selectedPlayer && (

    <PlayerModal
        player={selectedPlayer}
        team={selectedTeam}
        onClose={() => setSelectedPlayer(null)}
    />

)}

        </Layout>

    );

}


export default Player;