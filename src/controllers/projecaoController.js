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

function getMesAtual(req, res) {
    let ano = req.body.anoServer;

    projecaoModel.getMesAtual(ano)
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

function getCasosEstimados(req, res) {
    let ano = req.body.anoServer;
    let mes = req.body.mesServer;
    let localidade = req.body.localidadeServer;

    projecaoModel.getCasosEstimados(ano, mes, localidade)
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
    getComparacaoMes,
    getMesAtual,
    getCasosEstimados
}

