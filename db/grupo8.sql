-- ============================================================
-- Base de Datos: grupo8_db
-- Proyecto: Registro de Estudiantes - Grupo 8
-- ============================================================

CREATE DATABASE IF NOT EXISTS grupo8_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE grupo8_db;

-- Tabla principal de estudiantes
CREATE TABLE IF NOT EXISTS estudiantes (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    nombre          VARCHAR(100)    NOT NULL,
    matricula       VARCHAR(50)     NOT NULL UNIQUE,
    correo          VARCHAR(100)    NOT NULL,
    fecha_nacimiento DATE           NOT NULL,
    curso           VARCHAR(50)     NOT NULL,
    fecha_registro  TIMESTAMP       DEFAULT CURRENT_TIMESTAMP
);
