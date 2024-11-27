/*
SQLyog Ultimate v12.5.1 (64 bit)
MySQL - 10.4.21-MariaDB-log : Database - db_artikel
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`db_artikel` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `db_artikel`;

/*Table structure for table `articles` */

DROP TABLE IF EXISTS `articles`;

CREATE TABLE `articles` (
  `id` varchar(16) NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` text DEFAULT NULL,
  `author` varchar(100) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `articles` */

LOCK TABLES `articles` WRITE;

insert  into `articles`(`id`,`title`,`body`,`author`,`created_at`,`updated_at`) values 
('B13Ede3IBLFzeRfg','Artikel 1','Paraboyy Ganteng','Paraboyy','2024-11-27 18:10:50','2024-11-27 18:10:50'),
('IJu59sJLZPsvsSyp','Artikel 4','Paraboyy Ganteng','Paraboyy 3','2024-11-27 18:34:18','2024-11-27 18:34:18'),
('JP7WCvrhd5IlKjyD','Artikel 10','Paraboy satu satu','Paraboyy','2024-11-27 18:10:46','2024-11-27 18:45:03'),
('PxYujoKznJSGpgfS','Artikel 1','Paraboyy Ganteng','Paraboyy 3','2024-11-27 18:23:12','2024-11-27 18:23:12');

UNLOCK TABLES;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
