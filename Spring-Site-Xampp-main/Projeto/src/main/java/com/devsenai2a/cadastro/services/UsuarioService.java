package com.devsenai2a.cadastro.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.devsenai2a.cadastro.entities.Usuario;
import com.devsenai2a.cadastro.repositories.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // LISTAR
    public List<Usuario> listarTodos() {
        return repository.findAll();
    }

    // CADASTRAR
    public Usuario cadastrar(Usuario usuario) {

        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));

        return repository.save(usuario);
    }

    // LOGIN
    public Usuario login(String email, String senha) {

        Optional<Usuario> usuarioOpt = repository.findByEmail(email);

        if (usuarioOpt.isEmpty()) {
            return null;
        }

        Usuario usuario = usuarioOpt.get();

        if (!passwordEncoder.matches(senha, usuario.getSenha())) {
            return null;
        }

        return usuario;
    }

    // ATUALIZAR
    public Usuario atualizar(Long id, Usuario dados) {

        Optional<Usuario> usuarioOpt = repository.findById(id);

        if (usuarioOpt.isEmpty()) {
            return null;
        }

        Usuario usuario = usuarioOpt.get();

        usuario.setNome(dados.getNome());
        usuario.setEmail(dados.getEmail());

        if (dados.getSenha() != null && !dados.getSenha().isEmpty()) {
            usuario.setSenha(passwordEncoder.encode(dados.getSenha()));
        }

        usuario.setPerfil(dados.getPerfil());
        usuario.setEndereco(dados.getEndereco());
        usuario.setBairro(dados.getBairro());
        usuario.setComplemento(dados.getComplemento());
        usuario.setCep(dados.getCep());
        usuario.setCidade(dados.getCidade());
        usuario.setEstado(dados.getEstado());

        return repository.save(usuario);
    }

    // DELETAR
    public boolean deletar(Long id) {

        if (!repository.existsById(id)) {
            return false;
        }

        repository.deleteById(id);

        return true;
    }

    // ENVIAR EMAIL RECUPERAÇÃO
    public boolean enviarEmailRecuperacao(String email) {

        Optional<Usuario> usuarioOpt = repository.findByEmail(email);

        if (usuarioOpt.isEmpty()) {
            return false;
        }

        Usuario usuario = usuarioOpt.get();

        String link = "http://localhost:5500/redefinir-senha.html?email=" + email;

        SimpleMailMessage mensagem = new SimpleMailMessage();

        mensagem.setTo(email);
        mensagem.setSubject("Recuperação de Senha");
        mensagem.setText(
                "Olá " + usuario.getNome() + "\n\n" +
                "Clique no link abaixo para redefinir sua senha:\n" +
                link
        );

        mailSender.send(mensagem);

        return true;
    }

    // REDEFINIR SENHA
    public boolean redefinirSenha(String email, String novaSenha) {

        Optional<Usuario> usuarioOpt = repository.findByEmail(email);

        if (usuarioOpt.isEmpty()) {
            return false;
        }

        Usuario usuario = usuarioOpt.get();

        usuario.setSenha(passwordEncoder.encode(novaSenha));

        repository.save(usuario);

        return true;
    }
}