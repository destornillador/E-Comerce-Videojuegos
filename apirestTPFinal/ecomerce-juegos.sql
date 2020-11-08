-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-11-2020 a las 15:43:21
-- Versión del servidor: 10.1.24-MariaDB
-- Versión de PHP: 7.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ecomerce-juegos`
--
CREATE DATABASE IF NOT EXISTS `ecomerce-juegos` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `ecomerce-juegos`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuota`
--

CREATE TABLE `cuota` (
  `id` int(11) NOT NULL,
  `numero` int(11) NOT NULL,
  `interes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cuota`
--

INSERT INTO `cuota` (`id`, `numero`, `interes`) VALUES
(1, 1, 0),
(2, 3, 5),
(3, 6, 15),
(4, 12, 35);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadousuario`
--

CREATE TABLE `estadousuario` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `estadousuario`
--

INSERT INTO `estadousuario` (`id`, `descripcion`) VALUES
(1, 'Habilitado'),
(2, 'Desabilitado'),
(3, 'Pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadoventa`
--

CREATE TABLE `estadoventa` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `estadoventa`
--

INSERT INTO `estadoventa` (`id`, `descripcion`) VALUES
(1, 'Esperando autorización'),
(2, 'Autorizado'),
(3, 'Preparando el Envío'),
(4, 'Despachado'),
(5, 'Recibido'),
(6, 'Listo para ser Retirado'),
(7, 'Retirado'),
(8, 'Cancelado'),
(9, 'Rechazado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formapago`
--

CREATE TABLE `formapago` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `formapago`
--

INSERT INTO `formapago` (`id`, `descripcion`) VALUES
(1, 'Tarjeta Debito'),
(2, 'Tarjeta Credito');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formato`
--

CREATE TABLE `formato` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `formato`
--

INSERT INTO `formato` (`id`, `descripcion`) VALUES
(1, 'Físico'),
(2, 'Digital');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `genero`
--

CREATE TABLE `genero` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `genero`
--

INSERT INTO `genero` (`id`, `descripcion`) VALUES
(1, 'Shooter'),
(2, 'Plataformas'),
(3, 'RPG'),
(4, 'Carreras'),
(5, 'Peleas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `juego`
--

CREATE TABLE `juego` (
  `id` int(11) NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `precio` double NOT NULL,
  `plataformaId` int(11) NOT NULL,
  `generoId` int(11) NOT NULL,
  `formatoId` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `foto` varchar(100) NOT NULL,
  `descripcion` varchar(5000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `juego`
--

INSERT INTO `juego` (`id`, `titulo`, `precio`, `plataformaId`, `generoId`, `formatoId`, `stock`, `foto`, `descripcion`) VALUES
(1, 'Sonic Forces', 3000, 1, 2, 1, 3, '1.jpg', '\"Sonic Force\" es un juego de plataformas de la serie Sonic the Hedgehog desarrollado por Sonic Team y publicado por Sega. ... Sonic Forces sigue a Sonic the Hedgehog cuando se une a una fuerza de resistencia contra el Dr.'),
(2, 'Sonic Forces', 2500, 2, 2, 2, 3, '2.jpg', '\"Sonic Force\" es un juego de plataformas de la serie Sonic the Hedgehog desarrollado por Sonic Team y publicado por Sega. ... Sonic Forces sigue a Sonic the Hedgehog cuando se une a una fuerza de resistencia contra el Dr.'),
(3, 'Mario Odyssey', 4250, 3, 2, 1, 4, '3.jpg', 'Únete a Mario en una épica aventura en 3D al mejor estilo trotamundos, usa sus nuevas e increíbles habilidades para obtener lunas con las que cargarás la nave Odyssey para así rescatar a la princesa Peach de los malévolos planes de boda de Bowser. Este juego de aventura al estilo libre en 3D, el primero después de Super Mario 64™ (1996) y Super Mario Sunshine™ (2002) viene cargado de secretos y sorpresas, y con los nuevos movimientos como lanzamiento de gorra, salto gorra y captura disfrutarás de una emocionante y novedosa experiencia de juego nunca antes vista en un juego de Mario. ¡Prepárate para ser transportado a extraños e increíbles lugares muy lejos del Reino Champiñón!'),
(4, 'Crash Bandicoot 4', 7000, 2, 2, 1, 3, '4.jpg', 'Crash Bandicoot 4: Its About Time es un videojuego perteneciente al género de plataformas, diseñado por Toys for Bob. El juego sirve como una secuela directa de Crash Bandicoot 3: Warped, siendo una continuación directa de la serie principal que reinterpreta los eventos posteriores a la tercera entrega.'),
(5, 'Dragon Ball FigtherZ', 5000, 1, 5, 1, 4, '5.jpg', 'DRAGON BALL FighterZ nace de lo que hace que la serie DRAGON BALL sea tan querida y famosa: infinitas peleas espectaculares con sus luchadores todopoderosos.'),
(6, 'Dragon Ball FigtherZ', 5000, 2, 5, 1, 5, '6.jpg', 'DRAGON BALL FighterZ nace de lo que hace que la serie DRAGON BALL sea tan querida y famosa: infinitas peleas espectaculares con sus luchadores todopoderosos.'),
(7, 'Super Smash Bros Ultimate', 6000, 3, 5, 1, 4, '7.jpg', '¡Un auténtico duelo de titanes de los videojuegos que podrás jugar cuando quieras y donde quieras! Lanza a tus rivales del escenario usando uno de los nuevos personajes como Simon Belmont o King K. Rool que se unen a Inkling, Ridley y a todos los combatientes presentes en la historia de Super Smash Bros. Disfruta de la velocidad mejorada y combate en los nuevos escenarios basados en las series de Castlevania, Super Mario Odyssey y otras.\r\n\r\n¿No sabes cuál escenario elegir? Por primera vez en la serie, puedes elegir la opción \"Escenario cambiante\" para que el escenario cambie repentinamente durante los combates. Además, los nuevos Combatientes Eco, Samus Oscura, Richter Belmont y Chrom se unen al combate. Juega en el modo local o en línea y disfruta de frenéticos combates, nuevos ataques y nuevas opciones de defensa como el escudo perfecto. Escucha más de 900 temas musicales diferentes mientras te enfrentas a tus amigos en combates 1 contra 1, todos contra todos para 4 jugadores o con hasta 8 jugadores, entre otros modos. También puedes usar tus controles de GameCube para rememorar competiciones legendarias en tu casa o juega donde quieras y cuando quieras.'),
(8, 'Super SmashBros Ultimate', 4250, 3, 5, 2, 5, '8.jpg', '¡Un auténtico duelo de titanes de los videojuegos que podrás jugar cuando quieras y donde quieras! Lanza a tus rivales del escenario usando uno de los nuevos personajes como Simon Belmont o King K. Rool que se unen a Inkling, Ridley y a todos los combatientes presentes en la historia de Super Smash Bros. Disfruta de la velocidad mejorada y combate en los nuevos escenarios basados en las series de Castlevania, Super Mario Odyssey y otras.\r\n\r\n¿No sabes cuál escenario elegir? Por primera vez en la serie, puedes elegir la opción \"Escenario cambiante\" para que el escenario cambie repentinamente durante los combates. Además, los nuevos Combatientes Eco, Samus Oscura, Richter Belmont y Chrom se unen al combate. Juega en el modo local o en línea y disfruta de frenéticos combates, nuevos ataques y nuevas opciones de defensa como el escudo perfecto. Escucha más de 900 temas musicales diferentes mientras te enfrentas a tus amigos en combates 1 contra 1, todos contra todos para 4 jugadores o con hasta 8 jugadores, entre otros modos. También puedes usar tus controles de GameCube para rememorar competiciones legendarias en tu casa o juega donde quieras y cuando quieras.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plataforma`
--

CREATE TABLE `plataforma` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `plataforma`
--

INSERT INTO `plataforma` (`id`, `descripcion`) VALUES
(1, 'Xbox One'),
(2, 'Play Station 4'),
(3, 'Nintendo Switch');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiporetiro`
--

CREATE TABLE `tiporetiro` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tiporetiro`
--

INSERT INTO `tiporetiro` (`id`, `descripcion`) VALUES
(1, 'A domicilio'),
(2, 'Por sucursal');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipousuario`
--

CREATE TABLE `tipousuario` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipousuario`
--

INSERT INTO `tipousuario` (`id`, `descripcion`) VALUES
(1, 'Administrador'),
(2, 'Cliente'),
(3, 'Empleado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `usuario` varchar(100) NOT NULL,
  `contrasenia` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `sexo` varchar(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefono` int(11) NOT NULL,
  `fechaNacimiento` varchar(100) NOT NULL,
  `tipoUsuarioId` int(11) NOT NULL,
  `estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `usuario`, `contrasenia`, `nombre`, `apellido`, `sexo`, `email`, `telefono`, `fechaNacimiento`, `tipoUsuarioId`, `estado`) VALUES
(17, 'Roquer', 'e393d0ff26f8f27bc2b05fa7e7681edd', 'Rodrigo', 'Balabasquer', 'Masculino', 'r.balabasquer@gmail.com', 1125654875, '14/04/1997', 1, 1),
(18, 'Matter', '0873961751fd5a357158a7dfee9c0a46', 'Matias', 'Enrique', 'Masculino', 'm.capo@gmail.com', 123698547, '10/03/1997', 2, 1),
(19, 'Sabine', '53fcbfad45dcdcfd683167084f89b041', 'Sabrina', 'Tokyo', 'Femenino', 'sabe@gmail.com', 2147483647, '05/05/1996', 3, 1),
(20, 'DaveLee', 'd64b4f5236ea108c6a761f5dad8aa09d', 'David', 'Pezzuto', 'Masculino', 'd@a.com', 2147483647, '01/01/1996', 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `venta`
--

CREATE TABLE `venta` (
  `id` int(11) NOT NULL,
  `usuarioId` int(11) NOT NULL,
  `precioTotal` double NOT NULL,
  `tipoRetiroId` int(11) NOT NULL,
  `zonaId` int(11) DEFAULT NULL,
  `domicilio` varchar(100) NOT NULL,
  `formaPagoId` int(11) NOT NULL,
  `cuotaId` int(11) DEFAULT NULL,
  `estado` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `tarjeta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `venta`
--

INSERT INTO `venta` (`id`, `usuarioId`, `precioTotal`, `tipoRetiroId`, `zonaId`, `domicilio`, `formaPagoId`, `cuotaId`, `estado`, `fecha`, `tarjeta`) VALUES
(6, 20, 3500, 1, 2, 'lalalala ', 1, 0, 1, '2020-11-01', 44444444),
(7, 18, 14950, 2, 0, '', 2, 3, 1, '2020-11-01', 66666666);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventajuego`
--

CREATE TABLE `ventajuego` (
  `id` int(11) NOT NULL,
  `juegoId` int(11) NOT NULL,
  `ventaId` int(11) NOT NULL,
  `precio` double NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `ventajuego`
--

INSERT INTO `ventajuego` (`id`, `juegoId`, `ventaId`, `precio`, `cantidad`) VALUES
(7, 1, 6, 3000, 1),
(8, 4, 7, 7000, 1),
(9, 7, 7, 6000, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zona`
--

CREATE TABLE `zona` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `precio` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `zona`
--

INSERT INTO `zona` (`id`, `descripcion`, `precio`) VALUES
(1, 'Capital', 100),
(2, 'Lanús', 500),
(3, 'Quilmes', 200),
(4, 'Avellaneda', 300);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cuota`
--
ALTER TABLE `cuota`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `estadousuario`
--
ALTER TABLE `estadousuario`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `estadoventa`
--
ALTER TABLE `estadoventa`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `formapago`
--
ALTER TABLE `formapago`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `formato`
--
ALTER TABLE `formato`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `genero`
--
ALTER TABLE `genero`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `juego`
--
ALTER TABLE `juego`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `plataforma`
--
ALTER TABLE `plataforma`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tiporetiro`
--
ALTER TABLE `tiporetiro`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipousuario`
--
ALTER TABLE `tipousuario`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `venta`
--
ALTER TABLE `venta`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ventajuego`
--
ALTER TABLE `ventajuego`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `zona`
--
ALTER TABLE `zona`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cuota`
--
ALTER TABLE `cuota`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `estadousuario`
--
ALTER TABLE `estadousuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `estadoventa`
--
ALTER TABLE `estadoventa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT de la tabla `formapago`
--
ALTER TABLE `formapago`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `formato`
--
ALTER TABLE `formato`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `genero`
--
ALTER TABLE `genero`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `juego`
--
ALTER TABLE `juego`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de la tabla `plataforma`
--
ALTER TABLE `plataforma`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `tiporetiro`
--
ALTER TABLE `tiporetiro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `tipousuario`
--
ALTER TABLE `tipousuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT de la tabla `venta`
--
ALTER TABLE `venta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `ventajuego`
--
ALTER TABLE `ventajuego`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT de la tabla `zona`
--
ALTER TABLE `zona`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
