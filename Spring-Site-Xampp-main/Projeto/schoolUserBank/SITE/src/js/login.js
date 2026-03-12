document.querySelector("form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const response = await fetch("http://localhost:8080/usuarios/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, senha })
    });

    if (response.ok) {
        const usuario = await response.json();

        // 🔐 Salva usuário no navegador
        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

        // 🚀 Redireciona
        window.location.href = "main.html";

    } else {
        alert("Email ou senha inválidos!");
    }
});