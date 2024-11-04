function postar() {
    let relatoNovo = document.getElementById('input_descricao').value

    const idUsuario = sessionStorage.getItem("ID_USUARIO");


    if (relatoNovo == "") {
        alert("Insira um texto")
    } else {
        fetch("/forum/postar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idUsuarioServer: idUsuario,
                relatoServer: relatoNovo
            })
        }).then(function (resposta) {
            if (resposta.ok) {
                console.log("Relato realizado")
                relatoNovo.value = ""
                listar()
            }
        }).catch(function (erro) {
            console.log("Não cadastrou", erro)
        })
        
        return false;
    }

}

function listar() {
    div_relatos.innerHTML = ''
    button_enviar_relato.value = "";
    fetch("/forum/listar", {
        method: "GET",
    }).then(res => {
        res.json()
            .then(listaRelatos => {
                listaRelatos.forEach(relato => {
                    console.log(relato)
    
                    div_relatos.innerHTML +=  
                    `
                    <div class="relato-card">
                        <div class="relato-header">
                        <p>
                            <i class="fa-solid fa-user"></i>
                            <strong>${relato.NomeUsuario}</strong>
                            </p>
                        </div>
                        <div class="relato-text">
                            <p>${relato.Relato}</p>
                        </div>
                    </div>
                    `
                })
            }
            )
    })
}


