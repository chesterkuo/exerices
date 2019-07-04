const md5 = require('md5');

const adminModel = require('../models/admin');

const admin = {
    async register(username, password) {
        let res = {};
        try {
            await adminModel.create(username, md5(password));
            res.status = 'OK';
            res.message = 'Admin register successfully.';
            res.data = {
                'admin_username': username,
            };
        } catch(err) {
            if (err.code === 'ER_DUP_ENTRY') {
                res.status = 'CONFLICT';
                res.message = 'Admin username conflict.';
                res.data = {};
            } else {
                res.status = 'UNKNOWN_ERROR';
                res.message = 'Something wrong.';
                res.data = {};
            }
        }

        return res;
    },

    async verifyAdmin(username, password) {
        let adminInfo = await adminModel.getAdminInfo(username);
        let res = {};

        if (adminInfo.length === 0) {
            res.status = 'NOT_FOUND';
            res.message = 'Admin does not exist.';
            res.data = {};
        } else if (username === adminInfo[0].username && 
                md5(password) === adminInfo[0].password) {
            res.status = 'OK';
            res.message = 'Admin confirm.';
            res.data = {
                'admin_username': username
            };
        } else {
            res.status = 'FORBIDDEN';
            res.message = 'Password wrong.';
            res.data = {};
        }

        return res;
    }
};

module.exports = admin;