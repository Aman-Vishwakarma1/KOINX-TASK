const express = require("express");
const router = express.Router();

router.get("/stats", require("../controller/statusController").stats);

module.exports = router;
