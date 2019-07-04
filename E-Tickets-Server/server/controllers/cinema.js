const cinemaService = require('../services/cinema');
const httpStatus = require('../utils/res_status_utils');

const cinema = {
    async createCinema(ctx) {
        let ownerUsername = ctx.request.body.username || '';
        let cinemaName = ctx.request.body.cinema_name || '';
        let cinemaLoc = ctx.request.body.cinema_location || '';

        if (!ctx.session.hasOwnProperty('idInfo')
            || ctx.session.idInfo.identity !== 'cinema_owner'
            || ctx.session.idInfo.username !== ownerUsername) {
            ctx.response.status = 401;
            ctx.response.body = {
                'status': 'UNAUTHORIZED',
                'message': 'Permission denied. You are not a cinema owner.',
                'data': {}
            };
        } else {
            let res = await cinemaService
                    .createCinema(ownerUsername, cinemaName, cinemaLoc);
            
            let httpStatusCode = httpStatus[res.status];
            ctx.response.status = httpStatusCode;
            ctx.response.body = res;
        }
    },

    async createMovieHall(ctx) {
        let ownerUsername = ctx.request.body.username || '';
        let cinemaId = ctx.request.body.cinema_id;
        let hallId = ctx.request.body.hall_id;
        let sizeId = ctx.request.body.size_id;
        let size = ctx.request.body.size;

        let verifyInfo = await cinemaService.verifyOwner(ownerUsername, cinemaId);

        if (!ctx.session.hasOwnProperty('idInfo')
            || ctx.session.idInfo.identity !== 'cinema_owner'
            || ctx.session.idInfo.username !== ownerUsername
            || !verifyInfo) {
            ctx.response.status = 401;
            ctx.response.body = {
                'status': 'UNAUTHORIZED',
                'message': 'Permission denied. You are not the owner of this cinema.',
                'data': {}
            };
        } else {
            let res = await cinemaService
                    .createMovieHall(ownerUsername, cinemaId, hallId, sizeId, size);

            let httpStatusCode = httpStatus[res.status];
            ctx.response.status = httpStatusCode;
            ctx.response.body = res;
        }
    },

    async getCinemaInfo(ctx) {
        let cinemaId = ctx.params.cinema_id;

        let res = await cinemaService.getCinemaInfo(cinemaId);

        let httpStatusCode = httpStatus[res.status];
        ctx.response.status = httpStatusCode;
        ctx.response.body = res;
    },

    async getMovieHallInfo(ctx) {
        let cinemaId = ctx.params.cinema_id;
        let hallId = ctx.params.hall_id;

        let res = await cinemaService.getMovieHallInfo(cinemaId, hallId);

        let httpStatusCode = httpStatus[res.status];
        ctx.response.status = httpStatusCode;
        ctx.response.body = res;
    },

    async searchCinemaByOwner(ctx) {
        let ownerUsername = ctx.params.owner;

        let res = await cinemaService.searchCinemaByOwner(ownerUsername);

        let httpStatusCode = httpStatus[res.status];
        ctx.response.status = httpStatusCode;
        ctx.response.body = res;
    },

    async searchCinemaByLoc(ctx) {
        let location = ctx.params.location;

        let res = await cinemaService.searchCinemaByLoc(location);

        let httpStatusCode = httpStatus[res.status];
        ctx.response.status = httpStatusCode;
        ctx.response.body = res;
    },

    async searchCinemaByName(ctx) {
        let cinemaName = ctx.params.cinema_name;

        let res = await cinemaService.searchCinemaByName(cinemaName);

        let httpStatusCode = httpStatus[res.status];
        ctx.response.status = httpStatusCode;
        ctx.response.body = res;
    },

    async searchMovieHallByCinemaId(ctx) {
        let cinemaId = ctx.params.cinema_id;

        let res = await cinemaService.searchMovieHallByCinemaId(cinemaId);

        let httpStatusCode = httpStatus[res.status];
        ctx.response.status = httpStatusCode;
        ctx.response.body = res;
    }
};

module.exports = cinema;