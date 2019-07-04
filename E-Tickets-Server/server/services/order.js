const orderModel = require('../models/order');
const scheduleModel = require('../models/schedule');
const cinemaModel = require('../models/cinema');

const orderUtils = {
    async judgeDuplicateSeat(scheduleId, seat) {
        let seatsInfo = await orderModel.getSchduleSeats(scheduleId);
        let isDup = false;

        for (let _seat of seatsInfo.seats) {
            if (_seat === seat) {
                return true;
            }
        }

        return isDup;
    },

    async judgeOrderInfo(scheduleId, seat) {
        let isSeatDup = await this.judgeDuplicateSeat(scheduleId, seat);
        if (isSeatDup) {
            return false;
        }

        let schedulesInfo = await scheduleModel.getScheduleInfo(scheduleId);

        if (schedulesInfo.length > 0) {
            let cinemaId = schedulesInfo[0].cinema_id;
            let hallId = schedulesInfo[0].hall_id;

            let hallsInfo = await cinemaModel.getMovieHallInfo(cinemaId, hallId);
            if (hallsInfo.length > 0) {
                let size = hallsInfo[0].size;
                if (seat < size) {
                    return true;
                }
            }
        }
        return false;
    }
};

const order = {
    async createOrder(username, scheduleId, seat) {
        let isOrderLegal = await orderUtils.judgeOrderInfo(scheduleId, seat);

        let res = {};
        
        if (isOrderLegal) {
            try {
                let orderId = await orderModel
                        .createOrder(username, scheduleId, seat);

                res.status = 'OK';
                res.message = 'Create order successfully';
                res.data = {
                    'username': username,
                    'order_id': orderId
                };
            } catch(err) {
                res.status = 'INTERNAL_ERROR';
                res.message = 'Cannot create this order.'
                res.data = {};
            }
        } else {
            res.status = 'BAD_REQUEST';
            res.message = 'Cannot create this order, check you params.';
            res.data = {};
        }

        return res;
    },

    async getOrderInfo(orderId) {
        let ordersInfo = await orderModel.getOrderInfo(orderId);

        let res = {};

        if (ordersInfo.length > 0) {
            res.status = 'OK';
            res.message = 'Get order information.';
            res.data = ordersInfo[0];
        } else {
            res.status = 'NOT_FOUND';
            res.message = 'Cannot find any order.'
            res.data = {};
        }

        return res;
    },

    async getOrderInfoByUser(username, orderId) {
        let ordersInfo = await orderModel
                .getOrderInfoByUser(username, orderId);

        let res = {};

        if (ordersInfo.length > 0) {
            res.status = 'OK';
            res.message = 'Get order information.';
            res.data = ordersInfo[0];
        } else {
            res.status = 'NOT_FOUND';
            res.message = 'Cannot find any order.'
            res.data = {};
        }

        return res;
    },

    async payOrder(orderId) {
        let res = {};
        
        try {
            let paidInfo = await orderModel.payOrder(orderId);
            
            if (paidInfo.affectedRows > 0) {
                res.status = 'OK';
                res.message = 'Successful payment.';
                res.data = {
                    'order_id': orderId
                };
            } else {
                res.status = 'NOT_FOUND';
                res.message = 'Order does not exist or has been paid.';
                res.data = {};
            }
        } catch(err) {
            res.status = 'INTERNAL_ERROR';
            res.message = 'Failure to pay.'
            res.data = {};
        }

        return res;
    },

    async searchPaidOrderByUser(username) {
        let ordersInfo = await orderModel
                .searchPaidOrderByUser(username);
        
        let res = {}; 
        if (ordersInfo.length > 0) {
            res.status = 'OK';
            res.message = 'Find orders!';
            res.data = ordersInfo;
        } else {
            res.status = 'NOT_FOUND';
            res.message = 'Cannot find any paid order.';
            res.data = {};
        }

        return res;
    },

    async searchUnpaidOrderByUser(username) {
        let ordersInfo = await orderModel
                .searchUnpaidOrderByUser(username);

        let res = {};
        if (ordersInfo.length > 0) {
            res.status = 'OK';
            res.message = 'Find unpaid orders!';
            res.data = ordersInfo;
        } else {
            res.status = 'NOT_FOUND';
            res.message = 'Cannot find any unpaid order.';
            res.data = {};
        }

        return res;
    }
};

module.exports = order;