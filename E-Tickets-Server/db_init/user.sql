/**
 * mysql -u tickets_admin -p
 * source /{path}/user.sql
 */

use `e_tickets`;

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
    `username` varchar(64) NOT NULL,
    `password` varchar(64) NOT NULL,
    `nickname` varchar(64) NOT NULL DEFAULT 'No_nickname',
    `avatar`   varchar(64) NOT NULL DEFAULT '/images/avatar/default.png',
    
    PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
