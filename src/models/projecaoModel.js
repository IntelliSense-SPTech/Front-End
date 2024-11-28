var database = require("../database/config")

function getComparacaoMes(ano, localidade) {
    var instrucaoSql = `
       WITH CrimeData AS (
    SELECT 
        'Roubo' AS especificacao, 
        mes, 
        ano, 
        localidade, 
        SUM(qtd_casos) AS qtdCrimes
    FROM crimes
    WHERE 
        especificacao IN ('ROUBO - OUTROS', 'ROUBO DE VEÍCULO', 'ROUBO A BANCO', 'ROUBO DE CARGA', 'TOTAL DE ROUBO - OUTROS')
        AND ano = ${ano}
        AND localidade = '${localidade}'
    GROUP BY mes, ano, localidade

    UNION ALL

    SELECT 
        'Furto' AS especificacao, 
        mes, 
        ano, 
        localidade, 
        SUM(qtd_casos) AS qtdCrimes
    FROM crimes
    WHERE 
        especificacao IN ('FURTO - OUTROS', 'FURTO DE VEÍCULO')
        AND ano = ${ano}
        AND localidade = '${localidade}'
    GROUP BY mes, ano, localidade

    UNION ALL

    SELECT 
        'Latrocínio' AS especificacao, 
        mes, 
        ano, 
        localidade, 
        SUM(qtd_casos) AS qtdCrimes
    FROM crimes
    WHERE 
        especificacao = 'LATROCÍNIO'
        AND ano = ${ano}
        AND localidade = '${localidade}'
    GROUP BY mes, ano, localidade
    ),
    RecentMonths AS (
        SELECT DISTINCT mes
        FROM CrimeData
        WHERE ano = ${ano}
        ORDER BY mes DESC
        LIMIT 2
    ),
    FilteredData AS (
        SELECT 
            c.especificacao, 
            c.mes, 
            c.qtdCrimes
        FROM CrimeData c
        JOIN RecentMonths r
        ON c.mes = r.mes
    )
    SELECT 
        especificacao, 
        mes, 
        qtdCrimes
    FROM FilteredData
    ORDER BY especificacao, mes;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    getComparacaoMes
};