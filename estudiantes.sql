-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-04-2026 a las 15:55:26
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `grupo8_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiantes`
--

CREATE TABLE `estudiantes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `matricula` varchar(50) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `curso` varchar(50) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `estudiantes`
--

INSERT INTO `estudiantes` (`id`, `nombre`, `matricula`, `correo`, `password`, `fecha_nacimiento`, `curso`, `fecha_registro`) VALUES
(2, 'Led Zeppelin', '100042814', 'lzeppelin@gmail.com', '123456', '2005-09-08', 'programacion', '2026-03-22 17:40:39'),
(3, 'Kurt Cobain', '100042815', 'kcobain@gmail.com', '$2y$10$xZgXbln54D0TtrNGxv5I2.xv7ZxGOfyPXAgXl6GqnxzKJTmnGD8xO', '2015-01-13', 'programacion', '2026-04-12 13:24:38'),
(4, 'Ricardo Montaner', '100042816', 'rmontaner@gmail.com', '$2y$10$nq3eQ0DUvH7IHWXjyiFb5.desICJhzpfPA2Zb.WfyI.d1cpywD1TG', '1985-11-08', 'diseno-web', '2026-04-12 13:25:36'),
(5, 'Juan Luis Guerra', '100042813', 'jguerra@gmail.com', '$2y$10$wV.P6GmEeYtzLcGz7DaY5O11oG5LHMvVGAZxtimb0cWvVGzXqCGXe', '1976-08-13', 'programacion', '2026-04-12 13:37:07');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `matricula` (`matricula`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
