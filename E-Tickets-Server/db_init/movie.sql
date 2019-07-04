/**
 * mysql -u tickets_admin -p
 * source /{path}/movie.sql
 */

use `e_tickets`;

DROP TABLE IF EXISTS `movie`;

CREATE TABLE `movie` (
    `movie_id` int NOT NULL AUTO_INCREMENT,
    `title` varchar(64) NOT NULL,
    `poster` varchar(64) NOT NULL DEFAULT '/images/poster/default.png',
    `director` varchar(64) NOT NULL,
    `actors` varchar(64) NOT NULL,
    `tags` varchar(64) NOT NULL,
    `status` int(2) NOT NULL DEFAULT 0, /*0 表示未上映，1表示正在热映，2表示下映*/
    
    PRIMARY KEY (`movie_id`),
    KEY (`status`, `title`(5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
