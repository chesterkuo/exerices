const mysqlUtils = require('../utils/mysql_utils');

const admin = {
    async create(username, password) {
        let _sql = `INSERT INTO admin(username, password)
                    VALUES(?, ?);`;
        let values = [username, password];
        await mysqlUtils.mysqlQuery(_sql, values);
    },

    async getAdminInfo(username) {
        let _sql = `SELECT * FROM admin
                    WHERE username=?;`;
        let values = [username];
        let resRow = await mysqlUtils.mysqlQuery(_sql, values);

        return resRow;
    }
};

module.exports = admin;