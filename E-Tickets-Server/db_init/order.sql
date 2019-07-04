/**
 * mysql -u tickets_admin -p
 * source /{path}/order.sql
 */

use `e_tickets`;

DROP TABLE IF EXISTS `ticket_order`;

CREATE TABLE `ticket_order` (
    `order_id` int NOT NULL AUTO_INCREMENT,
    `username` varchar(64) NOT NULL,
    `schedule_id` int NOT NULL,
    `seat` int NOT NULL,
    `is_paid` boolean NOT NULL DEFAULT false,
    
    PRIMARY KEY (`order_id`),
    FOREIGN KEY (`username`) REFERENCES `user`(`username`),
    FOREIGN KEY (`schedule_id`) REFERENCES `movie_schedule`(`schedule_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
