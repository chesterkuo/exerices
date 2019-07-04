/**
 * mysql -u tickets_admin -p
 * source /{path}/cinema_owner.sql
 */

use `e_tickets`;

DROP TABLE IF EXISTS `cinema_owner`;

CREATE TABLE `cinema_owner` (
    `username` varchar(64) NOT NULL,
    `password` varchar(64) NOT NULL,
    
    PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
