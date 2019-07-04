/**
 * mysql -u tickets_admin -p
 * source /{path}/tag_movie_map.sql
 */

use `e_tickets`;

DROP TABLE IF EXISTS `tag_movie_map`;

CREATE TABLE `tag_movie_map` (
    `tag_id` int NOT NULL,
    `movie_id` int NOT NULL,
    
    PRIMARY KEY (`tag_id`, `movie_id`),
    FOREIGN KEY (`tag_id`) REFERENCES `tag`(`tag_id`),
    FOREIGN KEY (`movie_id`) REFERENCES `movie`(`movie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
