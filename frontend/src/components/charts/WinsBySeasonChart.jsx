import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts"

function WinsBySeasonChart({ data , color }) {

    return (


        <div className="chart-card">

            <div style={{ height: "350px" }}>

                <div className="chart-container">

<ResponsiveContainer
    width="100%"
    height="100%"
>

                    <ResponsiveContainer width="100%" height={320}>

    <BarChart

        data={data}

        margin={{

            top:20,

            right:20,

            left:0,

            bottom:10

        }}

    >

        <CartesianGrid

            strokeDasharray="3 3"

            stroke="#374151"

        />

        <XAxis

            dataKey="season"

            stroke="#9CA3AF"

            tickLine={false}

            axisLine={false}

        />

        <YAxis

            stroke="#9CA3AF"

            tickLine={false}

            axisLine={false}

        />

        <Tooltip

            cursor={{

                fill:"rgba(255,255,255,.05)"

            }}

        />

        <Bar

            dataKey="wins"

            fill={color}

            radius={[8,8,0,0]}

        />

    </BarChart>

</ResponsiveContainer>

                </ResponsiveContainer>
                </div>

            </div>

        </div>


    )

}

export default WinsBySeasonChart