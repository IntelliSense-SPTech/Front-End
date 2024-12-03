var express = require("express");
var router = express.Router();

var alertasController = require("../controllers/alertasController");

router.post("/getAlertaAumento", function (req, res) {
    alertasController.getAlertaAumento(req, res);
});

router.post("/getAlertaReducao", function (req, res) {
    alertasController.getAlertaReducao(req, res);
});

module.exports = router;