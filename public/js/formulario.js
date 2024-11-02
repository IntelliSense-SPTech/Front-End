function enviarDados() {
    const nome = input_nome.value
    const telefone = input_tel.value
    const email = input_email.value
    const senha = input_senha.value
    const CPF = input_CPF.value
    const CIM = input_CIM.value
    const token = gerarToken()
    
    // Aplicar validações

    fetch("/usuarios/cadastrarCorporativo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nome,
            telServer: telefone,
            emailServer: email,
            senhaServer: senha,
            CPFServer: CPF,
            CIMServer: CIM,
            tokenServer: token
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {

                alert('Dados enviados')
    
            } else {
                console.log("ERRO: falha ao tentar realizar o cadastro!")
            }
        })

    return false;
}

function gerarToken() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = '';
    for (let i = 0; i < 6; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      token += caracteres[indice];
    }
    return token;
  }
