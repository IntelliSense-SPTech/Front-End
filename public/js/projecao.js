document.addEventListener("DOMContentLoaded", function () {
    main();
});

const dadosProjecao = {
    latrocinioMesAtual: 0,
    rouboMesAtual: 0,
    furtoMesAtual: 0
}

function main() {
    const anoSelecionado = 2024
    const localidade = selecionar_regiao.value

    getComparacaoMes(anoSelecionado, localidade)
    getMesAtual(anoSelecionado, localidade)
    trocarRegiaoTitulo(localidade)
}

function trocarRegiaoTitulo(localidade) {
    let titulo = document.getElementById('id_localidade')
    let tituloProjecao = document.getElementById('id_localidade_projetada')

    

    if (localidade == 'Litoral') {
        titulo.textContent = `no ${localidade}`
    } else {
        titulo.textContent = `na ${localidade}`
    }

    if (localidade == 'Litoral') {
        tituloProjecao.textContent = `no ${localidade}`
    } else {
        tituloProjecao.textContent = `na ${localidade}`
    }
   
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
                let rouboMesAnterior = resposta[4].qtdCrimes
                let furtoMesAtual = resposta[1].qtdCrimes
                let furtoMesAnterior = resposta[0].qtdCrimes
                let latrocinioMesAtual = resposta[3].qtdCrimes
                let latrocinioMesAnterior = resposta[2].qtdCrimes

                dadosProjecao.rouboMesAtual = rouboMesAtual
                dadosProjecao.furtoMesAtual = furtoMesAtual
                dadosProjecao.latrocinioMesAtual = latrocinioMesAtual

                function calcularPorcentagem(mesAnterior, mesAtual) {
                    let diferenca = mesAtual - mesAnterior;

                    if (diferenca < 0) {
                        diferenca = diferenca * -1
                    } 
                
                    let porcentagem = ((diferenca / mesAnterior) * 100).toFixed(2);
                
                    return `${porcentagem}%`;
                }
                

                function mudarCor(mesAnterior, mesAtual) {
                    let diferenca = mesAnterior - mesAtual

                    if (diferenca < 0) {
                        return 'red'
                    }

                    return '#2CD17D'
                }

                function mudarIcone(mesAnterior, mesAtual) {
                    let diferenca = mesAnterior - mesAtual

                    if (diferenca < 0) {
                        return '<i class="bx bx-chevrons-up"></i>'
                    }

                    return '<i class="bx bx-chevrons-down"></i>'
                }
            
                porcentagem_latrocinio.textContent = `${calcularPorcentagem(latrocinioMesAnterior, latrocinioMesAtual)}`
                porcentagem_latrocinio.style.color = mudarCor(latrocinioMesAnterior, latrocinioMesAtual)
                cor_latrocinio.style.color = mudarCor(latrocinioMesAnterior, latrocinioMesAtual)
                icone_latrocinio.style.color = mudarCor(latrocinioMesAnterior, latrocinioMesAtual)
                icone_latrocinio.innerHTML = mudarIcone(latrocinioMesAnterior, latrocinioMesAtual)

                porcentagem_roubo.textContent = `${calcularPorcentagem(rouboMesAnterior, rouboMesAtual)}`
                porcentagem_roubo.style.color = mudarCor(rouboMesAnterior, rouboMesAtual)
                cor_roubo.style.color = mudarCor(rouboMesAnterior, rouboMesAtual)
                icone_roubo.style.color = mudarCor(rouboMesAnterior, rouboMesAtual)
                icone_roubo.innerHTML = mudarIcone(rouboMesAnterior, rouboMesAtual)

                porcentagem_furto.textContent = `${calcularPorcentagem(furtoMesAnterior, furtoMesAtual)}`
                porcentagem_furto.style.color = mudarCor(furtoMesAnterior, furtoMesAtual)
                cor_furto.style.color = mudarCor(furtoMesAnterior, furtoMesAtual)
                icone_furto.style.color = mudarCor(furtoMesAnterior, furtoMesAtual)
                icone_furto.innerHTML = mudarIcone(furtoMesAnterior, furtoMesAtual)
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

                let diferencaLatrocinio = diferenca(latrocinioMesAnoPassado, latrocinioMesPosterior)
                let diferencaRoubo = diferenca(rouboMesAnoPassado, rouboMesPosterior)
                let diferencaFurto = diferenca(furtoMesAnoPassado, furtoMesPosterior)

                let taxaLatrocinio = calcularPorcentagem(latrocinioMesAnoPassado, latrocinioMesPosterior)
                let taxaRoubo = calcularPorcentagem(rouboMesAnoPassado, rouboMesPosterior)
                let taxaFurto = calcularPorcentagem(furtoMesAnoPassado, furtoMesPosterior)

                function diferenca(mesAnterior, mesAtual) {
                    let diferenca = mesAnterior - mesAtual

                    if (diferenca < 0) {
                        return 'Aumentou'
                    }

                    return 'Reduziu'
                }

                function calcularPorcentagem(mesAtual, mesEstimado) {
                    let diferenca = mesAtual - mesEstimado

                    if (diferenca < 0) {
                        diferenca = diferenca * -1
                    }

                    porcentagem = ((diferenca / mesAtual) * 100).toFixed(2)

                    return porcentagem
                }

                function mudarCor(diferenca) {

                    if (diferenca == 'Aumentou') {
                        return 'red'
                    }

                    return '#2CD17D'
                }

                function mudarIcone(diferenca) {

                    if (diferenca == 'Aumentou') {
                        return '<i class="bx bx-chevrons-up"></i>'
                    }

                    return '<i class="bx bx-chevrons-down"></i>'
                }

                
                porcentagem_latrocinio_estimado.textContent = `${taxaLatrocinio}%`
                porcentagem_latrocinio_estimado.style.color = mudarCor(diferencaLatrocinio)
                cor_latrocinio_estimado.style.color = mudarCor(diferencaLatrocinio)
                icone_latrocinio_estimado.style.color = mudarCor(diferencaLatrocinio)
                icone_latrocinio_estimado.innerHTML = mudarIcone(diferencaLatrocinio)

                porcentagem_roubo_estimado.textContent = `${taxaRoubo}%`
                porcentagem_roubo_estimado.style.color = mudarCor(diferencaRoubo)
                cor_roubo_estimado.style.color = mudarCor(diferencaRoubo)
                icone_roubo_estimado.style.color = mudarCor(diferencaRoubo)
                icone_roubo_estimado.innerHTML = mudarIcone(diferencaRoubo)

                porcentagem_furto_estimado.textContent = `${taxaFurto}%`
                porcentagem_furto_estimado.style.color = mudarCor(diferencaFurto)
                cor_furto_estimado.style.color = mudarCor(diferencaFurto)
                icone_furto_estimado.style.color = mudarCor(diferencaFurto)
                icone_furto_estimado.innerHTML = mudarIcone(diferencaFurto)
            });
        }
    })
}

