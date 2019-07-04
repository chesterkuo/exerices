const router = require('koa-router')();

const commentController = require('../controllers/comment');

router.get('/all-comments/movieid/:movie_id', 
        commentController.searchAllCommentsByMovieId);

router.get('/all-comments/movieid/:movie_id/page/:page_id/page-amount/:page_num',
        commentController.searchAllCommentsByMovieIdPage);

router.get('/unspoiled-comments/movieid/:movie_id',
        commentController.searchUnspoiledCommentsByMovieId);

router.get('/unspoiled-comments/movieid/:movie_id/page/:page_id/page-amount/:page_num',
        commentController.searchUnspoiledCommentsByMovieIdPage);

router.get('/user/:username',
        commentController.searchCommentsByUser);

router.get('/user/:username/page/:page_id/page-amount/:page_num',
        commentController.searchCommentsByUserPage);

router.get('/all-comments/movieid/:movie_id/amount',
        commentController.getAllCommentsNumByMovieId);

router.get('/unspoiled-comments/movieid/:movie_id/amount',
        commentController.getUnspoiledCommentsNumByMovieId);

router.get('/user/:username/amount',
        commentController.getCommentsNumByUser);

module.exports = router;