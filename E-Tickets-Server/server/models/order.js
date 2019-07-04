const mysqlUtils = require('../utils/mysql_utils');

const order = {
    async createOrder(username, scheduleId, seat) {
        let _sql = `INSERT INTO ticket_order(username, schedule_id, seat)
                    VALUES(?, ?, ?);`;
        let values = [username, scheduleId, seat];
        
        let res = await mysqlUtils.mysqlQuery(_sql, values);
        
        return res.insertId;
    },

    async getOrderInfo(orderId) {
        let _sql = `SELECT *
                    FROM ticket_order
                    WHERE order_id=?;`;
        let values = [orderId];

        let res = await mysqlUtils.mysqlQuery(_sql, values);

        return res;
    },

    async getOrderInfoByUser(username, orderId) {
        let _sql = `SELECT *
                    FROM ticket_order
                    WHERE order_id=? and username=?;`;
        let values = [orderId, username];

        let res = await mysqlUtils.mysqlQuery(_sql, values);

        return res;
    },

    async searchPaidOrderByUser(username) {
        let _sql = `SELECT *
                    FROM ticket_order
                    WHERE username=? and is_paid
                    ORDER BY order_id;`;
        let values = [username];

        let res = await mysqlUtils.mysqlQuery(_sql, values);

        return res;
    },

    async searchUnpaidOrderByUser(username) {
        let _sql = `SELECT *
                    FROM ticket_order
                    WHERE username=? and NOT is_paid
                    ORDER BY order_id;`;
        let values = [username];

        let res = await mysqlUtils.mysqlQuery(_sql, values);

        return res;
    },

    async getSchduleSeats(scheduleId) {
        let _sql = `SELECT seat
                    FROM ticket_order
                    WHERE schedule_id=?;`;
        let values = [scheduleId];
        let res = {};

        let seatsInfo = await mysqlUtils.mysqlQuery(_sql, values);

        seatsInfo = seatsInfo.map((orderObj) => {
            return orderObj.seat;
        });

        res.seats = seatsInfo;

        return res;
    },

    async payOrder(orderId) {
        let _sql = `UPDATE ticket_order
                    SET is_paid=true
                    WHERE order_id=? and NOT is_paid;`;
        let values = [orderId];

        let res = await mysqlUtils.mysqlQuery(_sql, values);
        
        return res;
    },

    async deleteOrder(orderId) {
        let _sql = `DELETE FROM ticket_order
                    WHERE order_id=?;`;
        let values = [orderId];

        await mysqlUtils.mysqlQuery(_sql, values);
    }
};

module.exports = order;