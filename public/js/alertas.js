document.addEventListener("DOMContentLoaded", function () {
    main();
});

function main() {
    getAlertaAumento()
    getAlertaReducao()
}

function getAlertaAumento() {

    fetch("/alertas/getAlertaAumento", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
        })
    }).then(function (resposta) {

        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                let localidade = resposta[0].localidade
                let crime = resposta[0].crime
                let aumento = resposta[0].aumento_percentual
                div_alertas.innerHTML += `
                <div class="notification error">
                    <i class="fa-solid fa-triangle-exclamation fa-3x"></i>
                    <button class="close-btn" onclick="this.parentElement.style.display='none';"></button>
                    <div class="texts">
                        <h2>Aumento da criminalidade</h2>
                        <p>${localidade} aumentou em <span class="number">${aumento}%</span> dos casos de ${crime} em relação ao último mês</p>
                    </div>
                    <i class="fa-solid fa-chevron-up fa-2x"></i>
                </div>`
            });
        }
    })
}

function getAlertaReducao() {

    fetch("/alertas/getAlertaReducao", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
        })
    }).then(function (resposta) {

        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                let localidade = resposta[0].localidade
                let crime = resposta[0].crime
                let reducao = resposta[0].reducao_percentual
                div_alertas.innerHTML += `
                <div class="notification success">
                    <i class="icon fa-solid fa-circle-check fa-3x"> </i>
                    <button class="close-btn" onclick="this.parentElement.style.display='none';"></button>
                    <div class="texts">
                    <h2>Redução da criminalidade</h2>
                    <p>${localidade} reduziu em <span class="number">${reducao}%</span> dos casos de ${crime} em relação ao último mês</p>
                    </div>
                    <i class="fa-solid fa-chevron-down fa-2x"></i>
              </div>`
            });
        }
    })
}








