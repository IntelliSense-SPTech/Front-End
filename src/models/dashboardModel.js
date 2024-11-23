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

function getQtdCrimes(ano, localidade) {
    var instrucaoSql = `
    SELECT 'Roubo' AS especificacao, SUM(qtd_casos) AS qtdCrimes FROM crimes
    WHERE especificacao IN ('ROUBO - OUTROS', 'ROUBO DE VEÍCULO', 'ROUBO A BANCO', 'ROUBO DE CARGA', 'TOTAL DE ROUBO - OUTROS')
    and ano = ${ano}
    and localidade = '${localidade}'
    UNION ALL
    SELECT 'Furto' AS especificacao, SUM(qtd_casos) AS qtdCrimes FROM crimes
    WHERE especificacao IN ('FURTO - OUTROS', 'FURTO DE VEÍCULO')
    and ano = ${ano}
    and localidade = '${localidade}'
    UNION ALL
    SELECT 'Latrocínio' AS especificacao, SUM(qtd_casos) AS qtdCrimes FROM crimes
    WHERE especificacao = 'LATROCÍNIO'
    and ano = ${ano}
    and localidade = '${localidade}';
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getTotalCrimesMensal(ano) {
    var instrucaoSql = `
    SELECT 'Roubo' AS especificacao, mes, ano, SUM(qtd_casos) AS qtdCrimes 
    FROM crimes
    WHERE especificacao IN ('ROUBO - OUTROS', 'ROUBO DE VEÍCULO', 'ROUBO A BANCO', 'ROUBO DE CARGA', 'TOTAL DE ROUBO - OUTROS')
    AND ano = ${ano}
    GROUP BY mes
    UNION ALL
    SELECT 'Furto' AS especificacao, mes, ano, SUM(qtd_casos) AS qtdCrimes 
    FROM crimes
    WHERE especificacao IN ('FURTO - OUTROS', 'FURTO DE VEÍCULO')
    AND ano = ${ano}
    GROUP BY mes
    UNION ALL
    SELECT 'Latrocínio' AS especificacao, mes, ano, SUM(qtd_casos) AS qtdCrimes 
    FROM crimes
    WHERE especificacao = 'LATROCÍNIO'
    AND ano = ${ano}
    GROUP BY mes
    ORDER BY mes;
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getTotalCrimesLocalidadeMensal(ano) {
    var instrucaoSql = `
    SELECT localidade, mes, ano, SUM(qtd_casos) AS qtdCrimes
    FROM crimes
    WHERE ano = ${ano}
    GROUP BY localidade, mes
    ORDER BY mes, localidade;    
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getUltimaAtualizacao() {
    var instrucaoSql = `
    SELECT MAX(mes) as ultimoMes, MAX(ano) as ultimoAno FROM crimes
    WHERE ano = (SELECT MAX(ano) FROM crimes);
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
module.exports = {
    getTotalCrimes,
    getQtdCrimes,
    getTotalCrimesMensal,
    getTotalCrimesLocalidadeMensal,
    getUltimaAtualizacao
};