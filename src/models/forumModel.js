var database = require("../database/config")

function postar(idUsuario, relato) {
    var instrucaoSql = `
        INSERT INTO relatos (fk_usuario, descricao, data) VALUES (${idUsuario} , '${relato}', now());
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listar() {
    var instrucaoSql = `
    SELECT usuarios.nome AS "NomeUsuario",
    relatos.descricao AS "Relato"
    FROM relatos JOIN usuarios
    ON relatos.fk_usuario = usuarios.id_usuario
    order by id_relato desc;
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    postar,
    listar
};