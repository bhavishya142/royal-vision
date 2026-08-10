import playerAssets from "../../data/playerAssets";

function TeamSpotlight({ data}) {
    if (!data) return null;

    const players = playerAssets[data.team] || {};

    const batter = data.topRunScorer || {};
    const bowler = data.topWicketTaker || {};

    return (
        <div className="spotlight-container">

            {/* =========================
                TOP BATTER
            ========================= */}
            <div className="spotlight-card batter-card">

                <div className="spotlight-image">
                    <img
                        src={players.batter}
                        alt={batter.batter || "Top batter"}
                    />
                </div>

                <div className="spotlight-content">

                    <span className="spotlight-badge batter-badge">
                        TOP BATTER
                    </span>

                    <h2 className="spotlight-player-name">
                        {batter.batter || "No data"}
                    </h2>

                    <div className="spotlight-number batter-number">
                        {batter.runs ?? 0}
                    </div>

                    <p className="spotlight-main-label">
                        Runs Scored
                    </p>

                    <div className="spotlight-stats">

                        <div className="spotlight-stat">
                            <h3>{batter.matches ?? 0}</h3>
                            <span>MATCHES</span>
                        </div>

                        <div className="spotlight-stat">
                            <h3>{batter.highestScore ?? 0}</h3>
                            <span>HIGHEST SCORE</span>
                        </div>

                        <div className="spotlight-stat">
                            <h3>{batter.battingAverage ?? 0}</h3>
                            <span>BATTING AVG</span>
                        </div>

                        <div className="spotlight-stat">
                            <h3>{batter.fours ?? 0}</h3>
                            <span>4s</span>
                        </div>

                        <div className="spotlight-stat">
                            <h3>{batter.sixes ?? 0}</h3>
                            <span>6s</span>
                        </div>

                        <div className="spotlight-stat">
                            <h3>
                                {batter.strikeRate ?? "-"}
                            </h3>
                            <span>STRIKE RATE</span>
                        </div>

                    </div>

                </div>

            </div>


            {/* =========================
                TOP BOWLER
            ========================= */}
            <div className="spotlight-card bowler-card">

                <div className="spotlight-image">
                    <img
                        src={players.bowler}
                        alt={bowler.bowler || "Top bowler"}
                    />
                </div>

                <div className="spotlight-content">

                    <span className="spotlight-badge bowler-badge">
                        TOP BOWLER
                    </span>

                    <h2 className="spotlight-player-name">
                        {bowler.bowler || "No data"}
                    </h2>

                    <div className="spotlight-number bowler-number">
                        {bowler.wickets ?? 0}
                    </div>

                    <p className="spotlight-main-label">
                        Wickets
                    </p>

                    <div className="spotlight-stats">

                        <div className="spotlight-stat">
                            <h3>{bowler.matches ?? 0}</h3>
                            <span>MATCHES</span>
                        </div>

                        <div className="spotlight-stat">
                            <h3>
                                {bowler.bestWickets ?? 0}/
                                {bowler.bestRuns ?? 0}
                            </h3>
                            <span>BEST BOWLING</span>
                        </div>

                        <div className="spotlight-stat">
                            <h3>{bowler.economy ?? 0}</h3>
                            <span>ECONOMY</span>
                        </div>

                        <div className="spotlight-stat">
                            <h3>{bowler.bowlingAverage ?? 0}</h3>
                            <span>BOWLING AVG</span>
                        </div>

                        <div className="spotlight-stat">
                            <h3>{bowler.dotBalls ?? 0}</h3>
                            <span>DOT BALLS</span>
                        </div>

                        <div className="spotlight-stat">
                            <h3>{bowler.threeWicketHauls ?? 0}</h3>
                            <span>3-WICKET HAULS</span>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default TeamSpotlight;