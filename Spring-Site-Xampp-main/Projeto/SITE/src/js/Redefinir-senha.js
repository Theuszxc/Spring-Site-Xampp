// Pega o email da URL
const urlParams = new URLSearchParams(window.location.search);
const emailUsuario = urlParams.get("email");

const infoEmail = document.getElementById("infoEmail");
const form = document.getElementById("redefinirForm");
const mensagem = document.getElementById("mensagem");

if (emailUsuario) {
    infoEmail.innerText = `Redefinindo para: ${emailUsuario}`;
} else {
    alert("E-mail não identificado na URL!");
}

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const novaSenha = document.getElementById("novaSenha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;

    if (novaSenha !== confirmarSenha) {
        mensagem.innerHTML = '<span style="color:red;">As senhas não coincidem!</span>';
        return;
    }

    try {

        const response = await fetch("http://localhost:8080/usuarios/redefinir-senha", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email: emailUsuario,
                novaSenha: novaSenha
            })
        });

        if (response.ok) {

            mensagem.innerHTML = '<span style="color:green;">Senha alterada com sucesso! Redirecionando...</span>';

            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);

        } else {

            throw new Error();

        }

    } catch (err) {

        mensagem.innerHTML = '<span style="color:red;">Erro ao atualizar senha.</span>';

    }

});