function SeasonSummary({ data }) {

    const totalMatches = data?.reduce(
        (sum, item) => sum + Number(item.matches),
        0
    ) || 0;

    return (
        <div className="season-summary">

            <div className="season-summary-header">

                <div>
                    <span className="overview-chart-label">
                        SEASON BREAKDOWN
                    </span>

                    <h3>Season Summary</h3>

                    <p>
                        Match distribution across IPL seasons.
                    </p>
                </div>

            </div>

            <div className="season-list">

                {data?.map((item) => {

                    const matches = Number(item.matches);

                    const percentage =
                        totalMatches > 0
                            ? ((matches / totalMatches) * 100).toFixed(1)
                            : 0;

                    return (

                        <div
                            className="season-row"
                            key={item.season}
                        >

                            <div className="season-info">

                                <strong>
                                    IPL {item.season}
                                </strong>

                                <span>
                                    {matches} matches
                                </span>

                            </div>

                            <div className="season-progress">

                                <div
                                    className="season-progress-bar"
                                    style={{
                                        width: `${percentage}%`
                                    }}
                                />

                            </div>

                            <div className="season-percentage">
                                {percentage}%
                            </div>

                        </div>

                    );

                })}

            </div>

        </div>
    );
}

export default SeasonSummary;