const router = require('koa-router')();

const cinemaController = require('../controllers/cinema');

router.post('/', cinemaController.createCinema);

router.post('/moviehall', cinemaController.createMovieHall);

router.get('/:cinema_id', cinemaController.getCinemaInfo);

router.get('/:cinema_id/moviehalls', 
        cinemaController.searchMovieHallByCinemaId);

router.get('/:cinema_id/moviehall/:hall_id', 
        cinemaController.getMovieHallInfo);

module.exports = router;