const {
    getBowlingAnalysisData
} = require("../services/bowlingService");

const getBowlingAnalysis = async (req, res) => {

    try {

        const team = req.query.team;
        const season = req.query.season;

        const data = await getBowlingAnalysisData(
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
    getBowlingAnalysis
};