var projecaoModel = require("../models/projecaoModel.js")

function getComparacaoMes(req, res) {
    let ano = req.body.anoServer;
    let localidade = req.body.localidadeServer;

    projecaoModel.getComparacaoMes(ano, localidade)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}


module.exports = {
    getComparacaoMes
}

