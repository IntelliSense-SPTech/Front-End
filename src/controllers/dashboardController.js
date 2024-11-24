var dashboardModel = require("../models/dashboardModel.js")

function getTotalCrimes(req, res) {
    let ano = req.body.anoServer;

    dashboardModel.getTotalCrimes(ano)
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

function getQtdCrimesGsp(req, res) {
    let ano = req.body.anoServer;
    let localidade = 'Grande São Paulo'

    dashboardModel.getQtdCrimes(ano, localidade)
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

function getQtdCrimesCapital(req, res) {
    let ano = req.body.anoServer;
    let localidade = 'Capital'

    dashboardModel.getQtdCrimes(ano, localidade)
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

function getQtdCrimesLitoral(req, res) {
    let ano = req.body.anoServer;
    let localidade = 'Litoral'

    dashboardModel.getQtdCrimes(ano, localidade)
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

function getTotalCrimesMensal(req, res) {
    let ano = req.body.anoServer;

    dashboardModel.getTotalCrimesMensal(ano)
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

function getTotalCrimesLocalidadeMensal(req, res) {
    let ano = req.body.anoServer;

    dashboardModel.getTotalCrimesLocalidadeMensal(ano)
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

function getUltimaAtualizacao(req, res) {
    dashboardModel.getUltimaAtualizacao().then((resultado) => {
        res.status(200).json(resultado);
    });
}

function getCrimeMaisIncidencias(req, res) {
    let ano = req.body.anoServer;

    dashboardModel.getCrimeMaisIncidencias(ano)
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

function getLocalidadeMaisIncidencias(req, res) {
    let ano = req.body.anoServer;

    dashboardModel.getLocalidadeMaisIncidencias(ano)
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

function getMesMaisIncidencias(req, res) {
    let ano = req.body.anoServer;

    dashboardModel.getMesMaisIncidencias(ano)
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

function getQtdCrimes(req, res) {
    let ano = req.body.anoServer;
    let localidade = req.body.localidadeServer;

    dashboardModel.getQtdCrimes(ano, localidade)
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
    getTotalCrimes,
    getQtdCrimesGsp,
    getQtdCrimesCapital,
    getQtdCrimesLitoral,
    getTotalCrimesMensal,
    getTotalCrimesLocalidadeMensal,
    getUltimaAtualizacao,
    getCrimeMaisIncidencias,
    getLocalidadeMaisIncidencias,
    getMesMaisIncidencias,
    getQtdCrimes
}

