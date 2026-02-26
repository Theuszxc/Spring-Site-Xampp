const API = "http://localhost:8080/usuarios";

document.getElementById("formCadastro")
.addEventListener("submit", function(e) {
    e.preventDefault();

    const usuario = {
        nome: nome.value,
        email: email.value,
        senha: senha.value,
        perfil: perfil.value,
        endereco: endereco.value,
        bairro: bairro.value,
        complemento: complemento.value,
        cep: cep.value,
        cidade: cidade.value,
        estado: estado.value
    };

    fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario)
    })
    .then(res => {
        if (!res.ok) throw new Error("Erro ao cadastrar");
        return res.json();
    })
    .then(() => {
        alert("Usuário cadastrado com sucesso!");
        window.location.href = "usuarios.html";
    })
    .catch(err => alert(err.message));
});

function voltar() {
    window.location.href = "usuarios.html";
}
