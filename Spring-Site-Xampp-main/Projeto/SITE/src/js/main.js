// 🔐 Verifica se existe usuário logado
const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!usuario) {
    // Se não tiver logado, volta para login
    window.location.href = "login.html";
}

// Mostra nome no canto superior direito
document.getElementById("nomeUsuario").textContent = usuario.nome;

// Logout
function logout() {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "index.html";
}