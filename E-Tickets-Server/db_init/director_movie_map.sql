/**
 * mysql -u tickets_admin -p
 * source /{path}/director_movie_map.sql
 */

use `e_tickets`;

DROP TABLE IF EXISTS `director_movie_map`;

CREATE TABLE `director_movie_map` (
    `director_id` int NOT NULL,
    `movie_id` int NOT NULL,
    
    PRIMARY KEY (`director_id`, `movie_id`),
    FOREIGN KEY (`director_id`) REFERENCES `director`(`director_id`),
    FOREIGN KEY (`movie_id`) REFERENCES `movie`(`movie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
