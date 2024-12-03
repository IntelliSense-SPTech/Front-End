document.addEventListener("DOMContentLoaded", function () {
    main();
});

const dadosProjecaoCapital = {
    localidade: 'Capital',
    latrocinioMesAtual: 0,
    rouboMesAtual: 0,
    furtoMesAtual: 0,
    taxaLatrocinio: 0,
    taxaRoubo: 0,
    taxaFurto: 0
}

const dadosProjecaoLitoral = {
    localidade: 'Litoral',
    latrocinioMesAtual: 0,
    rouboMesAtual: 0,
    furtoMesAtual: 0,
    taxaLatrocinio: 0,
    taxaRoubo: 0,
    taxaFurto: 0
}

const dadosProjecaoGrandeSP = {
    localidade: 'GrandeSP',
    latrocinioMesAtual: 0,
    rouboMesAtual: 0,
    furtoMesAtual: 0,
    taxaLatrocinio: 0,
    taxaRoubo: 0,
    taxaFurto: 0
}

const crimesGerais = {
    totalCrimesCapital: 0,
    totalCrimesLitoral: 0,
    totalCrimesGrandeSP: 0
}

function main() {
    const anoSelecionado = 2024

    getComparacaoMes(anoSelecionado, 'Capital')
    getComparacaoMes(anoSelecionado, 'Litoral')
    getComparacaoMes(anoSelecionado, 'Grande São Paulo')

    getMesAtual(anoSelecionado, 'Capital')
    getMesAtual(anoSelecionado, 'Litoral')
    getMesAtual(anoSelecionado, 'Grande São Paulo')
}


function getComparacaoMes(anoSelecionado, localidade) {
    fetch("/projecao/getComparacaoMes", {
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
                let rouboMesAtual = resposta[5].qtdCrimes
                let furtoMesAtual = resposta[1].qtdCrimes
                let latrocinioMesAtual = resposta[3].qtdCrimes

                if (localidade == 'Capital') {
                    dadosProjecaoCapital.rouboMesAtual = rouboMesAtual
                    dadosProjecaoCapital.furtoMesAtual = furtoMesAtual
                    dadosProjecaoCapital.latrocinioMesAtual = latrocinioMesAtual
                } 

                if (localidade == 'Litoral') {
                    dadosProjecaoLitoral.rouboMesAtual = rouboMesAtual
                    dadosProjecaoLitoral.furtoMesAtual = furtoMesAtual
                    dadosProjecaoLitoral.latrocinioMesAtual = latrocinioMesAtual
                }

                if (localidade == 'Grande São Paulo') {
                    dadosProjecaoGrandeSP.rouboMesAtual = rouboMesAtual
                    dadosProjecaoGrandeSP.furtoMesAtual = furtoMesAtual
                    dadosProjecaoGrandeSP.latrocinioMesAtual = latrocinioMesAtual
                }

            });
        }
    })
}

function getMesAtual(anoSelecionado, localidade) {
    fetch("/projecao/getMesAtual", {
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
                mesAtual = resposta[0].mes_atual
                getCasosEstimados(anoSelecionado, mesAtual, localidade)
            });
        }
    })
}

function getCasosEstimados(anoSelecionado, mesAtual, localidade) {

    fetch("/projecao/getCasosEstimados", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            anoServer: anoSelecionado,
            mesServer: mesAtual,
            localidadeServer: localidade
        })
    }).then(function (resposta) {

        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                let rouboMesAnoPassado = resposta[4].qtdCrimes
                let rouboMesPosterior = resposta[5].qtdCrimes
                let furtoMesAnoPassado = resposta[0].qtdCrimes
                let furtoMesPosterior  = resposta[1].qtdCrimes
                let latrocinioMesAnoPassado = resposta[2].qtdCrimes
                let latrocinioMesPosterior = resposta[3].qtdCrimes

                if (localidade == 'Capital') {
                    let taxaLatrocinio = calcularPorcentagem(latrocinioMesAnoPassado, latrocinioMesPosterior)
                    let taxaRoubo = calcularPorcentagem(rouboMesAnoPassado, rouboMesPosterior)
                    let taxaFurto = calcularPorcentagem(furtoMesAnoPassado, furtoMesPosterior)
                    dadosProjecaoCapital.taxaRoubo = taxaRoubo
                    dadosProjecaoCapital.taxaFurto = taxaFurto
                    dadosProjecaoCapital.taxaLatrocinio = taxaLatrocinio
                    distribuirTropas(dadosProjecaoCapital)
                    exibirDistribuicao(crimesGerais)
                } 

                if (localidade == 'Litoral') {
                    let taxaLatrocinio = calcularPorcentagem(latrocinioMesAnoPassado, latrocinioMesPosterior)
                    let taxaRoubo = calcularPorcentagem(rouboMesAnoPassado, rouboMesPosterior)
                    let taxaFurto = calcularPorcentagem(furtoMesAnoPassado, furtoMesPosterior)
                    dadosProjecaoLitoral.taxaRoubo = taxaRoubo
                    dadosProjecaoLitoral.taxaFurto = taxaFurto
                    dadosProjecaoLitoral.taxaLatrocinio = taxaLatrocinio
                    distribuirTropas(dadosProjecaoLitoral)
                    exibirDistribuicao(crimesGerais)
                }

                if (localidade == 'Grande São Paulo') {
                    let taxaLatrocinio = calcularPorcentagem(latrocinioMesAnoPassado, latrocinioMesPosterior)
                    let taxaRoubo = calcularPorcentagem(rouboMesAnoPassado, rouboMesPosterior)
                    let taxaFurto = calcularPorcentagem(furtoMesAnoPassado, furtoMesPosterior)
                    dadosProjecaoGrandeSP.taxaRoubo = taxaRoubo
                    dadosProjecaoGrandeSP.taxaFurto = taxaFurto
                    dadosProjecaoGrandeSP.taxaLatrocinio = taxaLatrocinio
                    distribuirTropas(dadosProjecaoGrandeSP)
                    exibirDistribuicao(crimesGerais)
                }

                function calcularPorcentagem(mesAtual, mesEstimado) {
                    let diferenca = mesEstimado - mesAtual

                    porcentagem = ((diferenca / mesAtual) * 100).toFixed(2)

                    return porcentagem
                }

            });
        }
    })
}


function distribuirTropas(dados) {
    let rouboMesAtual = Number(dados.rouboMesAtual);
    let furtoMesAtual = Number(dados.furtoMesAtual);
    let latrocínioMesAtual = Number(dados.latrocinioMesAtual);

    let taxaRoubo = Number(dados.taxaRoubo);
    let taxaFurto = Number(dados.taxaFurto);
    let taxaLatrocinio = Number(dados.taxaLatrocinio);

    let rouboAtual = 0;
    let furtoAtual = 0;
    let latrocinioAtual = 0;

    if (taxaRoubo < 0) {
        rouboAtual = rouboMesAtual - (rouboMesAtual * Math.abs(taxaRoubo) / 100);
    } else {
        rouboAtual = rouboMesAtual + (rouboMesAtual * taxaRoubo / 100);
    }

    if (taxaFurto < 0) {
        furtoAtual = furtoMesAtual - (furtoMesAtual * Math.abs(taxaFurto) / 100);
    } else {
        furtoAtual = furtoMesAtual + (furtoMesAtual * taxaFurto / 100);
    }

    if (taxaLatrocinio < 0) {
        latrocinioAtual = latrocínioMesAtual - (latrocínioMesAtual * Math.abs(taxaLatrocinio) / 100);
    } else {
        latrocinioAtual = latrocínioMesAtual + (latrocínioMesAtual * taxaLatrocinio / 100);
    }

    let totalCrimes = rouboAtual + furtoAtual + latrocinioAtual

    if(dados.localidade == 'Capital') {
        crimesGerais.totalCrimesCapital = totalCrimes
    }

    if(dados.localidade == 'Litoral') {
        crimesGerais.totalCrimesLitoral = totalCrimes
    }

    if(dados.localidade == 'GrandeSP') {
        crimesGerais.totalCrimesGrandeSP = totalCrimes
    }

}

function exibirDistribuicao(dados) {
    let frota = Number(input_frota.value)
    
    let totalCrimesCapital = Number(dados.totalCrimesCapital)
    let totalCrimesLitoral = Number(dados.totalCrimesLitoral)
    let totalCrimesGrandeSP = Number(dados.totalCrimesGrandeSP)
    let somatoriaCrimes = totalCrimesCapital + totalCrimesLitoral + totalCrimesGrandeSP

    let porcentagemCapital = (totalCrimesCapital * 100) / somatoriaCrimes
    let porcentagemLitoral = (totalCrimesLitoral * 100) / somatoriaCrimes
    let porcentagemGrandeSP = (totalCrimesGrandeSP * 100) / somatoriaCrimes
    
    porcentagem_capital.textContent = `${porcentagemCapital.toFixed(2)}%`
    porcentagem_litoral.textContent = `${porcentagemLitoral.toFixed(2)}%`
    porcentagem_grandesp.textContent = `${porcentagemGrandeSP.toFixed(2)}%`

    let qtdPoliciaisCapital = frota * (porcentagemCapital / 100)
    let qtdPoliciaisLitoral = frota * (porcentagemLitoral / 100)
    let qtdPoliciaisGrandeSP = frota * (porcentagemGrandeSP / 100)

    policiais_capital.textContent = `${qtdPoliciaisCapital.toFixed(0)} policiais`
    policiais_litoral.textContent = `${qtdPoliciaisLitoral.toFixed(0)} policiais`
    policiais_grandesp.textContent = `${qtdPoliciaisGrandeSP.toFixed(0)} policiais`
}







