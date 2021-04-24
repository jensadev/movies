DROP TABLE IF EXISTS movies;
CREATE TABLE `movies` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `tagline` varchar(255) NOT NULL,
  `release_year` year NOT NULL,
  `imdb_score` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



INSERT INTO movies(id,title,tagline,release_year,imdb_score) VALUES(1,'The Shawshank Redemption','Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.','1994',9.3),(2,'The Godfather','An organized crime dynasty\'s aging patriarch transfers control of his clandestine empire to his reluctant son.','1972',9.2),(4,'The Dark Knight','When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.','2008',9),(6,'The Godfather: Part II','The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.','1974',9),(7,'12 Angry Men','A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.','1957',9),(10,'The Lord of the Rings: Return of the King','Gandalf and Aragorn lead the World of Men against Sauron\'s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.','2003',8.9),(12,'Pulp Fiction','The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.','1994',8.9),(32,'Schindler\'s List','In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.','1993',8.9);







