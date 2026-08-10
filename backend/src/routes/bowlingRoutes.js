const express = require("express");

const router = express.Router();

const {
    getBowlingAnalysis
} = require("../controllers/bowlingController");

router.get("/", getBowlingAnalysis);

module.exports = router;