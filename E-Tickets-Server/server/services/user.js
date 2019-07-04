const md5 = require('md5');

const userModel = require('../models/user');

const user = {
    async register(username, password, nickname, 
                avatar='/images/avatar/default.png') {
        let res = {};
        try {
            await userModel.create(username, 
                    md5(password), nickname, avatar);
            res.status = 'OK';
            res.message = 'Register successfully.';
            res.data = {
                'username': username,
                'nickname': nickname,
                'avatar': avatar
            };
        } catch(err) {
            if (err.code === 'ER_DUP_ENTRY') {
                res.status = 'CONFLICT';
                res.message = 'Username conflict.';
                res.data = {};
            } else {
                res.status = 'UNKNOWN_ERROR';
                res.message = 'Something wrong.';
                res.data = {};
            }
        }

        return res;
    },

    async verifyUser(username, password) {
        let userInfo = await userModel.getUserInfo(username);
        let res = {};

        if (userInfo.length === 0) {
            res.status = 'NOT_FOUND';
            res.message = 'User does not exist.';
            res.data = {};
        } else if (username === userInfo[0].username && 
                md5(password) === userInfo[0].password) {
            res.status = 'OK';
            res.message = 'User confirm.';
            res.data = {
                'username': username
            };
        } else {
            res.status = 'FORBIDDEN';
            res.message = 'Password wrong.';
            res.data = {};
        }

        return res;
    },

    async getUserInfo(username) {
        let userInfo = await userModel.getUserInfo(username);
        let res = {};
        if (userInfo.length !== 0) {
            res.status = 'OK';
            res.message = 'User Infomation.';
            res.data = {
                'username': userInfo[0].username,
                'nickname': userInfo[0].nickname,
                'avatar': userInfo[0].avatar
            };
        } else {
            res.status = 'NOT_FOUND';
            res.message = 'User does not exist.';
            res.data = {};
        }

        return res;
    },

    async updateUserInfo(username, nickname, avatar) {
        let res = {};

        await userModel.updateUserInfo(username, nickname, avatar);

        res.status = 'OK';
        res.message = 'Update User Info successfully.';
        res.data = {
            'username': username,
            'nickname': nickname,
            'avatar': avatar
        };

        return res;
    },

    async changePassword(username, oldPassword, newPassword) {
        let userInfo = await userModel.getUserInfo(username);
        let res = {};

        if (userInfo.length === 0) {
            res.status = 'NOT_FOUND';
            res.message = 'User does not exist.';
            res.data = {};
        } else if (md5(oldPassword) === userInfo[0].password) {
            let newPasswordMd5 = md5(newPassword);
            await userModel.changePassword(username, newPasswordMd5);
            res.status = 'OK';
            res.message = 'Change password successfully.';
            res.data = {
                'username': username
            };
        } else {
            res.status = 'FORBIDDEN';
            res.message = 'Password wrong.';
            res.data = {};
        }
        
        return res;
    }
};

module.exports = user;