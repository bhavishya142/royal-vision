const performerImages = {

    "Shubman Gill": "/players/gill.png",

    "YS Chahal": "/players/yuzi.png"

};

function TopPerformers({ data }) {

    const topBatter = data?.topRunScorer;
    const topBowler = data?.topWicketTaker;
    const batterImage = performerImages[topBatter?.batter];
    const bowlerImage = performerImages[topBowler?.bowler];
    

    return (

        <div className="top-performers">

            <div className="overview-section-heading">

                <span>
                    PLAYER PERFORMANCE
                </span>

                <h2>
                    Top Performers
                </h2>

                <p>
                    Leading individual performers across the available IPL dataset.
                </p>

            </div>


            <div className="top-performers-grid">

                {/* TOP BATTER */}

                <div className="performer-card">

                    <div className="performer-card-top">

                        <span className="performer-label">
                            TOP RUN SCORER
                        </span>


                    </div>


                    <div className="performer-main">

                        <div className="performer-avatar">

    {batterImage ? (

        <img
            src={batterImage}
            alt={topBatter?.batter}
        />

    ) : (

        topBatter?.batter
            ?.split(" ")
            .map(word => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()

    )}

</div>

                        <div className="performer-details">

    <h3>
        {topBatter?.batter}
    </h3>

    <span>
        Leading Run Scorer
    </span>

   

</div>

                    </div>

                   <div className="performer-highlight-stats">

    <div className="performer-highlight-stat">
        <span>RUNS</span>

        <strong>
            {topBatter?.runs?.toLocaleString() || 0}
        </strong>
    </div>


    <div className="performer-highlight-stat">
        <span>MATCHES</span>

        <strong>
            {topBatter?.matches || 0}
        </strong>
    </div>


    <div className="performer-highlight-stat">
        <span>HIGHEST SCORE</span>

        <strong>
            {topBatter?.highestScore || 0}
        </strong>
    </div>


    <div className="performer-highlight-stat">
        <span>BATTING AVERAGE</span>

        <strong>
            {topBatter?.battingAverage || 0}
        </strong>
    </div>


    <div className="performer-highlight-stat">
        <span>FOURS</span>

        <strong>
            {topBatter?.fours?.toLocaleString() || 0}
        </strong>
    </div>


    <div className="performer-highlight-stat">
        <span>SIXES</span>

        <strong>
            {topBatter?.sixes?.toLocaleString() || 0}
        </strong>
    </div>

</div>     

                </div>


                {/* TOP BOWLER */}

                <div className="performer-card">

                    <div className="performer-card-top">

                        <span className="performer-label">
                            TOP WICKET TAKER
                        </span>

                    </div>


                    <div className="performer-main">

                       <div className="performer-avatar">

    {bowlerImage ? (

        <img
            src={bowlerImage}
            alt={topBowler?.bowler}
        />

    ) : (

        topBowler?.bowler
            ?.split(" ")
            .map(word => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()

    )}

</div>


                        <div className="performer-details">

    <h3>
        {topBowler?.bowler}
    </h3>

    <span>
        Leading Wicket Taker
    </span>

    
</div>

                    </div>


                   <div className="performer-highlight-stats">

    <div className="performer-highlight-stat">
        <span>WICKETS</span>
        <strong>
            {topBowler?.wickets || 0}
        </strong>
    </div>

    <div className="performer-highlight-stat">
        <span>MATCHES</span>
        <strong>
            {topBowler?.matches || 0}
        </strong>
    </div>

    <div className="performer-highlight-stat">
        <span>BEST BOWLING</span>
        <strong>
            {topBowler?.bestWickets || 0}/
            {topBowler?.bestRuns || 0}
        </strong>
    </div>

    <div className="performer-highlight-stat">
        <span>ECONOMY</span>
        <strong>
            {topBowler?.economy || 0}
        </strong>
    </div>

    <div className="performer-highlight-stat">
        <span>BOWLING AVERAGE</span>
        <strong>
            {topBowler?.bowlingAverage || 0}
        </strong>
    </div>

    <div className="performer-highlight-stat">
        <span>DOT BALLS</span>
        <strong>
            {topBowler?.dotBalls || 0}
        </strong>
    </div>

</div>

                </div>

            </div>

        </div>

    );

}

export default TopPerformers;