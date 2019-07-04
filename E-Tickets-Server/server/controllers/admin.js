const bodyParser = require('koa-bodyparser');

const adminService = require('../services/admin');
const httpStatus = require('../utils/res_status_utils');

const admin = {
    async register(ctx) {
        //TODO: 判断是否用户名密码格式合法性
        let username = ctx.request.body.username || '';
        let password = ctx.request.body.password || '';

        let res = await adminService.register(username, password);
        
        let httpStatusCode = httpStatus[res.status];
        ctx.response.status = httpStatusCode;
        ctx.response.body = res;
    },

    async getAdminSelf(ctx) {
        let username = '';
        if (ctx.session.hasOwnProperty('idInfo') 
            && ctx.session.idInfo.identity === 'admin') {
            username = ctx.session.idInfo.username;
            ctx.response.status = 200;
            ctx.response.body = {
                'status': 'OK',
                'message': 'Get Admin username',
                'data': {
                    'username': username
                }
            };
        } else {
            ctx.response.status = 401;
            ctx.response.body = {
                'status': 'UNAUTHORIZED',
                'message': 'Permission denied. Please login.',
                'data': {}
            };
        }
    }
};

module.exports = admin;