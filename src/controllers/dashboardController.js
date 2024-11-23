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


module.exports = {
    getTotalCrimes
}

