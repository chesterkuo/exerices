/**
 * mysql -u tickets_admin -p
 * source /{path}/tag.sql
 */

use `e_tickets`;

DROP TABLE IF EXISTS `tag`;

CREATE TABLE `tag` (
    `tag_id` int NOT NULL AUTO_INCREMENT,
    `tag_name` varchar(64) NOT NULL,
    
    PRIMARY KEY (`tag_id`),
    UNIQUE KEY (`tag_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
