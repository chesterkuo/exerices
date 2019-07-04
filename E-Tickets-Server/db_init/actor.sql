/**
 * mysql -u tickets_admin -p
 * source /{path}/actor.sql
 */

use `e_tickets`;

DROP TABLE IF EXISTS `actor`;

CREATE TABLE `actor` (
    `actor_id` int NOT NULL AUTO_INCREMENT,
    `actor_name` varchar(64) NOT NULL,
    
    PRIMARY KEY (`actor_id`),
    KEY (`actor_name`(5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
