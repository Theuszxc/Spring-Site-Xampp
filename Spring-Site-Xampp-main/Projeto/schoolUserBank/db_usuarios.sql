-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 03/03/2026 às 14:03
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `db_usuarios`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` bigint(20) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `perfil` varchar(255) DEFAULT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `bairro` varchar(80) DEFAULT NULL,
  `complemento` varchar(80) DEFAULT NULL,
  `cep` varchar(10) DEFAULT NULL,
  `cidade` varchar(100) DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `email`, `senha`, `perfil`, `endereco`, `bairro`, `complemento`, `cep`, `cidade`, `estado`) VALUES
(1, 'Matheus', 'matheus@gmail.com', '$2a$10$VuRAh8swS7PkrYGNTjLnW.9mXDbj0Wo.aRfn11XcKUh0.ZS8MDlzy', 'ADMIN', 'Jacinto', 'Icatu', 'Marrom', '523523562', 'Votorantim', 'SP'),
(2, 'Felipe', 'felipe@gmail.com', '$2a$10$0mh19Gw01QSkqEbRQoYqteD1Yk0EXOYBBmrdp7LozZXknom05px9O', 'USER', 'Rossini', 'Jararaca', 'Negro', '423423423', 'Sorocaba', 'SP'),
(3, 'Rian', 'rian@gmail.com', '$2a$10$D.s1BsbVgobWwtfT8uqNIO3oLntlt3q1LiRvHG468D2ui0Ev0JWyG', 'ADMIN', 'Logo ali', 'Daqui pra ca', 'Lá', '3252523523', 'Rolândia', 'SP'),
(4, 'pedro', 'pedro@gmail.com', '$2a$10$N2itnx4n93qTUgjBr65vcuqSVhDEgjQp8D5dGch/h5Y5R3HeIrmTm', 'ADMIN', 'Cada', 'casarao', 'rosa', '5235252', 'Sorocaba', 'SP'),
(5, 'Carlos Eduardo Silva', 'carlos.silva@email.com', '$2a$10$r8Zb/VoQMDZcey9BmtkaLeMInYQTwMGGrbIfSDlJYXlHsoma2wpmK', 'ADMIN', 'Rua das Palmeiras, 145', 'Centro', 'Apto 302', '01001-000', 'São Paulo', 'SP');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
