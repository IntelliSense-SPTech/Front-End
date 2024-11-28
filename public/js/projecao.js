document.addEventListener("DOMContentLoaded", function () {
    main();
});

function main() {
    const anoSelecionado = 2024
    const localidade = selecionar_regiao.value

    getComparacaoMes(anoSelecionado, localidade)
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

                function calcularPorcentagem(mesAnterior, mesAtual) {
                    let diferenca = mesAnterior - mesAtual

                    if (diferenca < 0) {
                        diferenca = diferenca * -1
                    }

                    porcentagem = ((diferenca / mesAnterior) * 100).toFixed(2)

                    return porcentagem
                }

                function mudarCor(mesAnterior, mesAtual) {
                    let diferenca = mesAnterior - mesAtual

                    if (diferenca <= 0) {
                        return '#2CD17D'
                    }

                    return 'red'
                }

                function mudarIcone(mesAnterior, mesAtual) {
                    let diferenca = mesAnterior - mesAtual

                    if (diferenca <= 0) {
                        return '<i class="bx bx-chevrons-down"></i>'
                    }

                    return '<i class="bx bx-chevrons-up"></i>'
                }

                porcentagem_latrocinio.textContent = `${calcularPorcentagem(latrocinioMesAnterior, latrocinioMesAtual)}%`
                porcentagem_latrocinio.style.color = mudarCor(latrocinioMesAnterior, latrocinioMesAtual)
                cor_latrocinio.style.color = mudarCor(latrocinioMesAnterior, latrocinioMesAtual)
                cor_latrocinio.innerHTML += mudarIcone(latrocinioMesAnterior, latrocinioMesAtual)

                porcentagem_roubo.textContent = `${calcularPorcentagem(rouboMesAnterior, rouboMesAtual)}%`
                porcentagem_roubo.style.color = mudarCor(rouboMesAnterior, rouboMesAtual)
                cor_roubo.style.color = mudarCor(rouboMesAnterior, rouboMesAtual)
                cor_roubo.innerHTML += mudarIcone(rouboMesAnterior, rouboMesAtual)

                porcentagem_furto.textContent = `${calcularPorcentagem(furtoMesAnterior, furtoMesAtual)}%`
                porcentagem_furto.style.color = mudarCor(furtoMesAnterior, furtoMesAtual)
                cor_furto.style.color = mudarCor(furtoMesAnterior, furtoMesAtual)
                cor_furto.innerHTML += mudarIcone(furtoMesAnterior, furtoMesAtual)
            });
        }
    })
}

