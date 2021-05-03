/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ jens /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE jens;

DROP TABLE IF EXISTS directors;
CREATE TABLE `directors` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS genres;
CREATE TABLE `genres` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_2` (`name`),
  KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS movie_genres;
CREATE TABLE `movie_genres` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `movie_id` int unsigned NOT NULL,
  `genre_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `movie_id` (`movie_id`),
  KEY `genre_id` (`genre_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS movies;
CREATE TABLE `movies` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `tagline` varchar(255) NOT NULL,
  `release_year` year NOT NULL,
  `imdb_score` double DEFAULT NULL,
  `director_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;




INSERT INTO directors(id,name) VALUES(14,''),(18,' Lana Wachowski, Lilly Wachowski '),(13,' Robert Zemeckis'),(16,' Wachowskis'),(7,'Christopher Nolan'),(12,'David Fincher'),(1,'Francis Ford Coppola'),(5,'Frank Darabont'),(9,'Peter Jackson'),(10,'Quentin Tarantino'),(15,'Sergio Leone'),(8,'Sidney Lumet'),(11,'Steven Spielberg'),(17,'Wachowskis');

INSERT INTO genres(id,name) VALUES(1,'action'),(5,'adventure'),(6,'biography'),(4,'crime'),(3,'drama'),(7,'history'),(9,'romance'),(10,'sci-fi'),(8,'western');

INSERT INTO movie_genres(id,movie_id,genre_id) VALUES(1,1,3),(2,2,3),(3,2,4),(4,74,8),(5,45,4),(6,45,3),(7,46,3),(8,46,1),(9,46,4),(12,48,4),(13,48,3),(17,51,5),(18,51,3),(19,51,1),(22,75,1),(23,75,10),(26,76,1),(27,76,10),(28,72,3),(29,72,9),(30,53,4),(31,53,3);
INSERT INTO movies(id,title,tagline,release_year,imdb_score,director_id) VALUES(1,'The Shawshank Redemption','Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.','1994',9.3,5),(2,'The Godfather','An organized crime dynasty\'s aging patriarch transfers control of his clandestine empire to his reluctant son.','1972',9.2,1),(45,'The Godfather: Part II','The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.','1974',9,1),(46,'The Dark Knight','When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.','2008',9,7),(47,'Inception',' thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.','2010',8.8,7),(48,'12 Angry Men','A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.','1957',9,8),(51,'The Lord of the Rings: Return of the King','Gandalf and Aragorn lead the World of Men against Sauron\'s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.','2003',8.9,9),(52,'The Lord of the Rings: The Two Towers','While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron\'s new ally, Saruman, and his hordes of Isengard.','2002',8.7,9),(53,'Pulp Fiction','The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.','1994',8.9,10),(54,'Schindler\'s List','In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.','1993',8.9,11),(55,'Fight Club','An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.','1999',8.8,12),(71,'The Lord of the Rings: The Fellowship of the Ring','A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.','2001',8.8,9),(72,'Forrest Gump','The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.','1994',8.8,13),(74,'The Good, the Bad and the Ugly','A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.','1966',8.8,15);







/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
