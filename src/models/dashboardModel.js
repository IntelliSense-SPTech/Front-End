var database = require("../database/config")

function getTotalCrimes(ano) {
    var instrucaoSql = `
    SELECT localidade, SUM(qtd_casos) AS 'totalCrimes'
    FROM crimes
    WHERE ano = ${ano}
    GROUP BY localidade;
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    getTotalCrimes
};