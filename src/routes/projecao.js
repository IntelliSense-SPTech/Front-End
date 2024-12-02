var express = require("express");
var router = express.Router();

var projecaoController = require("../controllers/projecaoController");

router.post("/getComparacaoMes", function (req, res) {
    projecaoController.getComparacaoMes(req, res);
})

router.post("/getMesAtual", function (req, res) {
    projecaoController.getMesAtual(req, res);
})

router.post("/getCasosEstimados", function (req, res) {
    projecaoController.getCasosEstimados(req, res);
})

module.exports = router;