import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";


function TopRunScorersChart({ data, color }) {

    return (

        <div className="chart-container top-scorers-chart">

            <ResponsiveContainer
                width="100%"
                height="100%"
            >

                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{
                        top: 10,
                        right: 20,
                        left: 10,
                        bottom: 10
                    }}
                >

                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(148,163,184,.10)"
                    />

                    <XAxis
                        type="number"
                        tick={{
                            fill: "#94A3B8",
                            fontSize: 12
                        }}
                        tickLine={false}
                    />

                    <YAxis
                        type="category"
                        dataKey="batter"
                        width={120}
                        tick={{
                            fill: "#CBD5E1",
                            fontSize: 12
                        }}
                        tickLine={false}
                    />

                    <Tooltip />

                    <Bar
                        dataKey="runs"
                        fill={color}
                        radius={[0, 8, 8, 0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}

export default TopRunScorersChart;