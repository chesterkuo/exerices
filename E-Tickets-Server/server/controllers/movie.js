const movieService = require('../services/movie');
const httpStatus = require('../utils/res_status_utils');

const movie = {
    async createMovie(ctx) {
        let movieTitle = ctx.request.body.movie_title || '';
        let poster = ctx.request.body.poster || '';
        let director = ctx.request.body.director || '';
        let actors = ctx.request.body.actors;
        let tags = ctx.request.body.tags;

        if (!ctx.session.hasOwnProperty('idInfo')
            || ctx.session.idInfo.identity !== 'admin') {
            ctx.response.status = 401;
            ctx.response.body = {
                'status': 'UNAUTHORIZED',
                'message': 'Permission denied. You are not admin',
                'data': {}
            };
        } else {
            let res = await movieService.createMovie(movieTitle, 
                    poster, director, actors, tags);
            
            let httpStatusCode = httpStatus[res.status];
            ctx.response.status = httpStatusCode;
            ctx.response.body = res;
        }
    },

    async modifyMovieStatus(ctx) {
        let movieId = ctx.params.movie_id;
        let status = ctx.request.body.status;

        if (!ctx.session.hasOwnProperty('idInfo')
            || ctx.session.idInfo.identity !== 'admin') {
            ctx.response.status = 401;
            ctx.response.body = {
                'status': 'UNAUTHORIZED',
                'message': 'Permission denied. You are not admin',
                'data': {}
            };
        } else {
            let res = await movieService.modifyMovieStatus(movieId, status);
            
            let httpStatusCode = httpStatus[res.status];
            ctx.response.status = httpStatusCode;
            ctx.response.body = res;
        }
    },

    async uploadPoster(ctx) {
        if (!ctx.session.hasOwnProperty('idInfo')
            || ctx.session.idInfo.identity !== 'admin') {
            ctx.response.status = 401;
            ctx.response.body = {
                'status': 'UNAUTHORIZED',
                'message': 'Permission denied. Please login as admin.',
                'data': {}
            };
        } else {
            let posterPath = '/images/poster/' + ctx.req.file.filename;
            ctx.status = 200;
            ctx.body = {
                'status': 'OK',
                'message': 'Upload successfully.',
                'data': {
                    'poster': posterPath
                }
            };
        }
    },

    async getMovieInfo(ctx) {
        let movieId = ctx.params.movie_id;

        let res = await movieService.getMovieInfo(movieId);

        let httpStatusCode = httpStatus[res.status];
        ctx.response.status = httpStatusCode;
        ctx.response.body = res;
    },

    async getAllMovies(ctx) {
        let page = parseInt(ctx.params.page);
        let pageSize = parseInt(ctx.params.page_size);

        let res = await movieService.getAllMovies(page, pageSize);

        let httpStatusCode = httpStatus[res.status];
        ctx.response.status = httpStatusCode;
        ctx.response.body = res;
    },

    async searchMovies(ctx) {
        let keyWord = ctx.params.key;

        let res = await movieService.searchMovies(keyWord);

        let httpStatusCode = httpStatus[res.status];
        ctx.response.status = httpStatusCode;
        ctx.response.body = res;
    },

    async searchMoviesByTitle(ctx) {
        let keyWord = ctx.params.title;

        let res = await movieService.searchMoviesByTitle(keyWord);

        let httpStatusCode = httpStatus[res.status];
        ctx.response.status = httpStatusCode;
        ctx.response.body = res;
    },

    async searchMoviesByDirector(ctx) {
        let keyWord = ctx.params.director;

        let res = await movieService.searchMoviesByDirector(keyWord);

        let httpStatusCode = httpStatus[res.status];
        ctx.response.status = httpStatusCode;
        ctx.response.body = res;
    },

    async searchMoviesByActor(ctx) {
        let keyWord = ctx.params.actor;

        let res = await movieService.searchMoviesByActor(keyWord);

        let httpStatusCode = httpStatus[res.status];
        ctx.response.status = httpStatusCode;
        ctx.response.body = res;
    },

    async searchMoviesByTag(ctx) {
        let keyWord = ctx.params.tag;

        let res = await movieService.searchMoviesByTag(keyWord);

        let httpStatusCode = httpStatus[res.status];
        ctx.response.status = httpStatusCode;
        ctx.response.body = res;
    },

    async searchMoviesByStatus(ctx) {
        let status = parseInt(ctx.params.status);

        let res = await movieService.searchMoviesByStatus(status);

        let httpStatusCode = httpStatus[res.status];
        ctx.response.status = httpStatusCode;
        ctx.response.body = res;
    }
};

module.exports = movie;