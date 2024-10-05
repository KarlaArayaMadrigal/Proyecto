-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-10-2024 a las 04:02:04
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
-- Base de datos: `tienda`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario`
--

CREATE TABLE `inventario` (
  `id_inventario` int(11) NOT NULL,
  `id_marca` int(11) DEFAULT NULL,
  `tipo_prenda` varchar(100) NOT NULL,
  `cantidad_disponible` int(11) NOT NULL,
  `precio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `inventario`
--

INSERT INTO `inventario` (`id_inventario`, `id_marca`, `tipo_prenda`, `cantidad_disponible`, `precio`) VALUES
(1, 1, 'Camiseta', 50, 8900),
(2, 2, 'Pantalón', 26, 22000),
(3, 3, 'Zapatillas', 39, 32700),
(4, 4, 'Chaqueta', 15, 51000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marcas`
--

CREATE TABLE `marcas` (
  `id_marca` int(11) NOT NULL,
  `nombre_marca` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `marcas`
--

INSERT INTO `marcas` (`id_marca`, `nombre_marca`) VALUES
(1, 'Nike'),
(2, 'Adidas'),
(3, 'Puma'),
(4, 'Levi’s'),
(5, 'Reebok');

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `marcasconventas`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `marcasconventas` (
`id_marca` int(11)
,`nombre_marca` varchar(100)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `prendasvendidasstock`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `prendasvendidasstock` (
`tipo_prenda` varchar(100)
,`cantidad_disponible` int(11)
,`total_vendido` decimal(32,0)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `topmarcasvendidas`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `topmarcasvendidas` (
`nombre_marca` varchar(100)
,`total_vendido` decimal(32,0)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id_venta` int(11) NOT NULL,
  `id_inventario` int(11) DEFAULT NULL,
  `cantidad_vendida` int(11) NOT NULL,
  `fecha_venta` date NOT NULL,
  `total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`id_venta`, `id_inventario`, `cantidad_vendida`, `fecha_venta`, `total`) VALUES
(1, 1, 5, '2024-10-01', 44500),
(2, 2, 3, '2024-10-02', 66000),
(3, 3, 2, '2024-10-03', 65400),
(4, 4, 1, '2024-10-03', 51000);

-- --------------------------------------------------------

--
-- Estructura para la vista `marcasconventas`
--
DROP TABLE IF EXISTS `marcasconventas`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `marcasconventas`  AS SELECT DISTINCT `m`.`id_marca` AS `id_marca`, `m`.`nombre_marca` AS `nombre_marca` FROM ((`ventas` `v` join `inventario` `i` on(`v`.`id_inventario` = `i`.`id_inventario`)) join `marcas` `m` on(`i`.`id_marca` = `m`.`id_marca`)) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `prendasvendidasstock`
--
DROP TABLE IF EXISTS `prendasvendidasstock`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `prendasvendidasstock`  AS SELECT `i`.`tipo_prenda` AS `tipo_prenda`, `i`.`cantidad_disponible` AS `cantidad_disponible`, sum(`v`.`cantidad_vendida`) AS `total_vendido` FROM (`inventario` `i` join `ventas` `v` on(`i`.`id_inventario` = `v`.`id_inventario`)) GROUP BY `i`.`tipo_prenda`, `i`.`cantidad_disponible` ;

-- --------------------------------------------------------

--
-- Estructura para la vista `topmarcasvendidas`
--
DROP TABLE IF EXISTS `topmarcasvendidas`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `topmarcasvendidas`  AS SELECT `m`.`nombre_marca` AS `nombre_marca`, sum(`v`.`cantidad_vendida`) AS `total_vendido` FROM ((`ventas` `v` join `inventario` `i` on(`v`.`id_inventario` = `i`.`id_inventario`)) join `marcas` `m` on(`i`.`id_marca` = `m`.`id_marca`)) GROUP BY `m`.`nombre_marca` ORDER BY sum(`v`.`cantidad_vendida`) DESC LIMIT 0, 5 ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD PRIMARY KEY (`id_inventario`),
  ADD KEY `id_marca` (`id_marca`);

--
-- Indices de la tabla `marcas`
--
ALTER TABLE `marcas`
  ADD PRIMARY KEY (`id_marca`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id_venta`),
  ADD KEY `id_inventario` (`id_inventario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `inventario`
--
ALTER TABLE `inventario`
  MODIFY `id_inventario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `marcas`
--
ALTER TABLE `marcas`
  MODIFY `id_marca` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id_venta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD CONSTRAINT `inventario_ibfk_1` FOREIGN KEY (`id_marca`) REFERENCES `marcas` (`id_marca`);

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`id_inventario`) REFERENCES `inventario` (`id_inventario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
