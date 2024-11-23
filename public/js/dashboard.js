document.addEventListener("DOMContentLoaded", function() {
    main();
  });

function main() {
    const anoSelecionado = select_ano.value

    getTotalCrimes(anoSelecionado)
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
                id_total_crimes_capital.textContent = resposta[0].totalCrimes // Capital
                id_total_crimes_gsp.textContent = resposta[1].totalCrimes // Grande SP
                id_total_crimes_litoral.textContent = resposta[2].totalCrimes // Litoral
            });
        }
    })
}