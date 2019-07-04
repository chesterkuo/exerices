/**
 * mysql -u tickets_admin -p
 * source /{path}/cinema_hall.sql
 */

use `e_tickets`;

DROP TABLE IF EXISTS `cinema_hall`;

CREATE TABLE `cinema_hall` (
    `cinema_id` int NOT NULL,
    `hall_id` int NOT NULL,
    `size_id` int NOT NULL,
    `size` int NOT NULL,
    
    PRIMARY KEY (`cinema_id`, `hall_id`),
    FOREIGN KEY (`cinema_id`) REFERENCES `cinema`(`cinema_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
