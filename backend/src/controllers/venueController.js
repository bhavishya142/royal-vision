const {
    getVenueAnalysisData
} = require("../services/venueService");


const getVenueAnalysis = async (req, res) => {

    try {

        const team = req.query.team;
        const season = req.query.season;

        const data = await getVenueAnalysisData(
            team,
            season
        );

        res.status(200).json(data);

    } catch (error) {

        console.error(
            "Venue analysis error:",
            error
        );

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


module.exports = {

    getVenueAnalysis

};