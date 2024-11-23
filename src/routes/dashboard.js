var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.post("/getTotalCrimes", function (req, res) {
    dashboardController.getTotalCrimes(req, res);
})

module.exports = router;