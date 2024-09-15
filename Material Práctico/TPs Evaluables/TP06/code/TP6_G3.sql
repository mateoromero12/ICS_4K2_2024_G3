-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: tp6_ics
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cotizaciones`
--

DROP TABLE IF EXISTS `cotizaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cotizaciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dador_id` int DEFAULT NULL,
  `transportista_id` int DEFAULT NULL,
  `fecha_retiro` date DEFAULT NULL,
  `fecha_entrega` date DEFAULT NULL,
  `importe` decimal(10,2) DEFAULT NULL,
  `estado` enum('Pendiente','Confirmado') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `dador_id` (`dador_id`),
  KEY `transportista_id` (`transportista_id`),
  CONSTRAINT `Cotizaciones_ibfk_1` FOREIGN KEY (`dador_id`) REFERENCES `dadores` (`id`),
  CONSTRAINT `Cotizaciones_ibfk_2` FOREIGN KEY (`transportista_id`) REFERENCES `transportistas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cotizaciones`
--

LOCK TABLES `cotizaciones` WRITE;
/*!40000 ALTER TABLE `cotizaciones` DISABLE KEYS */;
INSERT INTO `cotizaciones` VALUES (1,1,1,'2024-09-07','2024-09-08',15000.50,'Pendiente'),(2,1,2,'2024-09-09','2024-09-10',20000.00,'Pendiente'),(3,2,1,'2024-09-12','2024-09-16',45000.00,'Pendiente'),(4,2,2,'2024-09-20','2024-09-25',5000.00,'Pendiente');
/*!40000 ALTER TABLE `cotizaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cotizacionesformaspago`
--

DROP TABLE IF EXISTS `cotizacionesformaspago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cotizacionesformaspago` (
  `cotizacion_id` int NOT NULL,
  `forma_pago_id` int NOT NULL,
  PRIMARY KEY (`cotizacion_id`,`forma_pago_id`),
  KEY `forma_pago_id` (`forma_pago_id`),
  CONSTRAINT `CotizacionesFormasPago_ibfk_1` FOREIGN KEY (`cotizacion_id`) REFERENCES `cotizaciones` (`id`),
  CONSTRAINT `CotizacionesFormasPago_ibfk_2` FOREIGN KEY (`forma_pago_id`) REFERENCES `formaspago` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cotizacionesformaspago`
--

LOCK TABLES `cotizacionesformaspago` WRITE;
/*!40000 ALTER TABLE `cotizacionesformaspago` DISABLE KEYS */;
INSERT INTO `cotizacionesformaspago` VALUES (1,1),(2,1),(3,1),(4,1),(1,2),(3,2),(4,2),(2,3);
/*!40000 ALTER TABLE `cotizacionesformaspago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dadores`
--

DROP TABLE IF EXISTS `dadores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dadores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `Dadores_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dadores`
--

LOCK TABLES `dadores` WRITE;
/*!40000 ALTER TABLE `dadores` DISABLE KEYS */;
INSERT INTO `dadores` VALUES (1,1),(2,3);
/*!40000 ALTER TABLE `dadores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formaspago`
--

DROP TABLE IF EXISTS `formaspago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `formaspago` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` enum('Tarjeta','Contado al retirar','Contado contra entrega') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formaspago`
--

LOCK TABLES `formaspago` WRITE;
/*!40000 ALTER TABLE `formaspago` DISABLE KEYS */;
INSERT INTO `formaspago` VALUES (1,'Tarjeta'),(2,'Contado al retirar'),(3,'Contado contra entrega');
/*!40000 ALTER TABLE `formaspago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagos`
--

DROP TABLE IF EXISTS `pagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cotizacion_id` int DEFAULT NULL,
  `forma_pago_id` int DEFAULT NULL,
  `importe_a_pagar` float DEFAULT NULL,
  `tarjeta_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cotizacion_id` (`cotizacion_id`),
  KEY `fk_forma_pago` (`forma_pago_id`),
  KEY `fk_tarjeta_pago` (`tarjeta_id`),
  CONSTRAINT `fk_forma_pago` FOREIGN KEY (`forma_pago_id`) REFERENCES `formaspago` (`id`),
  CONSTRAINT `fk_tarjeta_pago` FOREIGN KEY (`tarjeta_id`) REFERENCES `tarjetas` (`id`) ON DELETE SET NULL,
  CONSTRAINT `Pagos_ibfk_1` FOREIGN KEY (`cotizacion_id`) REFERENCES `cotizaciones` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagos`
--

LOCK TABLES `pagos` WRITE;
/*!40000 ALTER TABLE `pagos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pagos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tarjetas`
--

DROP TABLE IF EXISTS `tarjetas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tarjetas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `numero_tarjeta` varchar(16) NOT NULL,
  `cvv` varchar(4) NOT NULL,
  `nombre_completo` varchar(100) NOT NULL,
  `fecha_vencimiento` varchar(7) NOT NULL,
  `tipo` enum('Debito','Credito') NOT NULL,
  `saldo` decimal(10,2) DEFAULT NULL,
  `dador_id` int DEFAULT NULL,
  `tipo_documento` varchar(50) DEFAULT NULL,
  `numero_documento` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_dador_tarjetas` (`dador_id`),
  CONSTRAINT `fk_dador_tarjetas` FOREIGN KEY (`dador_id`) REFERENCES `dadores` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tarjetas`
--

LOCK TABLES `tarjetas` WRITE;
/*!40000 ALTER TABLE `tarjetas` DISABLE KEYS */;
INSERT INTO `tarjetas` VALUES (1,'4111111111111111','123','Juan Perez','12/2025','Debito',24000.00,1,'DNI','12345678'),(3,'3742101010101010','1234','TalleresPechoFrio','10/2024','Debito',11000.00,1,'DNI','40300100'),(5,'3742500020001000','123','Juani','09/2024','Debito',6000.00,2,'DNI','43200100'),(6,'2020101010109999','123','Juani','12/2024','Credito',10000.00,1,'DNI','43200199');
/*!40000 ALTER TABLE `tarjetas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transportistas`
--

DROP TABLE IF EXISTS `transportistas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transportistas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int DEFAULT NULL,
  `calificacion` decimal(2,1) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `Transportistas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transportistas`
--

LOCK TABLES `transportistas` WRITE;
/*!40000 ALTER TABLE `transportistas` DISABLE KEYS */;
INSERT INTO `transportistas` VALUES (1,2,4.5,'https://media.istockphoto.com/id/1396633199/es/foto/feliz-conductor-de-cami%C3%B3n-mirando-a-trav%C3%A9s-de-la-ventana-lateral-mientras-conduce-su-cami%C3%B3n.jpg?s=1024x1024&w=is&k=20&c=0i9RB2FiE3aBxXN7QtxFZM0V8pbWQR6h16EeFd_LAVg='),(2,4,4.8,'https://media.istockphoto.com/id/175589820/es/foto/conductor-positivo.jpg?s=1024x1024&w=is&k=20&c=G678eSVX7DwsULI8vOn2qJt4QQHQ756mJyZtlZOdUk0=');
/*!40000 ALTER TABLE `transportistas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'dador1','dador1@gmail.com','1234'),(2,'transportista1','transportista1@gmail.com','1234'),(3,'dador2','dador2@gmail.com','1234'),(4,'transportista2','transportista2@gmail.com','1234');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-15 19:19:43
