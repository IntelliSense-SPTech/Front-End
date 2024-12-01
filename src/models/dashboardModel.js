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

function getCrimeMaisIncidencias(ano) {
    var instrucaoSql = `
    SELECT 'Roubo' AS especificacao, SUM(qtd_casos) AS qtdCrimes FROM crimes
    WHERE especificacao IN ('ROUBO - OUTROS', 'ROUBO DE VEÍCULO', 'ROUBO A BANCO', 'ROUBO DE CARGA', 'TOTAL DE ROUBO - OUTROS')
    and ano = ${ano}
    UNION ALL
    SELECT 'Furto' AS especificacao, SUM(qtd_casos) AS qtdCrimes FROM crimes
    WHERE especificacao IN ('FURTO - OUTROS', 'FURTO DE VEÍCULO')
    and ano = ${ano}
    UNION ALL
    SELECT 'Latrocínio' AS especificacao, SUM(qtd_casos) AS qtdCrimes FROM crimes
    WHERE especificacao = 'LATROCÍNIO'
    and ano = ${ano}
    GROUP BY 
    especificacao
    ORDER BY 
    qtdCrimes DESC
    LIMIT 1;
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getLocalidadeMaisIncidencias(ano) {
    var instrucaoSql = `
    SELECT localidade, SUM(qtd_casos) AS total_crimes FROM crimes
    WHERE ano = ${ano}
    GROUP BY localidade
    ORDER BY total_crimes DESC
    LIMIT 1;
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getMesMaisIncidencias(ano) {
    var instrucaoSql = `
    SELECT 
    CASE 
        WHEN mes = 1 THEN 'Janeiro'
        WHEN mes = 2 THEN 'Fevereiro'
        WHEN mes = 3 THEN 'Março'
        WHEN mes = 4 THEN 'Abril'
        WHEN mes = 5 THEN 'Maio'
        WHEN mes = 6 THEN 'Junho'
        WHEN mes = 7 THEN 'Julho'
        WHEN mes = 8 THEN 'Agosto'
        WHEN mes = 9 THEN 'Setembro'
        WHEN mes = 10 THEN 'Outubro'
        WHEN mes = 11 THEN 'Novembro'
        WHEN mes = 12 THEN 'Dezembro'
        END AS mes,
        SUM(qtd_casos) AS total_crimes
        FROM crimes
        WHERE ano = ${ano}
        GROUP BY mes
        ORDER BY total_crimes DESC
        LIMIT 1;
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function getMaiorAumento(ano) {
    var instrucaoSql = `
    WITH dados_recentes AS (
        SELECT
            c.localidade,
            c.especificacao,
            c.qtd_casos,
            c.ano,
            c.mes,
            ROW_NUMBER() OVER (PARTITION BY c.localidade, c.especificacao ORDER BY c.ano DESC, c.mes DESC) AS ordem_mes
        FROM crimes c
    ),
    comparacao AS (
        SELECT
            atual.localidade,
            atual.especificacao,
            atual.qtd_casos AS casos_mes_atual,
            anterior.qtd_casos AS casos_mes_anterior,
            ROUND(((atual.qtd_casos - anterior.qtd_casos) / NULLIF(anterior.qtd_casos, 0)) * 100, 2) AS aumento_percentual
        FROM
            dados_recentes atual
        LEFT JOIN
            dados_recentes anterior
        ON
            atual.localidade = anterior.localidade
            AND atual.especificacao = anterior.especificacao
            AND atual.ordem_mes = 1
            AND anterior.ordem_mes = 2
        WHERE
            anterior.qtd_casos IS NOT NULL
            AND atual.qtd_casos > anterior.qtd_casos
    )
    SELECT
        localidade,
        especificacao AS crime,
        aumento_percentual
    FROM
        comparacao
    ORDER BY
        aumento_percentual DESC
    LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getMaiorReducao(ano) {
    var instrucaoSql = `
    WITH dados_recentes AS (
        SELECT
            c.localidade,
            c.especificacao,
            c.qtd_casos,
            c.ano,
            c.mes,
            ROW_NUMBER() OVER (PARTITION BY c.localidade, c.especificacao ORDER BY c.ano DESC, c.mes DESC) AS ordem_mes
        FROM crimes c
    ),
    comparacao AS (
        SELECT
            atual.localidade,
            atual.especificacao,
            atual.qtd_casos AS casos_mes_atual,
            anterior.qtd_casos AS casos_mes_anterior,
            ROUND(((anterior.qtd_casos - atual.qtd_casos) / NULLIF(anterior.qtd_casos, 0)) * 100, 2) AS reducao_percentual
        FROM
            dados_recentes atual
        LEFT JOIN
            dados_recentes anterior
        ON
            atual.localidade = anterior.localidade
            AND atual.especificacao = anterior.especificacao
            AND atual.ordem_mes = 1
            AND anterior.ordem_mes = 2
        WHERE
            anterior.qtd_casos IS NOT NULL
            AND atual.qtd_casos < anterior.qtd_casos
    )
    SELECT
        localidade,
        especificacao AS crime,
        reducao_percentual
    FROM
        comparacao
    ORDER BY
        reducao_percentual DESC
    LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    getTotalCrimes,
    getQtdCrimes,
    getTotalCrimesMensal,
    getTotalCrimesLocalidadeMensal,
    getUltimaAtualizacao,
    getCrimeMaisIncidencias,
    getLocalidadeMaisIncidencias,
    getMesMaisIncidencias,
    getMaiorAumento,
    getMaiorReducao

};