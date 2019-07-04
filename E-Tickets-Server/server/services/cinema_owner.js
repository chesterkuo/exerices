const md5 = require('md5');

const ownerModel = require('../models/cinema_owner');

const owner = {
    async register(username, password) {
        let res = {};
        try {
            await ownerModel.create(username, md5(password));
            res.status = 'OK';
            res.message = 'Cinema boss register successfully.';
            res.data = {
                'username': username,
            };
        } catch(err) {
            if (err.code === 'ER_DUP_ENTRY') {
                res.status = 'CONFLICT';
                res.message = 'Cinema boss username conflict.';
                res.data = {};
            } else {
                res.status = 'UNKNOWN_ERROR';
                res.message = 'Something wrong.';
                res.data = {};
            }
        }

        return res;
    },

    async verifyOwner(username, password) {
        let ownerInfo = await ownerModel.getCinemaOwnerInfo(username);
        let res = {};

        if (ownerInfo.length === 0) {
            res.status = 'NOT_FOUND';
            res.message = 'Cinema owner does not exist.';
            res.data = {};
        } else if (username === ownerInfo[0].username && 
                md5(password) === ownerInfo[0].password) {
            res.status = 'OK';
            res.message = 'Cinema boss confirm.';
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

module.exports = owner;