function entrar() {
    const email = input_email.value
    const senha = input_senha.value

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: email,
            senhaServer: senha
        })
    }).then(function (resposta) {

        if (resposta.ok) {
            console.log(resposta);
            alert("Entrou")

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.ID_USUARIO = json.idUsuario;
                sessionStorage.NOME = json.nome;
                sessionStorage.EMAIL = json.email;
            });

        } else {
            alert("Usuario ainda nao cadastrado")
        }

    }).catch(function (erro) {
        console.log(erro);
    })

}