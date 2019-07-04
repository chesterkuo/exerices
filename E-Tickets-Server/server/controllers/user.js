const bodyParser = require('koa-bodyparser');
const multer = require('koa-multer');

const userService = require('../services/user');
const httpStatus = require('../utils/res_status_utils');

const user = {
    async register(ctx) {
        let username = ctx.request.body.username || '';
        let password = ctx.request.body.password || '';
        let nickname = ctx.request.body.nickname || '';

        let res = await userService.register(username, password, nickname);
        
        let httpStatusCode = httpStatus[res.status];
        ctx.response.status = httpStatusCode;
        ctx.response.body = res;
    },

    async getUserSelf(ctx) {
        let username = '';
        if (ctx.session.hasOwnProperty('idInfo') 
            && ctx.session.idInfo.identity === 'user') {
            username = ctx.session.idInfo.username;
            ctx.response.status = 200;
            ctx.response.body = {
                'status': 'OK',
                'message': 'Get username',
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
    },

    async queryUserInfo(ctx) {
        let username = ctx.params.username || '';

        let res = await userService.getUserInfo(username);

        let httpStatusCode = httpStatus[res.status];
        ctx.response.status = httpStatusCode;
        ctx.response.body = res;
    },

    async updateUserInfo(ctx) {
        let username = ctx.params.username || '';
        let nickname = ctx.request.body.nickname || '';
        let avatar = ctx.request.body.avatar || '';

        if (!ctx.session.hasOwnProperty('idInfo')
            || ctx.session.idInfo.username !== username 
            || ctx.session.idInfo.identity !== 'user') {
            ctx.response.status = 401;
            ctx.response.body = {
                'status': 'UNAUTHORIZED',
                'message': 'Permission denied. Please login.',
                'data': {}
            };
        } else {
            let res = await userService.updateUserInfo(username, nickname, avatar);

            let httpStatusCode = httpStatus[res.status];
            ctx.response.status = httpStatusCode;
            ctx.response.body = res;
        }
    },

    async uploadAvatar(ctx) {
        let username = ctx.params.username || '';
        if (!ctx.session.hasOwnProperty('idInfo')
            || ctx.session.idInfo.username !== username 
            || ctx.session.idInfo.identity !== 'user') {
            ctx.response.status = 401;
            ctx.response.body = {
                'status': 'UNAUTHORIZED',
                'message': 'Permission denied. Please login.',
                'data': {}
            };
        } else {
            let avatarPath = '/images/avatar/' + ctx.req.file.filename;
            ctx.status = 200;
            ctx.body = {
                'status': 'OK',
                'message': 'Upload successfully.',
                'data': {
                    'avatar': avatarPath
                }
            };
        }
    }
};

module.exports = user;