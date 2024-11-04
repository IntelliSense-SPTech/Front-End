function fecharModal() {
    document.getElementById("modal").style.display = "none";
}

function verificarNome() {
    const nomeinformado = document.getElementById("input_nome").value
    const modal = document.getElementById("modal");
    const mensagemModal = document.getElementById("modal-message");

    if (nomeinformado == '') {
        mensagemModal.textContent = "Preencha o campo nome";
        modal.style.display = "block";
        return false;
    }
}

function verificaEmail() {
    const emailInformado = document.getElementById("input_email").value;
    const modal = document.getElementById("modal");
    const mensagemModal = document.getElementById("modal-message");

    if (emailInformado.indexOf("@") === -1) {
        mensagemModal.textContent = "O email deve conter '@'.";
        modal.style.display = "block";
        return false;
    } else if (emailInformado.length === 0) {
        mensagemModal.textContent = "Tamanho do email inválido.";
        modal.style.display = "block";
        return false;
    } else {
        return true;
    }
}


function validarSenha() {
    const senha = document.getElementById("input_senha").value;
    const temMaiuscula = /[A-Z]/.test(senha);
    const temMinuscula = /[a-z]/.test(senha);
    const temEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);
    const temMinimoCaracteres = senha.length >= 6;

    if (temMaiuscula && temMinuscula && temEspecial && temMinimoCaracteres) {
        return true;
    } else {
        const mensagemModal = document.getElementById("modal-message");
        mensagemModal.textContent = "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um caractere especial e ter no mínimo 6 caracteres.";
        document.getElementById("modal").style.display = "block";
        return false;
    }
}

function validarInputs() {
    const senha = document.getElementById("input_senha").value;
    const confirmacao = document.getElementById("input_confirmacao").value;


    if (!verificaEmail()) {
        return;
    }

    if (!validarSenha()) {
        return;
    }

    if (senha !== confirmacao) {
        const mensagemModal = document.getElementById("modal-message");
        mensagemModal.textContent = "As senhas não coincidem.";
        document.getElementById("modal").style.display = "block";
        return;
    }

    cadastrar()
}

function cadastrar() {
    const nome = document.getElementById("input_nome").value
    const email = document.getElementById("input_email").value
    const senha = document.getElementById("input_senha").value

    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nome,
            emailServer: email,
            senhaServer: senha
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                alert("Usuário cadastrado com sucesso")
    
            } else {
                console.log("ERRO: falha ao tentar realizar o cadastro!")
            }
        })

    return false;
}