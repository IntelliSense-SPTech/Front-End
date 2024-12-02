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

function getMesAtual(ano) {
    var instrucaoSql = `
    SELECT MAX(mes) AS mes_atual FROM crimes
    WHERE ano = (SELECT MAX(${ano}) FROM crimes);
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getCasosEstimados(ano, mes, localidade) {
    var instrucaoSql = `
        WITH CrimeData AS (
        SELECT 
            CASE 
                WHEN especificacao IN ('ROUBO - OUTROS', 'ROUBO DE VEÍCULO', 'ROUBO A BANCO', 'ROUBO DE CARGA', 'TOTAL DE ROUBO - OUTROS') THEN 'Roubo'
                WHEN especificacao IN ('FURTO - OUTROS', 'FURTO DE VEÍCULO') THEN 'Furto'
                WHEN especificacao = 'LATROCÍNIO' THEN 'Latrocínio'
            END AS especificacao, 
            mes, 
            ano, 
            localidade, 
            SUM(qtd_casos) AS qtdCrimes
        FROM crimes
        WHERE 
            especificacao IN (
                'ROUBO - OUTROS', 'ROUBO DE VEÍCULO', 'ROUBO A BANCO', 'ROUBO DE CARGA', 'TOTAL DE ROUBO - OUTROS',
                'FURTO - OUTROS', 'FURTO DE VEÍCULO', 
                'LATROCÍNIO'
            )
            AND localidade = '${localidade}'
        GROUP BY 
            especificacao, mes, ano, localidade
    ),
    TargetMonths AS (
        SELECT 
            ${mes} AS mes_atual,
            CASE 
                WHEN ${mes} = 12 THEN 1
                ELSE ${mes} + 1
            END AS proximo_mes
    ),
    HistoricalData AS (
        SELECT 
            cd.especificacao, 
            cd.mes, 
            cd.ano, 
            cd.qtdCrimes
        FROM CrimeData cd
        JOIN TargetMonths tm
            ON (cd.mes = tm.mes_atual OR cd.mes = tm.proximo_mes)
            AND cd.ano = ${ano} - 1
    )
    SELECT 
        especificacao, 
        mes, 
        SUM(qtdCrimes) AS qtdCrimes
    FROM HistoricalData
    GROUP BY especificacao, mes
    HAVING SUM(qtdCrimes) > 0
    ORDER BY especificacao, mes;
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    getComparacaoMes,
    getMesAtual,
    getCasosEstimados
};