const {
    getOverviewData
} = require("../services/overviewService");

const getOverview = async (req, res) => {

    try {

        const overview = await getOverviewData();

        res.status(200).json(overview);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    getOverview
};