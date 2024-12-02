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
    var instrucaoSql = `
        INSERT INTO Mensagem (nome, email, telefone, mensagem) VALUES ('${nomeCompleto}', '${email}', '${telefone}', '${mensagem}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editarNome(novoNome, idUsuario) {
    var instrucaoSql = `
    update usuarios set nome = '${novoNome}' where id_usuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editarEmail(novoEmail, idUsuario) {
    var instrucaoSql = `
    update usuarios set email = '${novoEmail}' where id_usuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editarTelefone(novoTelefone, idUsuario) {
    var instrucaoSql = `
    update usuarios set telefone = '${novoTelefone}' where id_usuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    autenticar,
    cadastrar,
    cadastrarCorporativo,
    autenticarToken,
    mandarMensagem,
    editarNome,
    editarEmail,
    editarTelefone
};