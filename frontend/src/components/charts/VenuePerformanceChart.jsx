import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";
function VenuePerformanceChart({ data, color }) {

    return (

        <div className="chart-container venue-chart">

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
                        left: 20,
                        bottom: 10
                    }}
                >

                    <CartesianGrid
                        strokeDasharray="3 3"
                    />

                    <XAxis
                        type="number"
                        domain={[0, 100]}
                        tick={{
                            fill: "#94A3B8",
                            fontSize: 12
                        }}
                    />

                    <YAxis
                        type="category"
                        dataKey="venue"
                        width={210}
                        tick={{
                            fill: "#CBD5E1",
                            fontSize: 13
                        }}
                        tickLine={false}
                    />

                    <Tooltip />

                    <Bar
                        dataKey="winPercentage"
                        fill={color}
                        radius={[0, 8, 8, 0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}

export default VenuePerformanceChart;