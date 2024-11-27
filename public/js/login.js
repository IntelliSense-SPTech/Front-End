function fecharModal() {
    document.getElementById("modal").style.display = "none";
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

    if (!verificaEmail()) {
        return;
    }

    if (!validarSenha()) {
        return;
    }

    entrar()
}

function entrar() {
    const email = document.getElementById("input_email").value;
    const senha = document.getElementById("input_senha").value;


    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: email,
            senhaServer: senha
        })
    })
        .then(response => {
            if (response.ok) {
                console.log('to aqui:' + response)
                return response.json();
            } else {
                throw new Error("Erro ao autenticar. Verifique o email e a senha.");
                modal.style.display = "block";
            }
        })
        .then(data => {
            console.log("Usuário autenticado com sucesso:", data);

            sessionStorage.ID_USUARIO = data.id_usuario;
            sessionStorage.NOME = data.nome;
            sessionStorage.EMAIL = data.email;
            sessionStorage.TIPO_USUARIO = data.tipo_usuario

            const mensagemModal = document.getElementById("modal-message");
                mensagemModal.textContent = "Login realizado com sucesso!";
                const modal = document.getElementById("modal");
                modal.style.display = "block";
            
                setTimeout(() => {
                    modal.style.display = "none"; 
                    if (data.tipo_usuario == 'comum') {
                        irParaDashboardComum()
                    } else {
                        irParaAutenticacao()
                    }
                }, 1000);    

          
            
        })
        .catch(error => {
            console.error("Erro durante a autenticação:", error);
            alert(error.message);
        });
}

function autenticarToken() {
    const caractere_1 = document.getElementById('caractere_1').value
    const caractere_2 = document.getElementById('caractere_2').value
    const caractere_3 = document.getElementById('caractere_3').value
    const caractere_4 = document.getElementById('caractere_4').value
    const caractere_5 = document.getElementById('caractere_5').value
    const caractere_6 = document.getElementById('caractere_6').value

    const token = caractere_1 + caractere_2 + caractere_3 + caractere_4 + caractere_5 + caractere_6

    fetch("/usuarios/autenticarToken", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            tokenServer: token
        })
    })
        .then(response => {
            if (response.ok) {
                irParaDashboardCorporativa()
                return response.json();
            } else {
                throw new Error("Token invalido");
                modal.style.display = "block";
            }
        })
        .then(data => {
            console.log("Usuário autenticado com sucesso:", data);

            sessionStorage.ID_USUARIO = data.id_usuario;
            sessionStorage.NOME = data.nome;
            sessionStorage.EMAIL = data.email;
            sessionStorage.TIPO_USUARIO = data.tipo_usuario

        })
        .catch(error => {
            console.error("Erro durante a autenticação:", error);
            alert(error.message);
        });
}