const express = require("express");

const router = express.Router();


const teamRoutes = require("./teamRoutes");
const overviewRoutes = require("./overviewRoutes");
const battingRoutes = require("./battingRoutes");
const bowlingRoutes = require("./bowlingRoutes");
const venueRoutes = require("./venueRoutes");
const playerRoutes = require("./playerRoutes");


router.use("/teams", teamRoutes);

router.use("/team", teamRoutes);

router.use("/overview", overviewRoutes);

router.use("/batting", battingRoutes);

router.use("/bowling", bowlingRoutes);

router.use("/venue", venueRoutes);

router.use("/player", playerRoutes);

module.exports = router;