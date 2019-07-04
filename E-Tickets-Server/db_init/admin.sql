/**
 * mysql -u tickets_admin -p
 * source /{path}/admin.sql
 */

use `e_tickets`;

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
    `username` varchar(64) NOT NULL,
    `password` varchar(64) NOT NULL,
    
    PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
