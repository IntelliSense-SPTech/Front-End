var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        res.json({
                            id_usuario: resultadoAutenticar[0].id_usuario,
                            cim: resultadoAutenticar[0].cim,
                            nome: resultadoAutenticar[0].nome,
                            tipo_usuario: resultadoAutenticar[0].tipo_usuario,
                            cpf: resultadoAutenticar[0].cpf,
                            email: resultadoAutenticar[0].email,
                            senha: resultadoAutenticar[0].senha,
                            token: resultadoAutenticar[0].token,
                            telefone: resultadoAutenticar[0].telefone
                        });

                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            )
    }
}

function autenticarToken(req, res) {
    var token = req.body.tokenServer;

    if (token == undefined) {
        res.status(400).send("Seu token está undefined!");
    } else {

        usuarioModel.autenticarToken(token)
            .then(
                function (resultadoAutenticar) {

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        res.json({
                            id_usuario: resultadoAutenticar[0].id_usuario,
                            cim: resultadoAutenticar[0].cim,
                            nome: resultadoAutenticar[0].nome,
                            tipo_usuario: resultadoAutenticar[0].tipo_usuario,
                            cpf: resultadoAutenticar[0].cpf,
                            email: resultadoAutenticar[0].email,
                            senha: resultadoAutenticar[0].senha,
                            token: resultadoAutenticar[0].token,
                            telefone: resultadoAutenticar[0].telefone
                        });

                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Token inválido");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo token");
                    }
                }
            )
    }
}

function cadastrarCorporativo(req, res) {
    let nome = req.body.nomeServer;
    let telefone = req.body.telServer;
    let email = req.body.emailServer;
    let senha = req.body.senhaServer;
    let CPF = req.body.CPFServer;
    let CIM = req.body.CIMServer;
    let token = req.body.tokenServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (CPF == undefined) {
        res.status(400).send("Seu CPF está undefined!");
    } else if (CIM == undefined) {
        res.status(400).send("Seu CIM está undefined!");
    } else if (token == undefined) {
        res.status(400).send("Seu token está undefined!");
    } else {

        console.log(token)

        usuarioModel.cadastrarCorporativo(nome, telefone, email, senha, CPF, CIM, token)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            )
    }
}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        usuarioModel.cadastrar(nome, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            )
    }
}

function mandarMensagem(req, res) {
    var nomeCompleto = req.body.nomeServer;
    var email = req.body.emailServer;
    var telefone = req.body.telefoneServer;
    var mensagem = req.body.mensagemServer;

    if (nomeCompleto == undefined) {
        res.status(400).send("Seu nome completo está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else if (mensagem == undefined) {
        res.status(400).send("Sua mensagem está undefined!");
    } else {
        usuarioModel.mandarMensagem(nomeCompleto, email, telefone, mensagem)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao enviar a mensagem! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrar,
    cadastrarCorporativo,
    autenticarToken,
    mandarMensagem
}