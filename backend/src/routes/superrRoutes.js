const express = require("express");
const router = express.Router();

const {
  getBatters,
  getBowlers
} = require("../controllers/superrController");

router.get("/batters", getBatters);
router.get("/bowlers", getBowlers);

module.exports = router;