import {
    getPlayerImage,
    getTeamLogo
} from "../../utils/playerHelpers";

function PlayerSpotlight({

    player,

    team

}) {

    if (!player) return null;

    return (

        <div className="player-spotlight">

            <div className="spotlight-left">

                <img
                    src={getPlayerImage(player.player)}
                    alt={player.player}
                    className="spotlight-image"
                    onError={(e)=>{
                        e.target.src="/players/default.png";
                    }}
                />

            </div>

            <div className="spotlight-middle">

                <h2>

                    {player.player}

                </h2>

                <div className="spotlight-team">

                    <img
                        src={getTeamLogo(team)}
                        alt={team}
                    />

                    <span>

                        {team}

                    </span>

                </div>

            </div>

            <div className="spotlight-right">

                <div>

                    <span>Runs</span>

                    <strong>{player.runs}</strong>

                </div>

                <div>

                    <span>Strike Rate</span>

                    <strong>{player.strikeRate}</strong>

                </div>

                <div>

                    <span>Wickets</span>

                    <strong>{player.wickets}</strong>

                </div>

                <div>

                    <span>Economy</span>

                    <strong>{player.economy}</strong>

                </div>

            </div>

        </div>

    );

}

export default PlayerSpotlight;