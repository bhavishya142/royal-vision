const {
    getBattingAnalysisData
} = require("../services/battingService");


const getBattingAnalysis = async (req, res) => {

    try {

        const team = req.query.team;

        const season = req.query.season;


        if (!team) {

            return res.status(400).json({

                success: false,

                message: "Team is required"

            });

        }


        const data =
            await getBattingAnalysisData(
                team,
                season
            );


        res.status(200).json(data);


    } catch (error) {

        console.error(error);


        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


module.exports = {

    getBattingAnalysis

};