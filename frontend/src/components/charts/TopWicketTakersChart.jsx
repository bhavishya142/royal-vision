import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

function TopWicketTakersChart({ data, color }) {

    return (

        <ResponsiveContainer width="100%" height={360}>

            <BarChart
                data={data}
                layout="vertical"
                margin={{
                    top: 10,
                    right: 30,
                    left: 20,
                    bottom: 10
                }}
            >

                <CartesianGrid
                    strokeDasharray="3 3"
                    opacity={0.15}
                />

                <XAxis
                    type="number"
                />

                <YAxis
                    type="category"
                    dataKey="bowler"
                    width={120}
                />

                <Tooltip />

                <Bar
                    dataKey="wickets"
                    fill={color}
                    radius={[0, 6, 6, 0]}
                />

            </BarChart>

        </ResponsiveContainer>

    );

}

export default TopWicketTakersChart;