document.addEventListener("DOMContentLoaded", function () {
    main();
});


function main() {
    carregarPerfil()
}

function carregarPerfil() {
    const CIM = sessionStorage.getItem('CIM');
    const EMAIL = sessionStorage.getItem('EMAIL');
    const CPF = sessionStorage.getItem('CPF');
    const NOME = sessionStorage.getItem('NOME');
    const TELEFONE = sessionStorage.getItem('TELEFONE');
    const TIPO_USUARIO = sessionStorage.getItem('TIPO_USUARIO');

    perfil_nome_usuario.textContent = `${NOME} - ${TIPO_USUARIO}`
    cim.value = CIM
    cpf.value = CPF
    email.value = EMAIL
    telefone.value = TELEFONE
}

function editarPerfil() {
    const ID_USUARIO = sessionStorage.getItem('ID_USUARIO');
    let novoNome = novo_nome.value
    let novoEmail = novo_email.value
    let novoTelefone = novo_telefone.value

    if (novoNome != '') {
        editarNome(novoNome, ID_USUARIO)
    } 
    if (novoEmail != '') {
        editarEmail(novoEmail, ID_USUARIO)
    } 
    if (novoTelefone != '') {
        editarTelefone(novoTelefone, ID_USUARIO)  
    } 
    novo_nome.value = ''
    novo_email.value = ''
    novo_telefone.value = ''
}

function editarNome(novoNome, ID_USUARIO) {
    if (novoNome == '') {
        alert('Preencha os campos que deseja alterar')
    } else {
    
        fetch("/usuarios/editarNome", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                novoNomeServer: novoNome,
                idUsuarioServer: ID_USUARIO
            })
        }).then(function (resposta) {
            if (resposta.ok) {
                sessionStorage.setItem('NOME', novoNome);
                carregarPerfil()
            }
        })
    }
    
}

function editarEmail(novoEmail, ID_USUARIO) {
    if (novoEmail == '') {
        alert('Preencha os campos que deseja alterar')
    } else {
        fetch("/usuarios/editarEmail", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                novoEmailServer: novoEmail,
                idUsuarioServer: ID_USUARIO
            })
        }).then(function (resposta) {
            if (resposta.ok) {

                if (resposta.ok) {
                    sessionStorage.setItem('EMAIL', novoEmail);
                    carregarPerfil()
                }
            }
        })
    }
    
}

function editarTelefone(novoTelefone, ID_USUARIO) {
    if (novoTelefone == '') {
        alert('Preencha os campos que deseja alterar')
    } else {
        fetch("/usuarios/editarTelefone", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                novoTelefoneServer: novoTelefone,
                idUsuarioServer: ID_USUARIO
            })
        }).then(function (resposta) {
            if (resposta.ok) {

                if (resposta.ok) {
                    sessionStorage.setItem('TELEFONE', novoTelefone);
                    carregarPerfil()
                }
            }
        })
    }
}