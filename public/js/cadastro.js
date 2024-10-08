const usuario = {
    nome: '',
    email: '',
    senha: ''
}

function validarInputs() {
    const nome = input_nome.value
    const email = input_email.value
    const senha = input_senha.value
    const confirmacaoSenha = input_confirmacao.value

    if (senha == confirmacaoSenha) {
        usuario.nome = nome
        usuario.email = email
        usuario.senha = senha
        cadastrar()

    } else {
        console.log('Senhas diferentes!')
    }
}

function cadastrar() {
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: usuario.nome,
            emailServer: usuario.email,
            senhaServer: usuario.senha
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                alert("Entrou")
    
            } else {
                console.log("ERRO: falha ao tentar realizar o cadastro!")
            }
        })

    return false;
}