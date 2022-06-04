-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 04-06-2022 a las 19:34:44
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `web_2_final_project_DB`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Schedules`
--

CREATE TABLE `Schedules` (
  `id_subject` int(11) NOT NULL,
  `id_horary` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `Schedules`
--

INSERT INTO `Schedules` (`id_subject`, `id_horary`) VALUES
(3, 1),
(7, 3),
(2, 3);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Schedules`
--
ALTER TABLE `Schedules`
  ADD KEY `id_horary` (`id_horary`),
  ADD KEY `id_subject` (`id_subject`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Schedules`
--
ALTER TABLE `Schedules`
  ADD CONSTRAINT `Schedules_ibfk_1` FOREIGN KEY (`id_horary`) REFERENCES `Horaries` (`id`),
  ADD CONSTRAINT `Schedules_ibfk_2` FOREIGN KEY (`id_subject`) REFERENCES `Subjects` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
