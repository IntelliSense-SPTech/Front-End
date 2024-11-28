var express = require("express");
var router = express.Router();

var projecaoController = require("../controllers/projecaoController");

router.post("/getComparacaoMes", function (req, res) {
    projecaoController.getComparacaoMes(req, res);
})




module.exports = router;