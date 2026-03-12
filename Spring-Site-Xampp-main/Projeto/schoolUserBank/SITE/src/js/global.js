const areaUsuario = document.getElementById("areaUsuario");
const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

if (usuario) {
    // Usuário logado
    areaUsuario.innerHTML = `
        <span>Olá, ${usuario.nome}</span>
        <button onclick="logout()">Sair</button>
    `;
} else {
    // Usuário NÃO logado
    areaUsuario.innerHTML = `<a href="login.html">Login</a>`;
}

function logout() {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "main.html";
}