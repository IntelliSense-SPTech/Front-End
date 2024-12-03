var express = require("express");
var router = express.Router();

var alertasController = require("../controllers/alertasController");

router.post("/getAlertas", function (req, res) {
    dashboardController.getAlertas(req, res);
});

module.exports = router;