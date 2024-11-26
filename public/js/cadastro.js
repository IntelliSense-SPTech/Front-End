

function fecharModal() {
    document.getElementById("modal").style.display = "none";
}

function verificarNome() {
    const nomeInformado = document.getElementById("input_nome").value;
    const modal = document.getElementById("modal");
    const mensagemModal = document.getElementById("modal-message");

    if (nomeInformado === '') {
        mensagemModal.textContent = "Preencha o campo nome";
        modal.style.display = "block";
        return false;
    }
    return true;
}

function verificaEmail() {
    const emailInformado = document.getElementById("input_email").value;
    const modal = document.getElementById("modal");
    const mensagemModal = document.getElementById("modal-message");

    if (emailInformado.length === 0) {
        mensagemModal.textContent = "O campo de email não pode estar vazio.";
        modal.style.display = "block";
        return false;
    } else if (emailInformado.indexOf("@") === -1) {
        mensagemModal.textContent = "O email deve conter '@'.";
        modal.style.display = "block";
        return false;
    }
    return true;
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
    if (!verificarNome()) return;
    if (!verificaEmail()) return;
    if (!validarSenha()) return;

    cadastrar();
}

function cadastrar() {
    const nome = document.getElementById("input_nome").value;
    const email = document.getElementById("input_email").value;
    const senha = document.getElementById("input_senha").value;

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
        .then((resposta) => {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                const mensagemModal = document.getElementById("modal-message");
                mensagemModal.textContent = "Cadastrado com sucesso!";
                document.getElementById("modal").style.display = "block";

                setTimeout(() => {
                    document.getElementById("modal").style.display = "block";
                  }, "2000");
            } else {
                const mensagemModal = document.getElementById("modal-message");
                mensagemModal.textContent = "Erro ao tentar realizar o cadastro. Tente novamente.";
                document.getElementById("modal").style.display = "block";
            }
        })
        .catch((error) => {
            console.error("Erro: ", error);
            const mensagemModal = document.getElementById("modal-message");
            mensagemModal.textContent = "Erro no servidor. Tente novamente mais tarde.";
            document.getElementById("modal").style.display = "block";
        });

    return false;
}
