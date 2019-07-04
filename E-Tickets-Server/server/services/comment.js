const commentModel = require('../models/comment');

const comment = {
    async createComment(username, movieId, 
            isRecommended, commentContent, isSpoiled) {
        let res = {};
        let commentId;
        
        try {
            commentId = await commentModel
                    .createComment(username, movieId, 
                        isRecommended, commentContent, isSpoiled);
            res.status = 'OK';
            res.message = 'Comment created!';
            res.data = {
                'comment_id': commentId,
                'username': username,
                'movie_id': movieId,
                'is_recommended': isRecommended,
                'comment_content': commentContent,
                'is_spoiled': isSpoiled
            };
        } catch(err) {
            if (err.code === 'ER_DUP_ENTRY') {
                res.status = 'CONFLICT';
                res.message = 'You have made a comment.';
                res.data = {};
            } else if (err.code.indexOf('ER_NO_REFERENCED') !== -1) {
                res.status = 'BAD_REQUEST';
                res.message = 'Movie is not exists.';
                res.data = {};
            } else {
                res.status = 'UNKNOWN_ERROR';
                res.message = 'Something wrong.';
                res.data = {};
            }
        }

        return res;
    },

    async deleteComment(username, movieId) {
        let res = {};

        await commentModel.deleteComment(username, movieId);

        res.status = 'OK';
        res.message = 'Delete this comment successfully.';
        res.data = {};

        return res;
    },

    async searchAllCommentsByMovieId(movieId) {
        let res = {};

        let comments = await commentModel
                .searchAllCommentsByMovieId(movieId);
        if (comments.length > 0) {
            res.status = 'OK';
            res.message = 'All comments.';
            res.data = comments;
        } else {
            res.status = 'NOT_FOUND';
            res.message = 'Cannot find any comment.';
            res.data = {};
        }

        return res;
    },

    async searchUnspoiledCommentsByMovieId(movieId) {
        let res = {};

        let comments = await commentModel
                .searchUnspoiledCommentsByMovieId(movieId);
        if (comments.length > 0) {
            res.status = 'OK';
            res.message = 'Unspoiled comments.';
            res.data = comments;
        } else {
            res.status = 'NOT_FOUND';
            res.message = 'Cannot find any comment.';
            res.data = {};
        }

        return res;
    },

    async getAllCommentsNumByMovieId(movieId) {
        let res = {};

        let num = await commentModel
                .getAllCommentsNumByMovieId(movieId);
        
        res.status = 'OK';
        res.message = 'Amount of comments.';
        res.data = {
            'amount': num
        };

        return res;
    },

    async getUnspoiledCommentsNumByMovieId(movieId) {
        let res = {};
        
        let num = await commentModel
                .getUnspoiledCommentsNumByMovieId(movieId);
        
        res.status = 'OK';
        res.message = 'Amount of unspoiled comments.';
        res.data = {
            'amount': num
        };

        return res;
    },

    async searchAllCommentsByMovieIdPage(movieId, pageId, pageNum) {
        pageId = parseInt(pageId);
        pageNum = parseInt(pageNum);
        let recordsStart = (pageId - 1) * pageNum;
        let res = {};

        let comments = await commentModel
                .searchAllCommentsByMovieIdPage(movieId, recordsStart, pageNum);
        
        if (comments.length > 0) {
            res.status = 'OK';
            res.message = 'All comments.';
            res.data = comments;
        } else {
            res.status = 'NOT_FOUND';
            res.message = 'Cannot find any comment.';
            res.data = {};
        }

        return res;
    },

    async searchUnspoiledCommentsByMovieIdPage(movieId, pageId, pageNum) {
        pageId = parseInt(pageId);
        pageNum = parseInt(pageNum);
        let recordsStart = (pageId - 1) * pageNum;
        let res = {};

        let comments = await commentModel
                .searchUnspoiledCommentsByMovieIdPage(movieId, recordsStart, pageNum);

        if (comments.length > 0) {
            res.status = 'OK';
            res.message = 'Unspoiled comments.';
            res.data = comments;
        } else {
            res.status = 'NOT_FOUND';
            res.message = 'Cannot find any comment.';
            res.data = {};
        }

        return res;
    },

    async searchCommentsByUser(username) {
        let res = {};
        let comments = await commentModel.searchCommentsByUser(username);

        if (comments.length > 0) {
            res.status = 'OK';
            res.message = 'Get user comments.';
            res.data = comments;
        } else {
            res.status = 'NOT_FOUND';
            res.message = 'Cannot find any comment.';
            res.data = {};
        }

        return res;
    },

    async getCommentsNumByUser(username) {
        let res = {};

        let num = await commentModel
                .getCommentsNumByUser(username);
        
        res.status = 'OK';
        res.message = 'Amount of comments.';
        res.data = {
            'amount': num
        };

        return res;
    },

    async searchCommentsByUserPage(username, pageId, pageNum) {
        pageId = parseInt(pageId);
        pageNum = parseInt(pageNum);
        let recordsStart = (pageId - 1) * pageNum;
        let res = {};

        let comments = await commentModel
                .searchCommentsByUserPage(username, recordsStart, pageNum);

        if (comments.length > 0) {
            res.status = 'OK';
            res.message = 'Get user comments.';
            res.data = comments;
        } else {
            res.status = 'NOT_FOUND';
            res.message = 'Cannot find any comment.';
            res.data = {};
        }

        return res;
    }
};

module.exports = comment;