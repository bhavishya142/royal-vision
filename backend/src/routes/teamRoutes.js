const express = require("express");

const router = express.Router();

const {
    getTeamAnalysis
} = require("../controllers/teamController");

router.get("/", getTeamAnalysis);

module.exports = router;