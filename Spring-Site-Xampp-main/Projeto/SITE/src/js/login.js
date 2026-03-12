document
.getElementById("formLogin")
.addEventListener("submit", async function (e) {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const erro = document.getElementById("erro");

    erro.textContent = "";

    try {

        const response = await fetch("http://localhost:8080/usuarios/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                senha
            })
        });

        if (response.ok) {

            const usuario = await response.json();

            // salvar usuário no navegador

            localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

            // redirecionar

            window.location.href = "main.html";

        } else {

            erro.textContent = "Email ou senha inválidos.";

        }

    } catch {

        erro.textContent = "Erro ao conectar com o servidor.";

    }

});