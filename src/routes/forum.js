var express = require("express");
var router = express.Router();

var forumController = require("../controllers/forumController");

router.post("/postar", function (req, res) {
    forumController.postar(req, res);
})

router.get("/listar", function (req, res) {
    forumController.listar(req, res);
});

module.exports = router;