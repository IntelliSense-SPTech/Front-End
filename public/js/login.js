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
                irParaAutenticacao()
            }
            
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
                console.log('to aqui:' + response)
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

            irParaDashboardCorporativa()
            
        })
        .catch(error => {
            console.error("Erro durante a autenticação:", error);
            alert(error.message);
        });
}