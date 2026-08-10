const {
    getTeamAnalysisData
} = require("../services/teamService");

const getTeamAnalysis = async (req, res) => {

    try {

        const team = req.query.team;
        const season = req.query.season;

        const data = await getTeamAnalysisData(team, season);

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
    getTeamAnalysis
};