function ScoringProfile({ data }) {

    const totalRuns = data?.totalRuns || 0;
    const totalFours = data?.totalFours || 0;
    const totalSixes = data?.totalSixes || 0;
    const averageScore = data?.averageFirstInningsScore || 0;

    return (

        <div className="scoring-profile">

            <div className="overview-section-heading">

                <span>
                    SCORING PROFILE
                </span>

                <h2>
                    How IPL Runs Are Scored
                </h2>

                <p>
                    A quick look at boundary scoring and average innings output.
                </p>

            </div>

            <div className="scoring-grid">

                <div className="scoring-card">

                    <span>
                        TOTAL RUNS
                    </span>

                    <strong>
                        {totalRuns.toLocaleString()}
                    </strong>

                    <p>
                        Runs scored across the dataset
                    </p>

                </div>


                <div className="scoring-card">

                    <span>
                        FOURS
                    </span>

                    <strong>
                        {totalFours.toLocaleString()}
                    </strong>

                    <p>
                        Boundaries worth four runs
                    </p>

                </div>


                <div className="scoring-card">

                    <span>
                        SIXES
                    </span>

                    <strong>
                        {totalSixes.toLocaleString()}
                    </strong>

                    <p>
                        Maximums hit
                    </p>

                </div>


                <div className="scoring-card">

                    <span>
                        AVG 1ST INNINGS
                    </span>

                    <strong>
                        {averageScore}
                    </strong>

                    <p>
                        Average team score
                    </p>

                </div>

            </div>

        </div>

    );

}

export default ScoringProfile;