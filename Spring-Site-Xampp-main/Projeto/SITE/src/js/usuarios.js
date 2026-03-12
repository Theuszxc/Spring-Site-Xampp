const API = "http://localhost:8080/usuarios";
const tabela = document.getElementById("tabelaUsuarios");

function carregarUsuarios() {

    fetch(API)
        .then(res => res.json())
        .then(usuarios => {

            tabela.innerHTML = "";

            usuarios.forEach(usuario => {

                const tr = document.createElement("tr");

                tr.innerHTML = `
                    <td>
                        <img src="${usuario.foto || ''}" width="50">
                    </td>
                    <td>${usuario.nome}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.perfil}</td>
                    <td>${usuario.cidade ?? ""}</td>
                    <td>
                        <button class="editar" onclick="editar(${usuario.id})">Editar</button>
                        <button class="excluir" onclick="deletar(${usuario.id})">Excluir</button>
                    </td>
                `;

                tabela.appendChild(tr);

            });

        });

}

function novoUsuario() {
    window.location.href = "cadastro.html";
}

function deletar(id) {

    if (!confirm("Deseja excluir?")) return;

    fetch(`${API}/${id}`, { method: "DELETE" })
        .then(res => {

            if (!res.ok) throw new Error("Erro ao excluir");

            carregarUsuarios();

        })
        .catch(err => alert(err.message));
}

function editar(id) {

    const nome = prompt("Novo nome:");
    const email = prompt("Novo email:");
    const perfil = prompt("Novo perfil:");

    fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, perfil })
    })
    .then(res => {

        if (!res.ok) throw new Error("Erro ao atualizar");

        carregarUsuarios();

    })
    .catch(err => alert(err.message));
}

carregarUsuarios();