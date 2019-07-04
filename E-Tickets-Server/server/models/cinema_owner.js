const mysqlUtils = require('../utils/mysql_utils');

const owner = {
    async create(username, password) {
        let _sql = `INSERT INTO cinema_owner(username, password)
                    VALUES(?, ?);`;
        let values = [username, password];
        await mysqlUtils.mysqlQuery(_sql, values);
    },

    async getCinemaOwnerInfo(username) {
        let _sql = `SELECT * FROM cinema_owner
                    WHERE username=?;`;
        let values = [username];
        let res = await mysqlUtils.mysqlQuery(_sql, values);

        return res;
    }
};

module.exports = owner;