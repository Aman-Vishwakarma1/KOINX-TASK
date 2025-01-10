const express = require("express");
const router = express.Router();

router.get("/deviation", require("../controller/metricsController").deviation);

module.exports = router;
