-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-12-2024 a las 04:40:22
-- Versión del servidor: 9.0.0
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tienda_luka`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `id_carrito` int DEFAULT NULL,
  `id_producto` int DEFAULT NULL,
  `id_marca` int DEFAULT NULL,
  `id_venta` int DEFAULT NULL,
  `precio` int NOT NULL,
  `imagen_url` varchar(20) NOT NULL,
  `cantidad_disponible` int NOT NULL,
  `tipo_prenda` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario`
--

CREATE TABLE `inventario` (
  `id_inventario` int NOT NULL,
  `id_marca` int DEFAULT NULL,
  `marca` varchar(244) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tipo_prenda` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `talla` varchar(210) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `cantidad_disponible` int NOT NULL,
  `precio` int NOT NULL,
  `imagen_url` text COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `inventario`
--

INSERT INTO `inventario` (`id_inventario`, `id_marca`, `marca`, `tipo_prenda`, `talla`, `cantidad_disponible`, `precio`, `imagen_url`) VALUES
(1, 1, 'Gucci', 'Falda Rosada', '1', 6, 1200, '/images/falda.png'),
(14, NULL, 'Levi\'s', 'Pantalon', '12', 20, 1110, '/images/pantalon.png'),
(15, NULL, 'Levi\'s', 'Camisa', '16', 10, 11000, '/images/camisa.png'),
(16, NULL, 'Adidas', 'Gorra', '16', 6, 15000, '/images/gorra.png'),
(17, NULL, 'Adidas', 'Tenis', '16', 20, 22500, '/images/zapatos.png'),
(18, NULL, 'Puma', 'Short', '32', 31, 11500, '/images/short.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marcas`
--

CREATE TABLE `marcas` (
  `id_marca` int DEFAULT NULL,
  `nombre_marca` varchar(35) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `marcas`
--

INSERT INTO `marcas` (`id_marca`, `nombre_marca`) VALUES
(1, 'Nike'),
(2, 'Gucci'),
(3, 'LEVIS');

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `marcas_con_ventas`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `marcas_con_ventas` (
`marca` varchar(255)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `prendas_vendidas_stock`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `prendas_vendidas_stock` (
`id_inventario` int
,`marca` varchar(244)
,`tipo_prenda` varchar(100)
,`talla` varchar(210)
,`precio_unitario` int
,`cantidad_vendida` decimal(32,0)
,`cantidad_restante` decimal(33,0)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int NOT NULL,
  `id_marca` int DEFAULT NULL,
  `marca` varchar(35) DEFAULT NULL,
  `articulo` varchar(50) NOT NULL,
  `talla` varchar(10) NOT NULL,
  `precio` varchar(15) DEFAULT NULL,
  `imagen_url` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `id_marca`, `marca`, `articulo`, `talla`, `precio`, `imagen_url`) VALUES
(1, 1, 'Nike', 'Falda', 'S', '1200', '/images/falda.png'),
(2, 2, 'FILA', 'Camisa', 'M', '3500', '/images/camisa.png'),
(3, 3, 'Levis', 'Pantalón', 'M', '7500', '/images/pantalon.png'),
(4, 4, 'Puma', 'Zapatos', '40', '22000', '/images/zapatos.png');

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `top5marcasvendidas`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `top5marcasvendidas` (
`marca` varchar(255)
,`total_ventas` decimal(32,0)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `correo` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `correo`, `password`) VALUES
(1, 'Nombre de Prueba', 'correo@ejemplo.com', 'contraseña123'),
(2, 'karla', 'holaaa@gmail.com', '$2y$10$7s/2rMBUihzMoP/U.ZjllOK3qAO9t9GpufACYltTGm/Ibdt2a1m5i'),
(3, 'karla', 'holaaa@gmail.com', '$2y$10$4mLaE/q2WAVBZPlHqm0cBuqeFKaoff9FH.rNCGXTwPBCPbU1bIsHS'),
(4, 'karla', 'holaaa@gmail.com', '$2y$10$07XHYi.D1DEjPLIcKCOV5uEDl5K0dbcAAA4jLr4YlJK17qwuKi9rG'),
(5, 'karla', 'holaaa@gmail.com', '$2y$10$G2y/GS.1yB9h5QOqlKFqQulwYixVgFHUlheW45thJcdrPEWNblxhe'),
(6, 'holaaaa', 'jisas@gmail.com', '$2y$10$.8cDyy0AsIXmHSimFCFKVurHc./Z13rN8wVIehya63zb.ZAiFQlM6');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id_venta` int NOT NULL,
  `marca` varchar(255) NOT NULL,
  `precio` varchar(15) DEFAULT NULL,
  `id_inventario` int NOT NULL,
  `tipo_prenda` varchar(255) NOT NULL,
  `cantidad` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`id_venta`, `marca`, `precio`, `id_inventario`, `tipo_prenda`, `cantidad`) VALUES
(24, 'Gucci', '1200', 1, 'Falda Rosada', 3),
(25, 'Adidas', '22500', 17, 'Tenis', 2),
(26, 'Fila', '25000', 26, 'Camisa', 1),
(27, 'Gucci', '1200', 1, 'Falda Rosada', 1),
(28, 'Levi\'s', '11000', 15, 'Camisa', 1),
(29, 'Adidas', '15000', 16, 'Gorra', 1),
(30, 'Puma', '11500', 18, 'Short', 2),
(31, 'Gucci', '1200', 1, 'Falda Rosada', 1),
(32, 'Gucci', '1200', 1, 'Falda Rosada', 1);

-- --------------------------------------------------------

--
-- Estructura para la vista `marcas_con_ventas`
--
DROP TABLE IF EXISTS `marcas_con_ventas`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `marcas_con_ventas`  AS SELECT DISTINCT `ventas`.`marca` AS `marca` FROM `ventas` WHERE (`ventas`.`cantidad` > 0) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `prendas_vendidas_stock`
--
DROP TABLE IF EXISTS `prendas_vendidas_stock`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `prendas_vendidas_stock`  AS SELECT `i`.`id_inventario` AS `id_inventario`, `i`.`marca` AS `marca`, `i`.`tipo_prenda` AS `tipo_prenda`, `i`.`talla` AS `talla`, `i`.`precio` AS `precio_unitario`, sum(`v`.`cantidad`) AS `cantidad_vendida`, (`i`.`cantidad_disponible` - sum(`v`.`cantidad`)) AS `cantidad_restante` FROM (`ventas` `v` join `inventario` `i` on((`v`.`id_inventario` = `i`.`id_inventario`))) GROUP BY `i`.`id_inventario`, `i`.`marca`, `i`.`tipo_prenda`, `i`.`talla`, `i`.`precio`, `i`.`cantidad_disponible` ;

-- --------------------------------------------------------

--
-- Estructura para la vista `top5marcasvendidas`
--
DROP TABLE IF EXISTS `top5marcasvendidas`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `top5marcasvendidas`  AS SELECT `ventas`.`marca` AS `marca`, sum(`ventas`.`cantidad`) AS `total_ventas` FROM `ventas` GROUP BY `ventas`.`marca` ORDER BY `total_ventas` DESC LIMIT 0, 5 ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD UNIQUE KEY `id_carrito` (`id_carrito`);

--
-- Indices de la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD PRIMARY KEY (`id_inventario`);

--
-- Indices de la tabla `marcas`
--
ALTER TABLE `marcas`
  ADD UNIQUE KEY `id_marca` (`id_marca`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD UNIQUE KEY `id_producto` (`id_producto`),
  ADD KEY `id_marca_idx` (`id_marca`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD UNIQUE KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id_venta`),
  ADD UNIQUE KEY `id_venta` (`id_venta`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `inventario`
--
ALTER TABLE `inventario`
  MODIFY `id_inventario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id_venta` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
