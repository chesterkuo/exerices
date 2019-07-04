/**
 * mysql -u tickets_admin -p
 * source /{path}/movie_schedule.sql
 */

use `e_tickets`;

DROP TABLE IF EXISTS `movie_schedule`;

CREATE TABLE `movie_schedule` (
    `schedule_id` int NOT NULL AUTO_INCREMENT,
    `cinema_id` int NOT NULL,
    `hall_id` int NOT NULL,
    `time` timestamp NOT NULL,
    `movie_id` int NOT NULL,
    `price` int NOT NULL,
    
    PRIMARY KEY (`schedule_id`),
    FOREIGN KEY (`cinema_id`) REFERENCES `cinema`(`cinema_id`),
    FOREIGN KEY (`movie_id`) REFERENCES `movie`(`movie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
