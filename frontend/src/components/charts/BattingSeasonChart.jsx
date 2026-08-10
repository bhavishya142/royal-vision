import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";


function BattingSeasonChart({ data, color }) {

    return (

        <div className="chart-container">

            <ResponsiveContainer
                width="100%"
                height="100%"
            >

                <BarChart
                    data={data}
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
                        dataKey="season"
                        tick={{
                            fill: "#CBD5E1",
                            fontSize: 13
                        }}
                        tickLine={false}
                    />

                    <YAxis
                        allowDecimals={false}
                        tick={{
                            fill: "#CBD5E1",
                            fontSize: 13
                        }}
                        tickLine={false}
                    />

                    <Tooltip />

                    <Bar
                        dataKey="runs"
                        fill={color}
                        radius={[6, 6, 0, 0]}
                        barSize={45}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}

export default BattingSeasonChart;