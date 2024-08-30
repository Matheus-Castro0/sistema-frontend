window.onload = function (e) {

    var botao = document.getElementById("botao");

    var txtEmail = document.getElementById("txtEmail");

    txtEmail.focus();

    botao.onclick = function (e) {

        e.preventDefault();

        var email = txtEmail.value;

        if (email == "") {
            exibirMensagemErro("Campo E-mail obrigatório.");
        }

        else {
            mandarCodigoConfirmacao(email);
        }

    }

    function exibirMensagemErro(mensagem) {

        var spnErro = document.getElementById("spnErro");

        spnErro.innerText = mensagem;

        spnErro.style.display = "block";

        setTimeout(function () {
            spnErro.style.display = "none";
        }, 5000);
    }

    function mandarCodigoConfirmacao(email) {

        var data = JSON.stringify({
            "email": email
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                var result = JSON.parse(this.responseText);

                if (result.sucesso) {

                    alert("O E-mail de confirmação foi enviado com sucesso!")
                }

                else {
                    exibirMensagemErro(result.mensagem);
                }
            }
        });

        xhr.open("POST", "https://localhost:44379/api/usuario/esqueceusenha");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    }

}