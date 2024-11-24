var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/cadastrarCorporativo", function (req, res) {
    usuarioController.cadastrarCorporativo(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/autenticarToken", function (req, res) {
    usuarioController.autenticarToken(req, res);
});

router.post("/mandarMensagem", function (req, res) {
    usuarioController.mandarMensagem(req, res);
});

module.exports = router;