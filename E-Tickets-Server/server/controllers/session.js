const bodyParser = require('koa-bodyparser');

const userService = require('../services/user');
const adminService = require('../services/admin');
const ownerService = require('../services/cinema_owner');
const httpStatus = require('../utils/res_status_utils');

const session = {
    async userLogIn(ctx) {
        let username = ctx.request.body.username;
        let password = ctx.request.body.password;

        let res = await userService.verifyUser(username, password);

        let httpStatusCode = httpStatus[res.status];
        
        if (httpStatusCode === 200) {
            let userIdInfo = {
                'username': username,
                'identity': 'user'
            };
            ctx.session.idInfo = userIdInfo;
        }

        ctx.response.status = httpStatusCode;
        ctx.response.body = res;
    },

    async userLogOut(ctx) {
        if (ctx.session.hasOwnProperty('idInfo')
            && ctx.session.idInfo.identity === 'user') {
            delete ctx.session.idInfo;
            
            ctx.response.status = 200;
            ctx.response.body = {
                status: 'OK',
                message: 'Log out successfully.',
                data: {}
            };
        } else {
            ctx.response.status = 401;
            ctx.response.body = {
                status: 'UNAUTHORIZED',
                message: 'You have not logged in.',
                data: {}
            };
        }
    },

    async adminLogIn(ctx) {
        let username = ctx.request.body.username;
        let password = ctx.request.body.password;

        let res = await adminService.verifyAdmin(username, password);

        let httpStatusCode = httpStatus[res.status];
        
        if (httpStatusCode === 200) {
            let userIdInfo = {
                'username': username,
                'identity': 'admin'
            };
            ctx.session.idInfo = userIdInfo;
        }

        ctx.response.status = httpStatusCode;
        ctx.response.body = res;
    },

    async adminLogOut(ctx) {
        if (ctx.session.hasOwnProperty('idInfo')
            && ctx.session.idInfo.identity === 'admin') {
            delete ctx.session.idInfo;
            
            ctx.response.status = 200;
            ctx.response.body = {
                status: 'OK',
                message: 'Admin log out successfully.',
                data: {}
            };
        } else {
            ctx.response.status = 401;
            ctx.response.body = {
                status: 'UNAUTHORIZED',
                message: 'You have not logged in.',
                data: {}
            };
        }
    },

    async ownerLogIn(ctx) {
        let username = ctx.request.body.username;
        let password = ctx.request.body.password;

        let res = await ownerService.verifyOwner(username, password);

        let httpStatusCode = httpStatus[res.status];
        
        if (httpStatusCode === 200) {
            let userIdInfo = {
                'username': username,
                'identity': 'cinema_owner'
            };
            ctx.session.idInfo = userIdInfo;
        }

        ctx.response.status = httpStatusCode;
        ctx.response.body = res;
    },

    async ownerLogOut(ctx) {
        if (ctx.session.hasOwnProperty('idInfo')
            && ctx.session.idInfo.identity === 'cinema_owner') {
            delete ctx.session.idInfo;
            
            ctx.response.status = 200;
            ctx.response.body = {
                status: 'OK',
                message: 'Cinema Owner log out successfully.',
                data: {}
            };
        } else {
            ctx.response.status = 401;
            ctx.response.body = {
                status: 'UNAUTHORIZED',
                message: 'You have not logged in.',
                data: {}
            };
        }
    }
};

module.exports = session;