/**
 * mysql -u tickets_admin -p
 * source /{path}/cinema.sql
 */

use `e_tickets`;

DROP TABLE IF EXISTS `cinema`;

CREATE TABLE `cinema` (
    `cinema_id` int NOT NULL AUTO_INCREMENT,
    `cinema_name` varchar(64) NOT NULL,
    `cinema_location` varchar(64) NOT NULL,
    `owner` varchar(64) NOT NULL,
    
    PRIMARY KEY (`cinema_id`),
    FOREIGN KEY (`owner`) REFERENCES `cinema_owner`(`username`),
    KEY (`cinema_location`, `cinema_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
