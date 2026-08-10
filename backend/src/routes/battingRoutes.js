const express = require("express");

const router = express.Router();


const {
    getBattingAnalysis
} = require("../controllers/battingController");


router.get(
    "/",
    getBattingAnalysis
);


module.exports = router;