const router = require('koa-router')();

const scheduleController = require('../controllers/schedule');

router.get('/cinemaid/:cinema_id', 
        scheduleController.searchScheduleByCinemaId);

router.get('/movieid/:movie_id', 
        scheduleController.searchScheduleByMovieId);

router.get('/movieid/:movie_id/cinemaid/:cinema_id',
        scheduleController.searchScheduleByMovieIdCinemaId);

router.get('/movieid/:movie_id/location/:location',
        scheduleController.searchScheduleByMovieIdLocation);

module.exports = router;