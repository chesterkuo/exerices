/**
 * mysql -u tickets_admin -p
 * source /{path}/comment.sql
 */

use `e_tickets`;

DROP TABLE IF EXISTS `comment`;

CREATE TABLE `comment` (
    `comment_id` int NOT NULL AUTO_INCREMENT,
    `username` varchar(64) NOT NULL,
    `movie_id` int NOT NULL,
    `is_recommended` boolean NOT NULL DEFAULT true,
    `comment_content` varchar(64) NOT NULL,
    `is_spoiled` boolean NOT NULL DEFAULT true,
    `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    
    PRIMARY KEY (`comment_id`),
    UNIQUE KEY (`username`, `movie_id`),
    FOREIGN KEY (`username`) REFERENCES `user`(`username`),
    FOREIGN KEY (`movie_id`) REFERENCES `movie`(`movie_id`),
    KEY(`movie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
