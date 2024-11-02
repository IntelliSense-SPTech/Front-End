var database = require("../database/config")

function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT id_usuario, cim, nome, tipo_usuario, cpf, email, senha, token, telefone FROM usuarios WHERE email = '${email}' AND senha = '${senha}';
    `;
    return database.executar(instrucaoSql);
}

function autenticarToken(token) {
    var instrucaoSql = `
        SELECT id_usuario, cim, nome, tipo_usuario, cpf, email, senha, token, telefone FROM usuarios WHERE token = '${token}';
    `;
    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, senha) {
    var instrucaoSql = `
        INSERT INTO usuarios (nome, email, senha, tipo_usuario) VALUES 
        ('${nome}', '${email}', '${senha}', 'comum');
    `;
    return database.executar(instrucaoSql);
}

function cadastrarCorporativo(nome, telefone, email, senha, CPF, CIM, token) {
    var instrucaoSql = `
        INSERT INTO usuarios (cim, nome, tipo_usuario, cpf, email, senha, token, telefone) VALUES 
        ('${CIM}', '${nome}', 'corporativo', '${CPF}', '${email}', '${senha}', '${token}', '${telefone}');
    `;
    return database.executar(instrucaoSql);
}


module.exports = {
    autenticar,
    cadastrar,
    cadastrarCorporativo,
    autenticarToken
};