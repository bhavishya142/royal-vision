const express = require("express");

const router = express.Router();

const {
    getVenueAnalysis
} = require("../controllers/venueController");


router.get("/", getVenueAnalysis);


module.exports = router;