const express = require("express");

const router = express.Router();


const {
    getPlayerAnalysis
} = require("../controllers/playerController");


router.get(
    "/",
    getPlayerAnalysis
);


module.exports = router;