var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.post("/getTotalCrimes", function (req, res) {
    dashboardController.getTotalCrimes(req, res);
})

router.post("/getQtdCrimesGsp", function (req, res) {
    dashboardController.getQtdCrimesGsp(req, res);
})

router.post("/getQtdCrimesCapital", function (req, res) {
    dashboardController.getQtdCrimesCapital(req, res);
})

router.post("/getQtdCrimesLitoral", function (req, res) {
    dashboardController.getQtdCrimesLitoral(req, res);
})

router.post("/getTotalCrimesMensal", function (req, res) {
    dashboardController.getTotalCrimesMensal(req, res);
})

router.post("/getTotalCrimesLocalidadeMensal", function (req, res) {
    dashboardController.getTotalCrimesLocalidadeMensal(req, res);
})

router.get("/getUltimaAtualizacao", function (req, res) {
    dashboardController.getUltimaAtualizacao(req, res);
})


module.exports = router;