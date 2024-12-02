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

}