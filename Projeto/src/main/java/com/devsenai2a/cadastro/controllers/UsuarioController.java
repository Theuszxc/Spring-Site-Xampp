package com.devsenai2a.cadastro.controllers;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.devsenai2a.cadastro.entities.Usuario;
import com.devsenai2a.cadastro.services.UsuarioService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    // LISTAR TODOS
    @GetMapping
    public List<Usuario> listarUsuarios() {
        return service.listarTodos();
    }

    // CADASTRAR USUÁRIO COM FOTO
    @PostMapping
    public ResponseEntity<Usuario> cadastrarUsuario(
            @RequestParam String nome,
            @RequestParam String email,
            @RequestParam String senha,
            @RequestParam String perfil,
            @RequestParam(required = false) String endereco,
            @RequestParam(required = false) String bairro,
            @RequestParam(required = false) String complemento,
            @RequestParam(required = false) String cep,
            @RequestParam(required = false) String cidade,
            @RequestParam(required = false) String estado,
            @RequestParam(required = false) MultipartFile foto
    ) {
        try {
            Usuario usuario = new Usuario();
            usuario.setNome(nome);
            usuario.setEmail(email);
            usuario.setSenha(senha);
            usuario.setPerfil(perfil);
            usuario.setEndereco(endereco);
            usuario.setBairro(bairro);
            usuario.setComplemento(complemento);
            usuario.setCep(cep);
            usuario.setCidade(cidade);
            usuario.setEstado(estado);

            // Criar pasta uploads se não existir
            File pasta = new File("uploads");
            if (!pasta.exists()) pasta.mkdirs();

            if (foto != null && !foto.isEmpty()) {
                String caminho = "uploads/" + foto.getOriginalFilename();
                foto.transferTo(new File(caminho));
                usuario.setFoto(caminho);
            }

            Usuario novoUsuario = service.cadastrar(usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoUsuario);

        } catch (Exception e) {
            e.printStackTrace(); // mostra erro no console do Spring
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // DELETAR USUÁRIO
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarUsuario(@PathVariable Long id) {
        boolean removido = service.deletar(id);
        if (!removido) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }

    // ATUALIZAR USUÁRIO (SEM FOTO)
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> atualizarUsuario(
            @PathVariable Long id,
            @RequestBody Usuario usuario) {
        Usuario usuarioAtualizado = service.atualizar(id, usuario);
        if (usuarioAtualizado == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(usuarioAtualizado);
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody java.util.Map<String, String> dados) {
        String email = dados.get("email");
        String senha = dados.get("senha");

        Usuario usuario = service.login(email, senha);
        if (usuario == null) {
            return ResponseEntity.status(401).body("Email ou senha inválidos");
        }
        return ResponseEntity.ok(usuario);
    }
}