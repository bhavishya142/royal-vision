import {
    getPlayerImage,
    getTeamLogo,
     getPlayerRole
} from "../../utils/playerHelpers";


function PlayerModal({ player, team, onClose }) {

    if (!player) return null;
   const playerRole = getPlayerRole(player.player);

    return (

        <div className="modal-overlay">

            <div className="player-modal">

                {/* CLOSE BUTTON */}

                <button
                    className="player-modal-close"
                    onClick={onClose}
                >
                    ✕
                </button>


                {/* PLAYER HEADER */}

                <div className="player-modal-header">

                    <img
                        src={getPlayerImage(player.player)}
                        alt={player.player}
                        className="player-modal-image"
                        onError={(e) => {
                            e.target.src = "/players/default.png";
                        }}
                    />


                    <div className="player-header-info">

                        <h2>
                            {player.player}
                        </h2>


                        <div className="player-team-row">

                            <img
                                src={getTeamLogo(team)}
                                className="team-logo-small"
                                alt={team}
                            />

                            <span>
                                {team}
                            </span>

                        </div>
                        <div
    className={`player-role-badge ${
        playerRole
            .toLowerCase()
            .replace(/\s+/g, "-")
    }`}
>
    {playerRole}
</div>

                    </div>

                </div>


                {/* DIVIDER */}

<div className="player-modal-divider"></div>

                {/* BATTING */}

                <div className="player-modal-section">

                    <h3>
                        Batting
                    </h3>


                    <div className="player-modal-grid">

                        <div className="player-modal-stat">

                            <span>
                                Runs
                            </span>

                            <strong>
                                {player.runs}
                            </strong>

                        </div>


                        <div className="player-modal-stat">

                            <span>
                                Balls
                            </span>

                            <strong>
                                {player.ballsFaced}
                            </strong>

                        </div>


                        <div className="player-modal-stat">

                            <span>
                                Strike Rate
                            </span>

                            <strong>
                                {player.strikeRate}
                            </strong>

                        </div>


                        <div className="player-modal-stat">

                            <span>
                                Average
                            </span>

                            <strong>
                                {player.average}
                            </strong>

                        </div>


                        <div className="player-modal-stat">

                            <span>
                                4s
                            </span>

                            <strong>
                                {player.fours}
                            </strong>

                        </div>


                        <div className="player-modal-stat">

                            <span>
                                6s
                            </span>

                            <strong>
                                {player.sixes}
                            </strong>

                        </div>

                    </div>

                </div>


               {/* BOWLING */}

{player.legalBalls > 0 && (

    <div className="player-modal-section">

        <h3>
            Bowling
        </h3>


        <div className="player-modal-grid">

            <div className="player-modal-stat">

                <span>
                    Wickets
                </span>

                <strong>
                    {player.wickets}
                </strong>

            </div>


            <div className="player-modal-stat">

                <span>
                    Economy
                </span>

                <strong>
                    {player.economy}
                </strong>

            </div>


            <div className="player-modal-stat">

                <span>
                    Overs
                </span>

                <strong>
                    {player.overs}
                </strong>

            </div>


            <div className="player-modal-stat">

                <span>
                    Runs Conceded
                </span>

                <strong>
                    {player.runsConceded}
                </strong>

            </div>


            <div className="player-modal-stat">

                <span>
                    Legal Balls
                </span>

                <strong>
                    {player.legalBalls}
                </strong>

            </div>


            <div className="player-modal-stat">

                <span>
                    Dot Balls
                </span>

                <strong>
                    {player.dotBalls}
                </strong>

            </div>


            <div className="player-modal-stat">

                <span>
                    Dismissals
                </span>

                <strong>
                    {player.dismissals}
                </strong>

            </div>

        </div>

    </div>

)}
            </div>

        </div>

    );

}


export default PlayerModal;