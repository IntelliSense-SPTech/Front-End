document.addEventListener("DOMContentLoaded", function () {
    main();
});

function main() {
    const anoSelecionado = select_ano.value

    getUltimaAtualizacao()
    getTotalCrimes(anoSelecionado)
    getCrimeMaisIncidencias(anoSelecionado)
    getLocalidadeMaisIncidencias(anoSelecionado)
    getMesMaisIncidencias(anoSelecionado)
    getQtdCrimes(anoSelecionado)
    
}

function getTotalCrimes(anoSelecionado) {

    fetch("/dashboard/getTotalCrimes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            anoServer: anoSelecionado
        })
    }).then(function (resposta) {

        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                id_total_crimes_capital.textContent = resposta[0].totalCrimes
                id_total_crimes_gsp.textContent = resposta[1].totalCrimes
                id_total_crimes_litoral.textContent = resposta[2].totalCrimes
            });
        }
    })
}

function getCrimeMaisIncidencias(anoSelecionado) {

    fetch("/dashboard/getCrimeMaisIncidencias", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            anoServer: anoSelecionado
        })
    }).then(function (resposta) {

        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                id_crime_mais_incidencias.textContent =  resposta[0].especificacao
            });
        }
    })

}

function getLocalidadeMaisIncidencias(anoSelecionado) {

    fetch("/dashboard/getLocalidadeMaisIncidencias", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            anoServer: anoSelecionado
        })
    }).then(function (resposta) {

        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                id_regiao_mais_incidencias.textContent = resposta[0].localidade
            });
        }
    })

}

function getMesMaisIncidencias(anoSelecionado) {

    fetch("/dashboard/getMesMaisIncidencias", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            anoServer: anoSelecionado
        })
    }).then(function (resposta) {

        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                id_mes_mais_incidencias.textContent = resposta[0].mes
            });
        }
    })

}

function getQtdCrimes(anoSelecionado) {
    let localidade = select_localidade.value

    fetch("/dashboard/getQtdCrimes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            anoServer: anoSelecionado,
            localidadeServer: localidade
        })
    }).then(function (resposta) {

        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                dados = [resposta[0].qtdCrimes, resposta[1].qtdCrimes, resposta[2].qtdCrimes]
                barraHorizontalTotal.data.datasets[0].data = dados
                barraHorizontalTotal.update()
            });
        }
    })
}

function getUltimaAtualizacao() {
    fetch("/dashboard/getUltimaAtualizacao", {
      method: "GET",
    }).then(function (resposta) {

        if (resposta.ok) {
            
            resposta.json().then(function (resposta) {
                mes = resposta[0].ultimoMes
                ano = resposta[0].ultimoAno

                ultimaAtualizacaoUser.innerHTML = `Última atualização - 0${mes}/${ano}`
            });
        }
    })
  }
