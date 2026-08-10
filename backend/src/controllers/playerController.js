const {
    getPlayerAnalysisData
} = require("../services/playerService");


const getPlayerAnalysis = async (req, res) => {

    try {

        const team = req.query.team;
        const season = req.query.season;
        const player = req.query.player;


        if (!team) {

            return res.status(400).json({

                success: false,

                message: "Team is required"

            });

        }


        const data =
            await getPlayerAnalysisData(
                team,
                season,
                player
            );


        res.status(200).json(data);


    } catch (error) {

        console.error(
            "Player analysis error:",
            error
        );


        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


module.exports = {

    getPlayerAnalysis

};