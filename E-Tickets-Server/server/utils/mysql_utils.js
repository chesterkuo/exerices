const config = require('../config');
const mysql = require('mysql');

const dbConfig = config.database;

const pool = mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USERNAME,
    password: dbConfig.PASSWORD,
    database: dbConfig.DATABASE,
    dateStrings: true
});

let sqlQuery = function (sql, values) {
    let promise = new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) {
                reject(err);
            } else {
                conn.query(sql, values, (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                    conn.release();
                });
            }
        });
    });

    return promise;
};

module.exports = {
    mysqlQuery: sqlQuery
};