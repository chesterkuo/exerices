const mysqlUtils = require('../utils/mysql_utils');

const user = {
    async create(username, password, nickname, avatar) {
        let _sql = `INSERT INTO user(username, password, nickname, avatar)
                    VALUES(?, ?, ?, ?);`;
        let values = [username, password, nickname, avatar];
        await mysqlUtils.mysqlQuery(_sql, values);
    },

    async getUserInfo(username) {
        let _sql = `SELECT * FROM user
                    WHERE username=?;`;
        let values = [username];
        let resRow = await mysqlUtils.mysqlQuery(_sql, values);

        return resRow;
    },

    async updateUserInfo(username, nickname, avatar) {
        let _sql = `UPDATE user SET
                    nickname=?, avatar=?
                    WHERE username=?;`;
        let values = [nickname, avatar, username];
        await mysqlUtils.mysqlQuery(_sql, values);
    },

    async changePassword(username, password) {
        let _sql = `UPDATE user SET
                    password=?
                    WHERE username=?`;
        let values = [password, username];

        await mysqlUtils.mysqlQuery(_sql, values);
    }
};

module.exports = user;