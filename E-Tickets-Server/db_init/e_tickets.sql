/**
 * mysql -u root -p
 * source /{path}/e_tickets.sql
 */

DROP DATABASE IF EXISTS `e_tickets`;
CREATE DATABASE `e_tickets`;

GRANT ALL PRIVILEGES ON e_tickets.* TO tickets_admin@localhost IDENTIFIED BY 'tickets';
FLUSH  PRIVILEGES;

