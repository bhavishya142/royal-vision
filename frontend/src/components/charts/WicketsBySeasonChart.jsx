import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

function WicketsBySeasonChart({ data, color }) {

    return (

        <ResponsiveContainer width="100%" height={300}>

            <BarChart
                data={data}
                margin={{
                    top: 10,
                    right: 20,
                    left: 0,
                    bottom: 10
                }}
            >

                <CartesianGrid
                    strokeDasharray="3 3"
                    opacity={0.15}
                />

                <XAxis
                    dataKey="season"
                />

                <YAxis />

                <Tooltip />

                <Bar
                    dataKey="wickets"
                    fill={color}
                    radius={[6, 6, 0, 0]}
                />

            </BarChart>

        </ResponsiveContainer>

    );

}

export default WicketsBySeasonChart;