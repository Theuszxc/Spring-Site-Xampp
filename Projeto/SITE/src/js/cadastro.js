const API = "http://localhost:8080/usuarios";

const fotoInput = document.getElementById("fotoInput");
const preview = document.getElementById("preview");
const fotoUsuario = document.getElementById("fotoUsuario");

// Preview da foto antes de enviar
fotoInput.addEventListener("change", function () {
    const arquivo = this.files[0];
    if (arquivo) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = "block";
        };
        reader.readAsDataURL(arquivo);
    }
});

// Envio do formulário
document.getElementById("formCadastro").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nome", document.getElementById("nome").value);
    formData.append("email", document.getElementById("email").value);
    formData.append("senha", document.getElementById("senha").value);
    formData.append("perfil", document.getElementById("perfil").value);
    formData.append("endereco", document.getElementById("endereco").value);
    formData.append("bairro", document.getElementById("bairro").value);
    formData.append("complemento", document.getElementById("complemento").value);
    formData.append("cep", document.getElementById("cep").value);
    formData.append("cidade", document.getElementById("cidade").value);
    formData.append("estado", document.getElementById("estado").value);

    if (fotoInput.files[0]) {
        formData.append("foto", fotoInput.files[0]);
    }

    fetch(API, {
        method: "POST",
        body: formData
    })
    .then(async res => {
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || "Erro ao cadastrar usuário");
        }
        return res.json();
    })
    .then(usuario => {
        alert("Usuário cadastrado com sucesso!");

        // Mostra a foto cadastrada
        if (usuario.foto) {
            fotoUsuario.src = "http://localhost:8080/" + usuario.foto;
            fotoUsuario.style.display = "block";
        }

        // Limpa o formulário e preview
        document.getElementById("formCadastro").reset();
        preview.style.display = "none";
    })
    .catch(err => {
        console.error("Erro detectado:", err);
        alert("Erro ao cadastrar usuário: " + err.message);
    });
});

// Função para voltar à página principal
function voltar() {
    window.location.href = "main.html";
}