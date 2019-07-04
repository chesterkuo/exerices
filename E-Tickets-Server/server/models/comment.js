const mysqlUtils = require('../utils/mysql_utils');

const comment = {
    async createComment(username, movieId, 
            isRecommended, commentContent, isSpoiled) {
        let _sql = `INSERT INTO comment
                    (username, movie_id, is_recommended, comment_content, is_spoiled)
                    VALUES(?, ?, ?, ?, ?);`;
        let values = [username, movieId, isRecommended, commentContent, isSpoiled];

        let res = await mysqlUtils.mysqlQuery(_sql, values);

        return res.insertId;
    },

    async deleteComment(username, movieId) {
        let _sql = `DELETE FROM comment
                    WHERE username=? and movie_id=?;`;
        let values = [username, movieId];

        await mysqlUtils.mysqlQuery(_sql, values);
    },

    async searchAllCommentsByMovieId(movieId) {
        let _sql = `SELECT * FROM comment
                    WHERE movie_id=?
                    ORDER BY time DESC;`;
        let values = [movieId];

        let res = await mysqlUtils.mysqlQuery(_sql, values);

        return res;
    },

    async searchUnspoiledCommentsByMovieId(movieId) {
        let _sql = `SELECT * FROM comment
                    WHERE movie_id=? and not is_spoiled
                    ORDER BY time DESC;`;
        let values = [movieId];

        let res = await mysqlUtils.mysqlQuery(_sql, values);

        return res;
    },

    async getAllCommentsNumByMovieId(movieId) {
        let _sql = `SELECT COUNT(movie_id) AS amount
                    FROM comment
                    WHERE movie_id=?;`;
        let values = [movieId];

        let res = await mysqlUtils.mysqlQuery(_sql, values);

        return res[0].amount;
    },

    async getUnspoiledCommentsNumByMovieId(movieId) {
        let _sql = `SELECT COUNT(movie_id) AS amount
                    FROM comment
                    WHERE movie_id=? and not is_spoiled;`
        let values = [movieId];

        let res = await mysqlUtils.mysqlQuery(_sql, values);

        return res[0].amount;
    },

    async searchAllCommentsByMovieIdPage(movieId, start, count) {
        let _sql = `SELECT * FROM comment
                    INNER JOIN (
                        SELECT comment_id FROM comment
                        WHERE movie_id=?
                        ORDER BY time DESC LIMIT ?, ?
                    ) AS Page USING(comment_id);`;
        let values = [movieId, start, count];

        let res = await mysqlUtils.mysqlQuery(_sql, values);

        return res;
    },

    async searchUnspoiledCommentsByMovieIdPage(movieId, start, count) {
        let _sql = `SELECT * FROM comment
                    INNER JOIN (
                        SELECT comment_id FROM comment
                        WHERE movie_id=? and not is_spoiled
                        ORDER BY time DESC LIMIT ?, ?
                    ) AS page USING(comment_id);`;
        let values = [movieId, start, count];

        let res = await mysqlUtils.mysqlQuery(_sql, values);

        return res;
    },

    async searchCommentsByUser(username) {
        let _sql = `SELECT * FROM comment
                    WHERE username=?
                    ORDER BY time DESC;`;
        let values = [username];

        let res = await mysqlUtils.mysqlQuery(_sql, values);

        return res;
    },

    async getCommentsNumByUser(username) {
        let _sql = `SELECT COUNT(comment_id) AS amount
                    FROM comment
                    WHERE username=?;`;
        let values = [username];

        let res = await mysqlUtils.mysqlQuery(_sql, values);

        return res[0].amount;
    },

    async searchCommentsByUserPage(username, start, count) {
        let _sql = `SELECT * FROM comment
                    WHERE username=?
                    ORDER BY time DESC LIMIT ?, ?;`;
        let values = [username, start, count];

        let res = await mysqlUtils.mysqlQuery(_sql, values);

        return res;
    }
 };

module.exports = comment;