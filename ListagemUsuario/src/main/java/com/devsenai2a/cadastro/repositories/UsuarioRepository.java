package com.devsenai2a.cadastro.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.devsenai2a.cadastro.entities.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByEmail(String email);

}