/**
 * mysql -u tickets_admin -p
 * source /{path}/director.sql
 */

use `e_tickets`;

DROP TABLE IF EXISTS `director`;

CREATE TABLE `director` (
    `director_id` int NOT NULL AUTO_INCREMENT,
    `director_name` varchar(64) NOT NULL,
    
    PRIMARY KEY (`director_id`),
    KEY (`director_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
