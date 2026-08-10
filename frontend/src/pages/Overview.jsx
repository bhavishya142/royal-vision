import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { getOverview } from "../api/overviewApi";
import MatchesBySeasonChart
    from "../components/charts/MatchesBySeasonChart";
import SeasonSummary from "../components/overview/SeasonSummary";
import ScoringProfile from "../components/overview/ScoringProfile";
import TopPerformers from "../components/overview/TopPerformers";


function Overview() {

    const [overviewData, setOverviewData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const loadOverview = async () => {

        try {

            const data = await getOverview();

            setOverviewData(data);

        } catch (error) {

    console.error("Failed to load overview:", error);

    setError(
        "Unable to load overview data. Please try again."
    );

} finally {
            setLoading(false);

        }

    };

   useEffect(() => {

    console.log("1. Calling getOverview()...");

    loadOverview();

}, []);

    if (loading) {

        return (

            <Layout>

                <div className="overview-loading">

                    Loading overview...

                </div>

            </Layout>

        );

    }
    if (error) {

    return (

        <Layout>

            <div className="overview-loading">

                <h2>
                    Something went wrong
                </h2>

                <p>
                    {error}
                </p>

                <button
                    className="overview-retry-button"
                    onClick={() => {
                        setLoading(true);
                        setError("");
                        loadOverview();
                    }}
                >
                    Retry
                </button>

            </div>

        </Layout>

    );

}

    return (

        <Layout>

            <div className="overview-page">

                <div className="overview-hero">

    <div className="overview-hero-content">

        <span className="overview-tag">
            IPL ANALYTICS PLATFORM
        </span>

        <h1>
            Royal Vision
        </h1>

        <p>
            Explore IPL performance, team statistics and match insights
            through data-driven analytics.
        </p>

    </div>

    <div className="overview-hero-stat">

        <span>
            DATASET
        </span>

        <strong>
            2022–2024
        </strong>

        <small>
            IPL seasons
        </small>

    </div>

</div> 
               
              <div className="overview-kpi-grid">

    <div className="overview-kpi-card">

        <span className="overview-kpi-label">
            TOTAL MATCHES
        </span>

        <strong>
            {overviewData?.totalMatches?.toLocaleString() ?? 0}
        </strong>

        <div className="overview-kpi-line"></div>

    </div>


    <div className="overview-kpi-card">

        <span className="overview-kpi-label">
            TOTAL RUNS
        </span>

        <strong>
            {overviewData?.totalRuns?.toLocaleString() ?? 0}
        </strong>

        <div className="overview-kpi-line"></div>

    </div>


    <div className="overview-kpi-card">

        <span className="overview-kpi-label">
            TOTAL WICKETS
        </span>

        <strong>
            {overviewData?.totalWickets?.toLocaleString() ?? 0}
        </strong>

        <div className="overview-kpi-line"></div>

    </div>


    <div className="overview-kpi-card">

        <span className="overview-kpi-label">
            AVG 1ST INNINGS
        </span>

        <strong>
            {overviewData?.averageFirstInningsScore ?? 0}
        </strong>

        <div className="overview-kpi-line"></div>

    </div>


    <div className="overview-kpi-card">

        <span className="overview-kpi-label">
            TOTAL FOURS
        </span>

        <strong>
            {overviewData?.totalFours?.toLocaleString() ?? 0}
        </strong>

        <div className="overview-kpi-line"></div>

    </div>


    <div className="overview-kpi-card">

        <span className="overview-kpi-label">
            TOTAL SIXES
        </span>

        <strong>
            {overviewData?.totalSixes?.toLocaleString() ?? 0}
        </strong>

        <div className="overview-kpi-line"></div>

    </div>

</div>
                <div className="overview-section-heading">

    <span>
        LEAGUE SNAPSHOT
    </span>

    <h2>
        IPL Match Activity
    </h2>

    <p>
        Distribution of matches across the available IPL seasons.
    </p>

</div>


<div className="overview-chart-grid">

    <div className="overview-season-grid">

    <MatchesBySeasonChart
        data={overviewData.matchesBySeason}
    />

    <SeasonSummary
        data={overviewData.matchesBySeason}
    />

</div>

</div>
      <ScoringProfile
    data={overviewData}
/>
<TopPerformers
    data={overviewData}
/>
            </div>

        </Layout>

    );

}

export default Overview;