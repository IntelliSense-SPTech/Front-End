// function fecharModal() {
//     document.getElementById("modal").style.display = "none";
// }

// function verificarEmail() {
//     const emailInformado = document.getElementById("input_email").value;
//     const modal = document.getElementById("modal");
//     const mensagemModal = document.getElementById("modal-message");

//     if (emailInformado.indexOf("@") === -1) {
//         mensagemModal.textContent = "Email inválido";
//         modal.style.display = "block";
//         return false;
//     } else if (emailInformado.length === 0) {
//         mensagemModal.textContent = "Tamanho do email inválido.";
//         modal.style.display = "block";
//         return false;
//     } else {
//         return true;
//     }
// }

// function verificarSenha() {
//     const senha = document.getElementById("input_senha").value;

//     const temMaiuscula = /[A-Z]/.test(senha);
//     const temMinuscula = /[a-z]/.test(senha);
//     const temEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);
//     const temMinimoCaracteres = senha.length >= 6;

//     if (temMaiuscula && temMinuscula && temEspecial && temMinimoCaracteres) {
//         return true;
//     } else {
//         const mensagemModal = document.getElementById("modal-message");
//         mensagemModal.textContent = "Senha Incorreta!";
//         document.getElementById("modal").style.display = "block";
//         return false;
//     }
// }

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

            if (data.tipo_usuario == 'comum') {
                irParaDashboardComum()
            } else {
                irParaTelaToken()
            }
            
        })
        .catch(error => {
            console.error("Erro durante a autenticação:", error);
            alert(error.message);
        });
}