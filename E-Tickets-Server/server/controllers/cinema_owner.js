const bodyParser = require('koa-bodyparser');

const ownerService = require('../services/cinema_owner');
const httpStatus = require('../utils/res_status_utils');

const owner = {
    async register(ctx) {
        let username = ctx.request.body.username || '';
        let password = ctx.request.body.password || '';

        let res = await ownerService.register(username, password);
        
        let httpStatusCode = httpStatus[res.status];
        ctx.response.status = httpStatusCode;
        ctx.response.body = res;
    },

    async getOwnerSelf(ctx) {
        let username = '';
        if (ctx.session.hasOwnProperty('idInfo') 
            && ctx.session.idInfo.identity === 'cinema_owner') {
            username = ctx.session.idInfo.username;
            ctx.response.status = 200;
            ctx.response.body = {
                'status': 'OK',
                'message': 'Get Owner username',
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

module.exports = owner;