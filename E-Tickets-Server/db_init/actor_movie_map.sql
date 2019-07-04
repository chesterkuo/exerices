/**
 * mysql -u tickets_admin -p
 * source /{path}/actor_movie_map.sql
 */

use `e_tickets`;

DROP TABLE IF EXISTS `actor_movie_map`;

CREATE TABLE `actor_movie_map` (
    `actor_id` int NOT NULL,
    `movie_id` int NOT NULL,
    
    PRIMARY KEY (`actor_id`, `movie_id`),
    FOREIGN KEY (`actor_id`) REFERENCES `actor`(`actor_id`),
    FOREIGN KEY (`movie_id`) REFERENCES `movie`(`movie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
