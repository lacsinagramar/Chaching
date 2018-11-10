-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: db_magulang
-- ------------------------------------------------------
-- Server version	5.7.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_anak`
--

DROP TABLE IF EXISTS `tbl_anak`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_anak` (
  `intAnakId` int(11) NOT NULL AUTO_INCREMENT,
  `strUserName` varchar(45) NOT NULL,
  `strPassword` varchar(45) NOT NULL,
  `intMagulangId` int(11) NOT NULL,
  `strFirstName` varchar(45) NOT NULL,
  `strMiddleName` varchar(45) DEFAULT NULL,
  `strLastName` varchar(45) NOT NULL,
  PRIMARY KEY (`intAnakId`),
  KEY `intUserId_idx` (`intMagulangId`),
  CONSTRAINT `intUserId` FOREIGN KEY (`intMagulangId`) REFERENCES `tbl_magulang` (`intUserId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_anak`
--

LOCK TABLES `tbl_anak` WRITE;
/*!40000 ALTER TABLE `tbl_anak` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_anak` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_chores`
--

DROP TABLE IF EXISTS `tbl_chores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_chores` (
  `intChoreId` int(11) NOT NULL AUTO_INCREMENT,
  `strChoreName` varchar(45) NOT NULL,
  `intLevelId` int(11) NOT NULL,
  PRIMARY KEY (`intChoreId`),
  KEY `intLevelId_idx` (`intLevelId`),
  CONSTRAINT `intLevelId` FOREIGN KEY (`intLevelId`) REFERENCES `tbl_level` (`intLevelId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_chores`
--

LOCK TABLES `tbl_chores` WRITE;
/*!40000 ALTER TABLE `tbl_chores` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_chores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_goal`
--

DROP TABLE IF EXISTS `tbl_goal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_goal` (
  `intGoalId` int(11) NOT NULL AUTO_INCREMENT,
  `dblGoal` double NOT NULL,
  `intAnakId` int(11) NOT NULL,
  `intMagulangId` int(11) NOT NULL,
  PRIMARY KEY (`intGoalId`),
  KEY `intAnakId_idx` (`intAnakId`),
  KEY `intMagulangId_idx` (`intMagulangId`),
  CONSTRAINT `intAnakId` FOREIGN KEY (`intAnakId`) REFERENCES `tbl_anak` (`intAnakId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `intMagulangId` FOREIGN KEY (`intMagulangId`) REFERENCES `tbl_magulang` (`intUserId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_goal`
--

LOCK TABLES `tbl_goal` WRITE;
/*!40000 ALTER TABLE `tbl_goal` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_goal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_level`
--

DROP TABLE IF EXISTS `tbl_level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_level` (
  `intLevelId` int(11) NOT NULL AUTO_INCREMENT,
  `intLevel` int(11) NOT NULL,
  `jsonLevel` json NOT NULL,
  `intGoalId` int(11) NOT NULL,
  PRIMARY KEY (`intLevelId`),
  KEY `intGoalId_idx` (`intGoalId`),
  CONSTRAINT `intGoalId` FOREIGN KEY (`intGoalId`) REFERENCES `tbl_goal` (`intGoalId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_level`
--

LOCK TABLES `tbl_level` WRITE;
/*!40000 ALTER TABLE `tbl_level` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_level` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_magulang`
--

DROP TABLE IF EXISTS `tbl_magulang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_magulang` (
  `intUserId` int(11) NOT NULL AUTO_INCREMENT,
  `strUserName` varchar(45) NOT NULL,
  `strBankAccount` varchar(45) NOT NULL,
  `strPassword` varchar(45) NOT NULL,
  `strFirstName` varchar(45) NOT NULL,
  `strMiddleName` varchar(45) DEFAULT NULL,
  `strLastName` varchar(45) NOT NULL,
  PRIMARY KEY (`intUserId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_magulang`
--

LOCK TABLES `tbl_magulang` WRITE;
/*!40000 ALTER TABLE `tbl_magulang` DISABLE KEYS */;
INSERT INTO `tbl_magulang` VALUES (1,'gramar123','012345','123','Gramar','Desuyo','Lacsina'),(2,'joshuarae','012345','123','Joshua Rae','','Macaya');
/*!40000 ALTER TABLE `tbl_magulang` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-11  0:02:57
