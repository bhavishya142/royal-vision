import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";


function MatchesBySeasonChart({ data }) {

    const totalMatches =
        data?.reduce(
            (sum, item) => sum + Number(item.matches || 0),
            0
        ) || 0;


    return (

        <div className="overview-chart">

            {/* =========================
                HEADER
            ========================= */}

            <div className="overview-chart-header">

                <div>

                    <span className="overview-chart-label">
                        MATCH ACTIVITY
                    </span>

                    <h3>
                        Matches by Season
                    </h3>

                    <p className="overview-chart-description">
                        Number of IPL matches recorded in each season.
                    </p>

                </div>


                <div className="overview-chart-total">

                    <span>
                        TOTAL
                    </span>

                    <strong>
                        {totalMatches.toLocaleString()}
                    </strong>

                </div>

            </div>


            {/* =========================
                CHART
            ========================= */}

            <div className="overview-chart-container matches-season-chart">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <BarChart
                        data={data || []}

                        margin={{
                            top: 10,
                            right: 15,
                            left: 0,
                            bottom: 5
                        }}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="rgba(148,163,184,.15)"
                            vertical={false}
                        />


                        <XAxis
                            dataKey="season"

                            stroke="#94A3B8"

                            tick={{
                                fill: "#CBD5E1",
                                fontSize: 12
                            }}

                            tickLine={false}

                            axisLine={{
                                stroke: "#334155"
                            }}
                        />


                        <YAxis
                            stroke="#94A3B8"

                            tick={{
                                fill: "#CBD5E1",
                                fontSize: 12
                            }}

                            tickLine={false}

                            axisLine={false}

                            allowDecimals={false}
                        />


                        <Tooltip
                            cursor={{
                                fill: "rgba(255,255,255,.04)"
                            }}

                            contentStyle={{
                                background: "#0F172A",

                                border:
                                    "1px solid rgba(255,255,255,.1)",

                                borderRadius: "10px",

                                color: "#F8FAFC"
                            }}
                        />


                        <Bar
                            dataKey="matches"

                            fill="#3B82F6"

                            radius={[
                                6,
                                6,
                                0,
                                0
                            ]}

                            barSize={42}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>

    );
}


export default MatchesBySeasonChart;