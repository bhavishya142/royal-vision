const express = require("express");

const router = express.Router();


const teamRoutes = require("./teamRoutes");
const overviewRoutes = require("./overviewRoutes");
const battingRoutes = require("./battingRoutes");
const bowlingRoutes = require("./bowlingRoutes");
const venueRoutes = require("./venueRoutes");
const playerRoutes = require("./playerRoutes");
const superrRoutes = require("./superrRoutes");

router.use("/teams", teamRoutes);

router.use("/team", teamRoutes);

router.use("/overview", overviewRoutes);

router.use("/batting", battingRoutes);

router.use("/bowling", bowlingRoutes);

router.use("/venue", venueRoutes);

router.use("/player", playerRoutes);

router.use("/superr", superrRoutes);

module.exports = router;