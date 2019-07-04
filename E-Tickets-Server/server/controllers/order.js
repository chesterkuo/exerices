const orderService = require('../services/order');
const httpStatus = require('../utils/res_status_utils');

const order = {
    async createOrder(ctx) {
        let username = ctx.request.body.username || '';
        let scheduleId = ctx.request.body.schedule_id;
        let seat = ctx.request.body.seat_id;

        if (!ctx.session.hasOwnProperty('idInfo')
            || ctx.session.idInfo.identity !== 'user'
            || ctx.session.idInfo.username !== username) {
            ctx.response.status = 401;
            ctx.response.body = {
                'status': 'UNAUTHORIZED',
                'message': 'Permission denied. Please login.',
                'data': {}
            };
        } else {
            let res = await orderService
                    .createOrder(username, scheduleId, seat);
            let httpStatusCode = httpStatus[res.status];
            ctx.response.status = httpStatusCode;
            ctx.response.body = res;
        }
    },

    async payOrder(ctx) {
        let username = ctx.request.body.username || '';
        let isPaid = ctx.request.body.is_paid;
        
        let orderId = ctx.params.order_id;

        if (!ctx.session.hasOwnProperty('idInfo')
            || ctx.session.idInfo.identity !== 'user'
            || ctx.session.idInfo.username !== username) {
            ctx.response.status = 401;
            ctx.response.body = {
                'status': 'UNAUTHORIZED',
                'message': 'Permission denied. Please login.',
                'data': {}
            };
        } else {
            if (isPaid) {
                let res = await orderService.payOrder(orderId);
                let httpStatusCode = httpStatus[res.status];
                ctx.response.status = httpStatusCode;
                ctx.response.body = res;
            } else {
                ctx.response.status = '403';
                ctx.response.body = {
                    'status': 'FORBIDDEN',
                    'message': 'You have not paid.',
                    'data': {}
                };
            }
        }
    },

    async getOrderInfo(ctx) {
        let username = ctx.params.username || '';
        let orderId = ctx.params.order_id;
        if (!ctx.session.hasOwnProperty('idInfo')
            || ctx.session.idInfo.identity !== 'user'
            || ctx.session.idInfo.username !== username) {
            ctx.response.status = 401;
            ctx.response.body = {
                'status': 'UNAUTHORIZED',
                'message': 'Permission denied. Please login.',
                'data': {}
            };
        } else {
            let res = await orderService
                    .getOrderInfoByUser(username, orderId);
            let httpStatusCode = httpStatus[res.status];
            ctx.response.status = httpStatusCode;
            ctx.response.body = res;
        }
    },

    async searchPaidOrderByUser(ctx) {
        let username = ctx.params.username || '';
        if (!ctx.session.hasOwnProperty('idInfo')
            || ctx.session.idInfo.identity !== 'user'
            || ctx.session.idInfo.username !== username) {
            ctx.response.status = 401;
            ctx.response.body = {
                'status': 'UNAUTHORIZED',
                'message': 'Permission denied. Please login.',
                'data': {}
            };
        } else {
            let res = await orderService
                    .searchPaidOrderByUser(username);
            let httpStatusCode = httpStatus[res.status];
            ctx.response.status = httpStatusCode;
            ctx.response.body = res;
        }
    },

    async searchUnpaidOrderByUser(ctx) {
        let username = ctx.params.username || '';
        if (!ctx.session.hasOwnProperty('idInfo')
            || ctx.session.idInfo.identity !== 'user'
            || ctx.session.idInfo.username !== username) {
            ctx.response.status = 401;
            ctx.response.body = {
                'status': 'UNAUTHORIZED',
                'message': 'Permission denied. Please login.',
                'data': {}
            };
        } else {
            let res = await orderService
                    .searchUnpaidOrderByUser(username);
            let httpStatusCode = httpStatus[res.status];
            ctx.response.status = httpStatusCode;
            ctx.response.body = res;
        }
    }
};

module.exports = order;