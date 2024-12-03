document.addEventListener("DOMContentLoaded", function () {
    main();
});

function main() {
    const anoSelecionado = select_ano.value

    getUltimaAtualizacao()
    getTotalCrimes(anoSelecionado)
    getQtdCrimesGsp(anoSelecionado)
    getQtdCrimesCapital(anoSelecionado)
    getQtdCrimesLitoral(anoSelecionado)
    getTotalCrimesMensal(anoSelecionado)
    getTotalCrimesLocalidadeMensal(anoSelecionado)
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
function getQtdCrimesGsp(anoSelecionado) {

    fetch("/dashboard/getQtdCrimesGsp", {
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
                dados = [resposta[0].qtdCrimes, resposta[1].qtdCrimes, resposta[2].qtdCrimes]
                barrasGsp.data.datasets[0].data = dados
                barrasGsp.update()
            });
        }
    })
}

function getQtdCrimesCapital(anoSelecionado) {

    fetch("/dashboard/getQtdCrimesCapital", {
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
                dados = [resposta[0].qtdCrimes, resposta[1].qtdCrimes, resposta[2].qtdCrimes]
                barrasCapital.data.datasets[0].data = dados
                barrasCapital.update()
            });
        }
    })
}


function getQtdCrimesLitoral(anoSelecionado) {

    fetch("/dashboard/getQtdCrimesLitoral", {
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
                dados = [resposta[0].qtdCrimes, resposta[1].qtdCrimes, resposta[2].qtdCrimes]
                barrasLitoral.data.datasets[0].data = dados
                barrasLitoral.update()
            });
        }
    })
}

function getTotalCrimesMensal(anoSelecionado) {

    fetch("/dashboard/getTotalCrimesMensal", {
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
                const dadosFurto = [];
                const dadosRoubo = [];
                const dadosLatrocinio = [];
                const labels = [];

                resposta.forEach(item => {
                    const mes = item.mes - 1;
                    const qtdCrimes = parseInt(item.qtdCrimes, 10);

                    if (item.especificacao === 'Furto') {
                        dadosFurto[mes] = qtdCrimes;
                    } else if (item.especificacao === 'Roubo') {
                        dadosRoubo[mes] = qtdCrimes;
                    } else if (item.especificacao === 'Latrocínio') {
                        dadosLatrocinio[mes] = qtdCrimes;
                    }
                });

                for (let i = 0; i < 12; i++) {
                    if (dadosFurto[i] || dadosRoubo[i] || dadosLatrocinio[i]) {
                        labels.push(["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"][i]);
                    }
                }

                linhaTotalCrimes.data.labels = labels;
                linhaTotalCrimes.data.datasets[0].data = dadosFurto.filter(x => x !== undefined)
                linhaTotalCrimes.data.datasets[1].data = dadosRoubo.filter(x => x !== undefined)
                linhaTotalCrimes.data.datasets[2].data = dadosLatrocinio.filter(x => x !== undefined)
                linhaTotalCrimes.update()
            });
        }
    })
}

function getTotalCrimesLocalidadeMensal(anoSelecionado) {

    fetch("/dashboard/getTotalCrimesLocalidadeMensal", {
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
                const dadosCapital = [];
                const dadosGrandeSaoPaulo = [];
                const dadosLitoral = [];
                const labels = [];

                resposta.forEach(item => {
                    const mes = item.mes - 1;  
                    const qtdCrimes = parseInt(item.qtdCrimes, 10); 

                    if (item.localidade === 'Capital') {
                        dadosCapital[mes] = qtdCrimes;
                    } else if (item.localidade === 'Grande São Paulo') {
                        dadosGrandeSaoPaulo[mes] = qtdCrimes;
                    } else if (item.localidade === 'Litoral') {
                        dadosLitoral[mes] = qtdCrimes;
                    }
                });

                for (let i = 0; i < 12; i++) {
                    if (dadosCapital[i] || dadosGrandeSaoPaulo[i] || dadosLitoral[i]) {
                        labels.push(["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"][i]);
                    }
                }

                linhaTotalCrimesRegiao.data.labels = labels;
                linhaTotalCrimesRegiao.data.datasets[0].data = dadosCapital.filter(x => x !== undefined);  
                linhaTotalCrimesRegiao.data.datasets[1].data = dadosGrandeSaoPaulo.filter(x => x !== undefined); 
                linhaTotalCrimesRegiao.data.datasets[2].data = dadosLitoral.filter(x => x !== undefined);  
                linhaTotalCrimesRegiao.update(); 
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

                ultimaAtualizacao.innerHTML = `Última atualização - 0${mes}/${ano}`
            });
        }
    })
  }




