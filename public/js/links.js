function irParaProjecao() {
    alert("teste")
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
    window.location.href = 'https://github.com/DataSecurity05/SiteInstitucional';
}

function irParaForum() {
    window.location.href = './forum.html'
}

function irParaHome() {
    window.location.href = '../index.html'
}

function irParaDashboardComum() {
    window.location.href = './dashboarduser.html'
}

function irParaDashboardCorporativa() {
    window.location.href = './dashboard.html'
}

function irParaDashboard() {
    const tipo_usuario = sessionStorage.getItem("TIPO_USUARIO");

    if (tipo_usuario == 'comum') {
        window.location.href = './dashboarduser.html'
    } else {
        window.location.href = './dashboard.html'
    }
}

function irParaNoticias() {
    window.location.href = './noticias.html'
}

function irParaPerfil() {
    window.location.href = './perfil.html'
}
function irParaForumUser() {
    window.location.href = './forumuser.html'
}
function irParaPerfilUser() {
    window.location.href = './perfiluser.html'
}
function irParaHomeUser() {
    window.location.href = '../../index.html'
}

