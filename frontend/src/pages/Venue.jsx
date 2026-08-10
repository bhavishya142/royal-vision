import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";

import { getVenueAnalysis } from "../api/venueApi";

import KpiCard from "../components/team/KpiCard";

import teamAssets from "../data/teamAssets";

import ChartCard from "../components/common/ChartCard";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";


function Venue() {

    const [venueData, setVenueData] = useState(null);

    const [selectedTeam, setSelectedTeam] =
        useState("Rajasthan Royals");


    const currentTeam =
        teamAssets[selectedTeam];


    useEffect(() => {

        loadVenueData();

    }, [selectedTeam]);


    const loadVenueData = async () => {

        try {

            const data =
                await getVenueAnalysis(
                    selectedTeam
                );

            setVenueData(data);

        } catch (error) {

            console.error(
                "Failed to load venue data:",
                error
            );

        }

    };


    /* =========================================
       SHORT VENUE NAMES FOR CHARTS
    ========================================= */

    const getShortVenueName = (venue) => {

        const shortNames = {

            "Sawai Mansingh Stadium, Jaipur":
                "Sawai Mansingh",

            "Wankhede Stadium, Mumbai":
                "Wankhede",

            "Narendra Modi Stadium, Ahmedabad":
                "Narendra Modi",

            "Dr DY Patil Sports Academy, Mumbai":
                "DY Patil",

            "Brabourne Stadium, Mumbai":
                "Brabourne",

            "MA Chidambaram Stadium, Chepauk, Chennai":
                "Chepauk",

            "Eden Gardens, Kolkata":
                "Eden Gardens",

            "Barsapara Cricket Stadium, Guwahati":
                "Barsapara",

            "Rajiv Gandhi International Stadium, Uppal, Hyderabad":
                "Rajiv Gandhi",

            "Maharashtra Cricket Association Stadium, Pune":
                "MCA Pune",

            "Himachal Pradesh Cricket Association Stadium, Dharamsala":
                "HPCA Dharamsala",

            "Arun Jaitley Stadium, Delhi":
                "Arun Jaitley",

            "M Chinnaswamy Stadium, Bengaluru":
                "Chinnaswamy",

            "Maharaja Yadavindra Singh International Cricket Stadium, Mullanpur":
                "Mullanpur",

            "Bharat Ratna Shri Atal Bihari Vajpayee Ekana Cricket Stadium, Lucknow":
                "Ekana"

        };


        return shortNames[venue] || venue;

    };


    /* =========================================
       WIN PERCENTAGE DATA
    ========================================= */

    const winPercentageData = venueData?.venuePerformance
        ? [...venueData.venuePerformance]
            .sort(
                (a, b) =>
                    b.winPercentage -
                    a.winPercentage
            )
            .map((venue) => ({

                ...venue,

                shortVenue:
                    getShortVenueName(
                        venue.venue
                    )

            }))
        : [];


    /* =========================================
       SCORING DATA
    ========================================= */

    const scoringData = venueData?.venuePerformance
        ? [...venueData.venuePerformance]
            .sort(
                (a, b) =>
                    b.averageScore -
                    a.averageScore
            )
            .map((venue) => ({

                ...venue,

                shortVenue:
                    getShortVenueName(
                        venue.venue
                    )

            }))
        : [];


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

                        VENUE ANALYTICS

                    </span>


                    <h1>

                        {selectedTeam}

                    </h1>


                    <p>

                        Venue-wise performance insights
                        across IPL seasons 2022–2024

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
                                venueData
                                    ? venueData.kpis.totalVenues
                                    : 0
                            }

                        </h2>

                        <span>

                            Venues

                        </span>

                    </div>

                </div>

            </div>


            {
                venueData && (

                    <>

                        {/* =========================================
                            KPI SECTION
                        ========================================= */}

                        <div className="venue-kpi-section">

    {/* NUMERIC KPIs */}
    <div className="venue-kpi-row venue-kpi-numeric">

        <KpiCard
            title="Total Venues"
            value={venueData.kpis.totalVenues}
            color="#3B82F6"
        />

        <KpiCard
            title="Matches"
            value={venueData.kpis.totalMatches}
            color="#10B981"
        />

        <KpiCard
            title="Best Win %"
            value={
                venueData.kpis.bestVenueWinPercentage + "%"
            }
            color="#7C3AED"
        />

    </div>


    {/* TEXT-HEAVY KPIs */}
    <div className="venue-kpi-row venue-kpi-text">

        <KpiCard
            title="Best Venue"
            value={venueData.kpis.bestVenue}
            color="#F59E0B"
        />

        <KpiCard
            title="Most Played"
            value={venueData.kpis.mostPlayedVenue}
            color="#EC4899"
        />

    </div>

</div>


                        {/* =========================================
                            VENUE PERFORMANCE
                        ========================================= */}

                        <div className="section-heading">

                            <h2>

                                Venue Performance

                            </h2>


                            <p>

                                Performance of the selected
                                franchise across IPL venues.

                            </p>

                        </div>


                        <div className="dashboard-grid">


                            {/* =====================================
                                WIN PERCENTAGE
                            ===================================== */}

                            <ChartCard
                                title="Win Percentage by Venue"
                            >

                                <div className="venue-chart">

                                    <ResponsiveContainer
                                        width="100%"
                                        height={500}
                                    >

                                        <BarChart
                                            data={winPercentageData}
                                            layout="vertical"
                                            margin={{
                                                top: 5,
                                                right: 20,
                                                left: 0,
                                                bottom: 5
                                            }}
                                        >

                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                horizontal={false}
                                            />


                                            <XAxis
                                                type="number"
                                                domain={[
                                                    0,
                                                    100
                                                ]}
                                                tickFormatter={
                                                    (value) =>
                                                        `${value}%`
                                                }
                                            />


                                            <YAxis
                                                type="category"
                                                dataKey="shortVenue"
                                                width={135}
                                                tick={{
                                                    fill: "#cbd5e1",
        fontSize: 12,
        fontWeight: 500
                                                }}
                                                interval={0}
                                            />


                                            <Tooltip
                                                formatter={
                                                    (value) => [
                                                        `${value}%`,
                                                        "Win Percentage"
                                                    ]
                                                }
                                                labelFormatter={
                                                    (label, payload) => {

                                                        if (
                                                            payload &&
                                                            payload.length
                                                        ) {

                                                            return payload[0]
                                                                .payload
                                                                .venue;

                                                        }

                                                        return label;

                                                    }
                                                }
                                            />


                                            <Bar
                                                dataKey="winPercentage"
                                                fill={
                                                    currentTeam.primary
                                                }
                                                radius={[
                                                    0,
                                                    6,
                                                    6,
                                                    0
                                                ]}
                                            />

                                        </BarChart>

                                    </ResponsiveContainer>

                                </div>

                            </ChartCard>


                            {/* =====================================
                                SCORING
                            ===================================== */}

                            <ChartCard
                                title="Venue Scoring"
                            >

                                <div className="venue-chart">

                                    <ResponsiveContainer
                                        width="100%"
                                        height={500}
                                    >

                                        <BarChart
                                            data={scoringData}
                                            layout="vertical"
                                            margin={{
                                                top: 5,
                                                right: 20,
                                                left: 0,
                                                bottom: 5
                                            }}
                                        >

                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                horizontal={false}
                                            />


                                            <XAxis
                                                type="number"
                                                domain={[
                                                    0,
                                                    240
                                                ]}
                                            />


                                            <YAxis
                                                type="category"
                                                dataKey="shortVenue"
                                                width={135}
                                                tick={{
                                                    fill: "#cbd5e1",
        fontSize: 12,
        fontWeight: 500
                                                }}
                                                interval={0}
                                            />


                                            <Tooltip
                                                labelFormatter={
                                                    (label, payload) => {

                                                        if (
                                                            payload &&
                                                            payload.length
                                                        ) {

                                                            return payload[0]
                                                                .payload
                                                                .venue;

                                                        }

                                                        return label;

                                                    }
                                                }
                                            />


                                            <Legend />


                                            <Bar
                                                dataKey="averageScore"
                                                fill={
                                                    currentTeam.secondary
                                                }
                                                radius={[
                                                    0,
                                                    6,
                                                    6,
                                                    0
                                                ]}
                                                name="Average Score"
                                            />


                                            <Bar
                                                dataKey="highestScore"
                                                fill={
                                                    currentTeam.primary
                                                }
                                                radius={[
                                                    0,
                                                    6,
                                                    6,
                                                    0
                                                ]}
                                                name="Highest Score"
                                            />

                                        </BarChart>

                                    </ResponsiveContainer>

                                </div>

                            </ChartCard>

                        </div>


                        {/* =========================================
                            VENUE TABLE
                        ========================================= */}

                        <div className="section-heading">

                            <h2>

                                Venue Statistics

                            </h2>


                            <p>

                                Detailed performance breakdown
                                across all venues.

                            </p>

                        </div>


                        <div className="venue-table-card">

                            <div className="venue-table-wrapper">

                                <table className="venue-table">

                                    <thead>

                                        <tr>

                                            <th>#</th>

                                            <th>Venue</th>

                                            <th>Matches</th>

                                            <th>Wins</th>

                                            <th>Losses</th>

                                            <th>Win %</th>

                                            <th>Avg Score</th>

                                            <th>Highest Score</th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {
                                            venueData
                                                .venuePerformance
                                                .map(
                                                    (
                                                        venue,
                                                        index
                                                    ) => (

                                                        <tr
                                                            key={
                                                                venue.venue
                                                            }
                                                        >

                                                            <td>

                                                                {
                                                                    index + 1
                                                                }

                                                            </td>


                                                            <td className="venue-name-cell">

                                                                {
                                                                    venue.venue
                                                                }

                                                            </td>


                                                            <td>

                                                                {
                                                                    venue.matches
                                                                }

                                                            </td>


                                                            <td className="venue-win-cell">

                                                                {
                                                                    venue.wins
                                                                }

                                                            </td>


                                                            <td>

                                                                {
                                                                    venue.losses
                                                                }

                                                            </td>


                                                            <td className="venue-percentage-cell">

                                                                {
                                                                    venue.winPercentage
                                                                }%

                                                            </td>


                                                            <td>

                                                                {
                                                                    venue.averageScore
                                                                }

                                                            </td>


                                                            <td>

                                                                {
                                                                    venue.highestScore
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

                )

            }

        </Layout>

    );

}


export default Venue;