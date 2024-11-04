function enviarDados() {
    const nome = input_nome.value
    const telefone = input_tel.value
    const email = input_email.value
    const senha = input_senha.value
    const CPF = input_CPF.value
    const CIM = input_CIM.value
    const token = gerarToken()
    
    if (!nome || !telefone || !email || !senha || !CPF || !CIM) {
        alert('Por favor, preencha todos os campos.');
        return false;
    }

    if (!validarEmail(email)) {
        alert('Por favor, insira um email válido (deve conter "@" e um domínio)');
        return false;
    }

    if (!validarCPF(CPF)) {
        alert('Por favor, insira um CPF válido (somente os números)');
        return false;
    }

    if (!validarCIM(CIM)) {
        alert('Por favor, insira um CIM válido (somente os números)');
        return false;
    }
   


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

function validarEmail(email) {
    return email.includes("@") && email.includes(".");
}

function validarCPF(CPF) {
    return CPF.length === 11;
}

function validarCIM(CIM) {
    return CIM.length === 9;
}