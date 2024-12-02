function irParaProjecao() {
    window.location.href = './projecao.html'
    
}

function irParaCadastro() {
    window.location.href = './cadastro.html'
}

function irParaLogin() {
    window.location.href = './login.html'
}

function irParaAutenticacao() {
    window.location.href = './autenticacao.html'
}

function ia() {
    window.location.href = '#inteligenciaArtificial';
}

function irGit(){
    window.location.href = 'https://github.com/IntelliSense-SPTech';
}

function irParaForum() {
    const tipo_usuario = sessionStorage.getItem("TIPO_USUARIO");

    if (tipo_usuario == 'comum') {
        window.location.href = './forumuser.html'
    } else {
        window.location.href = './forum.html'
    }
}

function irParaHome() {
    window.location.href = '../../index.html'
}

function irParaDashboardComum() {
    window.location.href = './comum/dashboarduser.html'
}

function irParaDashboardCorporativa() {
    window.location.href = './corporativo/dashboard.html'
}

function irParaPlanoAcao() {
    window.location.href = './plano-acao.html'
}

function irParaNoticias() {
    window.location.href = './noticias.html'
}

function irParaAlertas() {
    window.location.href = './alertas.html'
}

function irParaPerfil() {
    const tipo_usuario = sessionStorage.getItem("TIPO_USUARIO");

    if (tipo_usuario == 'comum') {
        window.location.href = './perfiluser.html'
    } else {
        window.location.href = './perfil.html'
    }
}

function irParaDashboard() {
    const tipo_usuario = sessionStorage.getItem("TIPO_USUARIO");

    if (tipo_usuario == 'comum') {
        window.location.href = './dashboarduser.html'
    } else {
        window.location.href = './dashboard.html'
    }
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('nome-usuario').textContent = sessionStorage.getItem("NOME");
});






  