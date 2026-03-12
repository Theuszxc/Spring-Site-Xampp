const API = "http://localhost:8080/usuarios";

document.addEventListener("DOMContentLoaded", () => {

    const fotoInput = document.getElementById("fotoInput");
    const preview = document.getElementById("preview");
    const fotoUsuario = document.getElementById("fotoUsuario");
    const form = document.getElementById("formCadastro");

    // ==============================
    // Preview da foto antes de enviar
    // ==============================
    if (fotoInput) {
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
    }

    // ==============================
    // Cadastro de usuário
    // ==============================
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const formData = new FormData(this);

            fetch(API, {
                method: "POST",
                body: formData
            })
            .then(async res => {
                if (!res.ok) {
                    const erro = await res.text();
                    throw new Error(erro || "Erro ao cadastrar");
                }
                return res.json();
            })
            .then(usuario => {
                alert("Usuário cadastrado com sucesso!");

                // mostra foto cadastrada
                if (usuario.foto && fotoUsuario) {
                    fotoUsuario.src = "http://localhost:8080/fotos/" + usuario.foto;
                    fotoUsuario.style.display = "block";
                }

                form.reset();
                if (preview) preview.style.display = "none";

                // atualiza lista
                carregarUsuarios();
            })
            .catch(err => {
                console.error("Erro:", err);
                alert("Erro ao cadastrar usuário: " + err.message);
            });
        });
    }

    // ==============================
    // Carregar lista de usuários
    // ==============================
    carregarUsuarios();
});

// ==============================
// FUNÇÃO CARREGAR USUÁRIOS
// ==============================
function carregarUsuarios() {
    fetch(API)
        .then(res => {
            if (!res.ok) throw new Error("Erro ao carregar usuários");
            return res.json();
        })
        .then(lista => {
            const tabela = document.getElementById("listaUsuarios");
            if (!tabela) return;

            tabela.innerHTML = "";

            lista.forEach(u => {
                tabela.innerHTML += `
                    <tr>
                        <td>${u.id}</td>
                        <td>${u.nome}</td>
                        <td>${u.email}</td>
                        <td>
                            ${u.foto ? `<img src="http://localhost:8080/fotos/${u.foto}" width="50" style="border-radius:50%;">` : ''}
                        </td>
                    </tr>
                `;
            });
        })
        .catch(err => {
            console.error("Erro ao carregar usuários:", err);
        });
}

// ==============================
// VOLTAR PÁGINA
// ==============================
function voltar() {
    window.location.href = "main.html";
}