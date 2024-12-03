var database = require("../database/config")

function getAlertaAumento() {
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

function getAlertaReducao() {
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
    getAlertaAumento,
    getAlertaReducao
}
