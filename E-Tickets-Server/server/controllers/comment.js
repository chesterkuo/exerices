const commentService = require('../services/comment');
const httpStatus = require('../utils/res_status_utils');

const comment = {
    async createComment(ctx) {
        let username = ctx.request.body.username || '';
        let movieId = ctx.request.body.movie_id;
        let isRecommended = ctx.request.body.is_recommended;
        let commentContent = ctx.request.body.comment_content;
        let isSpoiled = ctx.request.body.is_spoiled;

        if (!ctx.session.hasOwnProperty('idInfo')
            || ctx.session.idInfo.identity !== 'user'
            || ctx.session.idInfo.username !== username) {
            ctx.response.status = 401;
            ctx.response.body = {
                'status': 'UNAUTHORIZED',
                'message': 'Permission denied.',
                'data': {}
            };
        } else {
            let res = await commentService
                    .createComment(username, movieId, 
                        isRecommended, commentContent, isSpoiled);

            let httpStatusCode = httpStatus[res.status];
            ctx.response.status = httpStatusCode;
            ctx.response.body = res;
        }
    },

    async deleteComment(ctx) {
        let username = ctx.request.body.username;
        let movieId = ctx.request.body.movie_id;

        if (!ctx.session.hasOwnProperty('idInfo')
            || (ctx.session.idInfo.identity !== 'admin'
                && (ctx.session.idInfo.identity !== 'user'
                    || ctx.session.idInfo.username !== username))) {
            ctx.response.status = 401;
            ctx.response.body = {
                'status': 'UNAUTHORIZED',
                'message': 'Permission denied.',
                'data': {}
            };
        } else {
            let res = await commentService.deleteComment(username, movieId);

            let httpStatusCode = httpStatus[res.status];
            ctx.response.status = httpStatusCode;
            ctx.response.body = res;
        }
    },

    async searchAllCommentsByMovieId(ctx) {
        let movieId = ctx.params.movie_id;

        let res = await commentService
                .searchAllCommentsByMovieId(movieId);
                
        let httpStatusCode = httpStatus[res.status];
        ctx.response.status = httpStatusCode;
        ctx.response.body = res;
    },

    async searchUnspoiledCommentsByMovieId(ctx) {
        let movieId = ctx.params.movie_id;

        let res = await commentService
                .searchUnspoiledCommentsByMovieId(movieId);

        let httpStatusCode = httpStatus[res.status];
        ctx.response.status = httpStatusCode;
        ctx.response.body = res;
    },

    async getAllCommentsNumByMovieId(ctx) {
        let movieId = ctx.params.movie_id;

        let res = await commentService
                .getAllCommentsNumByMovieId(movieId);

        let httpStatusCode = httpStatus[res.status];
        ctx.response.status = httpStatusCode;
        ctx.response.body = res;
    },

    async getUnspoiledCommentsNumByMovieId(ctx) {
        let movieId = ctx.params.movie_id;

        let res = await commentService
                .getUnspoiledCommentsNumByMovieId(movieId);

        let httpStatusCode = httpStatus[res.status];
        ctx.response.status = httpStatusCode;
        ctx.response.body = res;
    },

    async searchAllCommentsByMovieIdPage(ctx) {
        let movieId = ctx.params.movie_id;
        let pageId = ctx.params.page_id;
        let pageNum = ctx.params.page_num;

        let res = await commentService
                .searchAllCommentsByMovieIdPage(movieId, pageId, pageNum);

        let httpStatusCode = httpStatus[res.status];
        ctx.response.status = httpStatusCode;
        ctx.response.body = res;
    },

    async searchUnspoiledCommentsByMovieIdPage(ctx) {
        let movieId = ctx.params.movie_id;
        let pageId = ctx.params.page_id;
        let pageNum = ctx.params.page_num;

        let res = await commentService
                .searchUnspoiledCommentsByMovieIdPage(movieId, pageId, pageNum);

        let httpStatusCode = httpStatus[res.status];
        ctx.response.status = httpStatusCode;
        ctx.response.body = res;
    },

    async searchCommentsByUser(ctx) {
        let username = ctx.params.username;

        let res = await commentService.searchCommentsByUser(username);

        let httpStatusCode = httpStatus[res.status];
        ctx.response.status = httpStatusCode;
        ctx.response.body = res;
    },

    async getCommentsNumByUser(ctx) {
        let username = ctx.params.username;

        let res = await commentService.getCommentsNumByUser(username);

        let httpStatusCode = httpStatus[res.status];
        ctx.response.status = httpStatusCode;
        ctx.response.body = res;
    },

    async searchCommentsByUserPage(ctx) {
        let username = ctx.params.username;
        let pageId = ctx.params.page_id;
        let pageNum = ctx.params.page_num;

        let res = await commentService
                .searchCommentsByUserPage(username, pageId, pageNum);
        
        let httpStatusCode = httpStatus[res.status];
        ctx.response.status = httpStatusCode;
        ctx.response.body = res;
    }
};

module.exports = comment;