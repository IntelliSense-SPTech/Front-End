var forumModel = require("../models/forumModel.js")

function postar(req, res) {
    // var idUsuario = req.body.idUsuarioServer
    let idUsuario = 1;
    var relato = req.body.relatoServer;

        forumModel.postar(idUsuario, relato)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar ao publicar! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }


    function listar(req, res) {
        forumModel.listar()
        .then(resultado => {
            res.status(200).json(resultado)
        })
    }

module.exports = {
    postar,
    listar
}

