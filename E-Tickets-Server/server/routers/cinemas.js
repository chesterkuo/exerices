const router = require('koa-router')();

const cinemaController = require('../controllers/cinema');

router.get('/owner/:owner', 
        cinemaController.searchCinemaByOwner);

router.get('/location/:location', 
        cinemaController.searchCinemaByLoc);

router.get('/cinema-name/:cinema_name', 
        cinemaController.searchCinemaByName);

module.exports = router;