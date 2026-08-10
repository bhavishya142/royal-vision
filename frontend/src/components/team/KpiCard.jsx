import {
    TrendingUp
} from "lucide-react";


function KpiCard({

    title,

    value,

    color = "#2563EB",

    compact = false

}) {

    return (

        <div
            className={`kpi-card ${compact ? "kpi-card-compact" : ""}`}
            style={{
                borderTop: `4px solid ${color}`
            }}
        >

            <div className="kpi-top">

                <span className="kpi-title">

                    {title}

                </span>

                <TrendingUp
                    size={18}
                    color={color}
                />

            </div>


            <h1 className="kpi-value">

                {value}

            </h1>


            <p className="kpi-footer">

                Updated from live dataset

            </p>

        </div>

    );

}


export default KpiCard;