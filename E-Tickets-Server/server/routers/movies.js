const router = require('koa-router')();

const movieController = require('../controllers/movie');

router.get('/title/:title', movieController.searchMoviesByTitle);
router.get('/director/:director', movieController.searchMoviesByDirector);
router.get('/actor/:actor', movieController.searchMoviesByActor);
router.get('/tag/:tag', movieController.searchMoviesByTag);
router.get('/status/:status', movieController.searchMoviesByStatus);
router.get('/page/:page/page_size/:page_size', movieController.getAllMovies);
router.get('/:key', movieController.searchMovies);

module.exports = router;