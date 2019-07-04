const mysqlUtils = require('../utils/mysql_utils');

const movieUtils = {
    mergeStrArray(strArray) {
        let strMerge = '';

        for (let str of strArray) {
            strMerge += str;
            strMerge += '#';
        }
        strMerge = strMerge.substr(0, strMerge.length - 1);

        return strMerge;
    },

    async insertMovieDb(title, poster, director, actors, tags) {
        let strTags = this.mergeStrArray(tags);
        let strActors = this.mergeStrArray(actors);

        let _sql = `INSERT INTO movie(title, poster, director, actors, tags)
                    VALUES(?, ?, ?, ?, ?);`;
        let values = [title, poster, director, strActors, strTags];

        let res = await mysqlUtils.mysqlQuery(_sql, values);

        return res.insertId;
    },

    async insertTagDb(tags) {
        let _sql = `INSERT IGNORE INTO tag(tag_name)
                    VALUES(?);`;
        for (let tag of tags) {
            let values = [tag];

            await mysqlUtils.mysqlQuery(_sql, values);
        }
    },

    async insertDirectorDb(director) {
        let _sql = `INSERT IGNORE INTO director(director_name)
                    VALUES(?);`; 
        let values = [director];

        await mysqlUtils.mysqlQuery(_sql, values);
    },

    async insertActorDb(actors) {
        let _sql = `INSERT IGNORE INTO actor(actor_name)
                    VALUES(?);`;
        for (let actor of actors) {
            let values = [actor];

            await mysqlUtils.mysqlQuery(_sql, values);
        }
    },

    async mapMovieTags(movie_id, tags) {
        try {
            for (let tag of tags) {
                let _sql = `SELECT tag_id FROM tag
                            WHERE tag_name=?;`;
                let values = [tag];
                let res = await mysqlUtils.mysqlQuery(_sql, values);
                let tag_id = res[0].tag_id;

                _sql = `INSERT INTO tag_movie_map(tag_id, movie_id)
                        VALUES(?, ?)`;
                values = [tag_id, movie_id];
                
                await mysqlUtils.mysqlQuery(_sql, values);
            }
        } catch(err) {
            throw err;
        }
    },

    async mapMovieDirector(movie_id, director) {
        try {
            let _sql = `SELECT director_id FROM director
                        WHERE director_name=?;`;
            let values = [director];
            let res = await mysqlUtils.mysqlQuery(_sql, values);
            let director_id = res[0].director_id;

            _sql = `INSERT INTO director_movie_map(director_id, movie_id)
                    VALUES(?, ?)`;
            values = [director_id, movie_id];

            await mysqlUtils.mysqlQuery(_sql, values);
        } catch(err) {
            throw err;
        }
    },

    async mapMovieActors(movie_id, actors) {
        try {
            for (let actor of actors) {
                let _sql = `SELECT actor_id FROM actor
                            WHERE actor_name=?;`;
                let values = [actor];
                let res = await mysqlUtils.mysqlQuery(_sql, values);
                let actor_id = res[0].actor_id;

                _sql = `INSERT INTO actor_movie_map(actor_id, movie_id)
                        VALUES(?, ?)`;
                values = [actor_id, movie_id];
                
                await mysqlUtils.mysqlQuery(_sql, values);
            }
        } catch(err) {
            throw err;
        }
    },

    async searchDirectorIds(dirKeyWord) {
        let _sql = `SELECT director_id
                    FROM director
                    WHERE director_name like ?`;
        let values = [dirKeyWord + '%'];

        let res = await mysqlUtils.mysqlQuery(_sql, values);
        let directorIds = res.map((dirObj) => {
            return dirObj.director_id;
        });
        return directorIds;
    },

    async searchActorIds(actorKeyWord) {
        let _sql = `SELECT actor_id
                    FROM actor
                    WHERE actor_name like ?`;
        let values = [actorKeyWord + '%'];

        let res = await mysqlUtils.mysqlQuery(_sql, values);
        let actorIds = res.map((actorObj) => {
            return actorObj.actor_id;
        });
        return actorIds;
    },

    async searchTagIds(tagKeyWord) {
        let _sql = `SELECT tag_id
                    FROM tag
                    WHERE tag_name like ?`;
        let values = [tagKeyWord + '%'];

        let res = await mysqlUtils.mysqlQuery(_sql, values);
        let tagIds = res.map((tagObj) => {
            return tagObj.tag_id;
        });
        return tagIds;
    },

    async getMovieInfo(movieId) {
        let _sql = `SELECT movie.*, IFNULL(COUNT(comment.comment_id), 0) AS comment_amount
                    FROM movie LEFT JOIN comment USING(movie_id)
                    WHERE movie.movie_id=? GROUP BY movie.movie_id;`;
        let values = [movieId];

        let res = await mysqlUtils.mysqlQuery(_sql, values);

        return res;
    },

    async searchMovieIdsByDirectorIds(directorIds) {
        let movies = [];
        for (let dirId of directorIds) {
            let _sql = `SELECT movie_id 
                        FROM director_movie_map
                        WHERE director_id=?`;
            let values = [dirId];

            let res = await mysqlUtils.mysqlQuery(_sql, values);

            movies = movies.concat(res);
        }

        let movieIds = movies.map((movieObj) => {
            return movieObj.movie_id;
        });

        return movieIds;
    },

    async searchMovieIdsByActorIds(actorIds) {
        let movies = [];
        for (let actorId of actorIds) {
            let _sql = `SELECT movie_id 
                        FROM actor_movie_map
                        WHERE actor_id=?`;
            let values = [actorId];

            let res = await mysqlUtils.mysqlQuery(_sql, values);

            movies = movies.concat(res);
        }

        let movieIds = movies.map((movieObj) => {
            return movieObj.movie_id;
        });

        return movieIds;
    },

    async searchMovieIdsByTagIds(tagIds) {
        let movies = [];
        for (let tagId of tagIds) {
            let _sql = `SELECT movie_id 
                        FROM tag_movie_map
                        WHERE tag_id=?`;
            let values = [tagId];

            let res = await mysqlUtils.mysqlQuery(_sql, values);

            movies = movies.concat(res);
        }

        let movieIds = movies.map((movieObj) => {
            return movieObj.movie_id;
        });

        return movieIds;
    },

    async searchMoviesByTitle(titleKey) {
        let _sql = `SELECT movie.*, IFNULL(COUNT(comment.comment_id), 0) AS comment_amount
                    FROM movie LEFT JOIN comment USING(movie_id)
                    WHERE movie.title like ? GROUP BY movie.movie_id;`;
        let values = [titleKey + '%'];
        let res = await mysqlUtils.mysqlQuery(_sql, values);
        return res;
    },

    async searchMoviesByMovieIds(movieIds) {
        let _sql = `SELECT movie.*, IFNULL(COUNT(comment.comment_id), 0) AS comment_amount
                    FROM movie LEFT JOIN comment USING(movie_id)
                    WHERE movie.movie_id in (`;
        for (let i = 0; i < movieIds.length - 1; ++i) {
            _sql += `?, `;
        }
        _sql += `?) GROUP BY movie.movie_id`;

        let values = movieIds;

        let moviesInfo = await mysqlUtils.mysqlQuery(_sql, values);

        return moviesInfo;
    }
};

const movie = {
    async create(movie_title, poster, 
                director, actors, tags) {
        await mysqlUtils.mysqlQuery(`BEGIN;`);

        try {
            let movie_id = await movieUtils.insertMovieDb(movie_title, 
                    poster, director, actors, tags);

            await movieUtils.insertTagDb(tags);
            await movieUtils.mapMovieTags(movie_id, tags);

            await movieUtils.insertDirectorDb(director);
            await movieUtils.mapMovieDirector(movie_id, director);

            await movieUtils.insertActorDb(actors);
            await movieUtils.mapMovieActors(movie_id, actors);

            await mysqlUtils.mysqlQuery(`COMMIT;`);
        } catch(err) {
            console.log(`Database ROLLBACK!!`);
            await mysqlUtils.mysqlQuery(`ROLLBACK;`);
            throw err;
        }
    },

    async modifyMovieStatus(movieId, status) {
        let _sql = `UPDATE movie
                    SET status=?
                    WHERE movie_id=?;`;
        let values = [status, movieId];
        
        await mysqlUtils.mysqlQuery(_sql, values);
    },

    async getAllMoviesAmount() {
        let _sql = `SELECT COUNT(*) AS amount
                    FROM movie;`
        let res = await mysqlUtils.mysqlQuery(_sql, []);

        return res;
    },

    async getAllMovies(start, count) {
        let _sql = `SELECT *
                    FROM movie
                    LIMIT ?, ?;`;
        let values = [start, count];

        let res = await mysqlUtils.mysqlQuery(_sql, values);

        return res;
    },

    async getMovieInfo(movieId) {
        let res = await movieUtils.getMovieInfo(movieId);

        return res;
    },

    async searchMoviesByTitle(movieTitle) {
        let res = await movieUtils.searchMoviesByTitle(movieTitle);

        return res;
    },

    async searchMoviesByDirector(director) {
        let directorIds = await movieUtils.searchDirectorIds(director);
        let moviesInfo = [];

        if (directorIds.length > 0) {
            let movieIds = await movieUtils.searchMovieIdsByDirectorIds(directorIds);
            moviesInfo = await movieUtils.searchMoviesByMovieIds(movieIds);
        }

        return moviesInfo;
    },

    async searchMoviesByActor(actor) {
        let actorIds = await movieUtils.searchActorIds(actor);
        let moviesInfo = [];

        if (actorIds.length > 0) {
            let movieIds = await movieUtils.searchMovieIdsByActorIds(actorIds);
            moviesInfo = await movieUtils.searchMoviesByMovieIds(movieIds);
        }

        return moviesInfo;
    },

    async searchMoviesByTag(tag) {
        let tagIds = await movieUtils.searchTagIds(tag);
        let moviesInfo = [];

        if (tagIds.length > 0) {
            let movieIds = await movieUtils.searchMovieIdsByTagIds(tagIds);
            moviesInfo = await movieUtils.searchMoviesByMovieIds(movieIds);
        }

        return moviesInfo;
    },

    async searchMoviesByStatus(status) {
        let _sql = `SELECT movie.*, IFNULL(COUNT(comment.comment_id), 0) AS comment_amount
                    FROM movie LEFT JOIN comment USING(movie_id)
                    WHERE movie.status=? GROUP BY movie.movie_id;`;
        let values = [status];

        let res = await mysqlUtils.mysqlQuery(_sql, values);

        return res;
    }
};

module.exports = movie;