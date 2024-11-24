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

function mandarMensagem(nomeCompleto, email, telefone, mensagem) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function mandarMensagem():", nomeCompleto, email, telefone, mensagem);
    var instrucaoSql = `
        INSERT INTO Mensagem (nome, email, telefone, mensagem) VALUES ('${nomeCompleto}', '${email}', '${telefone}', '${mensagem}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    autenticar,
    cadastrar,
    cadastrarCorporativo,
    autenticarToken,
    mandarMensagem
};