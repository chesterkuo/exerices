const movieModel = require('../models/movie');

const formattingMovieData = (moviesInfoOrig) => {
    return moviesInfoOrig.map((movie) => {
        return {
            'movie_id': movie.movie_id,
            'title': movie.title,
            'poster': movie.poster,
            'director': movie.director,
            'actors': movie.actors.split('#'),
            'tags': movie.tags.split('#'),
            'status': movie.status,
            'comment_amount': movie.comment_amount
        }
    });
};

const movie = {
    async createMovie(movie_title, 
                poster='/images/poster/default.png', 
                director, actors, tags) {
        let res = {};
        try {
            await movieModel.create(movie_title, 
                    poster, director, actors, tags);
            res.status = 'OK';
            res.message = 'Create movie successfully.';
            res.data = {
                'movie_title': movie_title,
                'poster': poster,
                'director': director,
                'actors': actors,
                'tags': tags
            };
        } catch(err) {
            res.status = 'INTERNAL_ERROR';
            res.message = 'Cannot create this movie.';
            res.data = {};
        }

        return res;
    },

    async modifyMovieStatus(movieId, status) {
        let res = {};

        await movieModel.modifyMovieStatus(movieId, status);

        res.status = 'OK';
        res.message = 'Update movie status successfully.';
        res.data = {
            'movie_id': movieId,
            'status': status
        };

        return res;
    },

    async getMovieInfo(movieId) {
        let moviesInfo = await movieModel.getMovieInfo(movieId);
        moviesInfo = formattingMovieData(moviesInfo);

        let res = {};
        if (moviesInfo.length > 0) {
            res.status = 'OK';
            res.message = 'Find movies.';
            res.data = moviesInfo[0];
        } else {
            res.status = 'NOT_FOUND';
            res.message = 'Cannot find any movie.';
            res.data = {};
        }

        return res;
    },

    async getAllMovies(page, pageSize) {
        let res = {}
        
        start = (page - 1) * pageSize;
        let amountInfo = await movieModel.getAllMoviesAmount();
        let movieAmount = amountInfo[0].amount;
        let moviesInfo = await movieModel.getAllMovies(start, pageSize);

        moviesInfo = formattingMovieData(moviesInfo);

        if (moviesInfo.length > 0) {
            res.status = 'OK';
            res.message = 'Find movies.';
            res.data = {
                'movie_amount': movieAmount,
                'movies': moviesInfo
            };
        } else {
            res.status = 'NOT_FOUND';
            res.message = 'Cannot find any movie.';
            res.data = {};
        }

        return res;
    },

    async searchMovies(keyWord) {
        let res = {};
        let moviesInfo = [];

        let moviesByTitle = await movieModel.searchMoviesByTitle(keyWord);
        moviesInfo = moviesInfo.concat(moviesByTitle);

        let moviesByDirector = await movieModel.searchMoviesByDirector(keyWord);
        moviesInfo = moviesInfo.concat(moviesByDirector);

        let moviesByActor = await movieModel.searchMoviesByActor(keyWord);
        moviesInfo = moviesInfo.concat(moviesByActor);

        let moviesByTag = await movieModel.searchMoviesByTag(keyWord);
        moviesInfo = moviesInfo.concat(moviesByTag);

        moviesInfo = formattingMovieData(moviesInfo);

        if (moviesInfo.length > 0) {
            res.status = 'OK';
            res.message = 'Find movies.';
            res.data = {
                'movies': moviesInfo
            };
        } else {
            res.status = 'NOT_FOUND';
            res.message = 'Cannot find any movie.';
            res.data = {};
        }

        return res;
    },

    async searchMoviesByTitle(titleKey) {
        let res = {};
        let moviesInfo = await movieModel.searchMoviesByTitle(titleKey);
        moviesInfo = formattingMovieData(moviesInfo);

        if (moviesInfo.length > 0) {
            res.status = 'OK';
            res.message = 'Find movies. Search by title.';
            res.data = {
                'movies': moviesInfo
            };
        } else {
            res.status = 'NOT_FOUND';
            res.message = 'Cannot find any movie.';
            res.data = {};
        }

        return res;
    },

    async searchMoviesByDirector(directorKey) {
        let res = {};
        let moviesInfo = await movieModel.searchMoviesByDirector(directorKey);
        moviesInfo = formattingMovieData(moviesInfo);

        if (moviesInfo.length > 0) {
            res.status = 'OK';
            res.message = 'Find movies. Search by director.';
            res.data = {
                'movies': moviesInfo
            };
        } else {
            res.status = 'NOT_FOUND';
            res.message = 'Cannot find any movie.';
            res.data = {};
        }

        return res;
    },

    async searchMoviesByActor(actorKey) {
        let res = {};
        let moviesInfo = await movieModel.searchMoviesByActor(actorKey);
        moviesInfo = formattingMovieData(moviesInfo);

        if (moviesInfo.length > 0) {
            res.status = 'OK';
            res.message = 'Find movies. Search by actor.';
            res.data = {
                'movies': moviesInfo
            };
        } else {
            res.status = 'NOT_FOUND';
            res.message = 'Cannot find any movie.';
            res.data = {};
        }

        return res;
    },

    async searchMoviesByTag(tagKey) {
        let res = {};
        let moviesInfo = await movieModel.searchMoviesByTag(tagKey);
        moviesInfo = formattingMovieData(moviesInfo);

        if (moviesInfo.length > 0) {
            res.status = 'OK';
            res.message = 'Find movies. Search by tag.';
            res.data = {
                'movies': moviesInfo
            };
        } else {
            res.status = 'NOT_FOUND';
            res.message = 'Cannot find any movie.';
            res.data = {};
        }

        return res;
    },

    async searchMoviesByStatus(status) {
        let res = {};

        let moviesInfo = await movieModel.searchMoviesByStatus(status);
        moviesInfo = formattingMovieData(moviesInfo);

        if (moviesInfo.length > 0) {
            res.status = 'OK';
            res.message = 'Find movies. Search by status.';
            res.data = {
                'movies': moviesInfo
            };
        } else {
            res.status = 'NOT_FOUND';
            res.message = 'Cannot find any movie.';
            res.data = {};
        }

        return res;
    }
};

module.exports = movie;