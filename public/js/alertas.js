document.addEventListener("DOMContentLoaded", function () {
    main();
});

function main() {
    const anoSelecionado = 2024

    // getAlertas(anoSelecionado)
}


function getAlertas(ano) {
    fetch("/alertas/getAlertas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ anoServer: ano })
    })
    .then((response) => response.json())
    .then((dados) => {
        
        exibirNotificacoes(dados);
    })
    .catch((erro) => console.error("Erro ao carregar notificações:", erro));
}




