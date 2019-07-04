const mysqlUtils = require('../utils/mysql_utils');

const cinema = {
    async createCinema(owner, cinemaName, cinemaLoc) {
        let _sql = `INSERT INTO cinema(cinema_name, cinema_location, owner)
                    VALUES(?, ?, ?);`;
        let values = [cinemaName, cinemaLoc, owner];
        
        let res = await mysqlUtils.mysqlQuery(_sql, values);

        return res.insertId;
    },

    async getCinemaInfo(cinemaId) {
        let _sql = `SELECT *
                    FROM cinema
                    WHERE cinema_id=?;`;
        let values = [cinemaId];

        let res = await mysqlUtils.mysqlQuery(_sql, values);

        return res;
    },

    async searchCinemaInfoByLocation(location) {
        let _sql = `SELECT *
                    FROM cinema
                    WHERE cinema_location=?;`;
        let values = [location];

        let res = await mysqlUtils.mysqlQuery(_sql, values);

        return res;
    },

    async searchCinemaInfoByOwner(owner) {
        let _sql = `SELECT *
                    FROM cinema
                    WHERE owner=?;`;
        let values = [owner];

        let res = await mysqlUtils.mysqlQuery(_sql, values);

        return res;
    },

    async searchCinemaInfoByName(cinemaName) {
        let _sql = `SELECT *
                    FROM cinema
                    WHERE cinema_name like ?;`;
        let values = [cinemaName + '%'];

        let res = await mysqlUtils.mysqlQuery(_sql, values);

        return res;
    },

    async cearteMovieHall(cinemaId, hallId, sizeId, size) {
        let _sql = `INSERT INTO cinema_hall(cinema_id, hall_id, size_id, size)
                    VALUES(?, ?, ?, ?);`;

        let values = [cinemaId, hallId, sizeId, size];

        await mysqlUtils.mysqlQuery(_sql, values);
    },

    async getMovieHallInfo(cinemaId, hallId) {
        let _sql = `SELECT *
                    FROM cinema_hall
                    WHERE cinema_id=? and hall_id=?`;

        let values = [cinemaId, hallId];

        let res = await mysqlUtils.mysqlQuery(_sql, values);

        return res;
    },

    async searchMovieHallByCinemaId(cinemaId) {
        let _sql = `SELECT *
                    FROM cinema_hall
                    WHERE cinema_id=?`;

        let values = [cinemaId];

        let res = await mysqlUtils.mysqlQuery(_sql, values);

        return res;
    }
};

module.exports = cinema;
