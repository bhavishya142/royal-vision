import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts"


function TossDecisionChart({ data,color }) {

    return (



        <div className="chart-card">
            
            <div style={{height:"350px"}}>

                <div className="chart-container">

<ResponsiveContainer
    width="100%"
    height="100%"
>

                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="matches"
                            nameKey="decision"
                            outerRadius={120}
                            label
                        >

                            {

                                data.map((entry,index)=>(

                                    <Cell
    key={index}
    fill={
        index === 0
            ? color
            : "#475569"
    }
/>

                                ))

                            }

                        </Pie>

                        <Tooltip/>

                        <Legend/>

                    </PieChart>

                </ResponsiveContainer>
                </div>

            </div>

        </div>
       


    )

}

export default TossDecisionChart