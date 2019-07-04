const scheduleService = require('../services/schedule');
const cinemaService = require('../services/cinema');
const httpStatus = require('../utils/res_status_utils');

const schedule = {
    async createSchedule(ctx) {
        let ownerUsername = ctx.request.body.username || '';
        let cinemaId = ctx.request.body.cinema_id;
        let hallId = ctx.request.body.hall_id;
        let movieId = ctx.request.body.movie_id;
        let timeStr = ctx.request.body.time || '';
        let price = ctx.request.body.price;

        let verifyInfo = cinemaService.verifyOwner(ownerUsername, cinemaId);

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
            let res = await scheduleService.createSchedule(cinemaId, 
                    hallId, timeStr, movieId, price);

            let httpStatusCode = httpStatus[res.status];
            ctx.response.status = httpStatusCode;
            ctx.response.body = res;
        }
    },

    async getScheduleInfo(ctx) {
        let scheduleId = ctx.params.schedule_id;

        let res = await scheduleService.getScheduleInfo(scheduleId);

        let httpStatusCode = httpStatus[res.status];
        ctx.response.status = httpStatusCode;
        ctx.response.body = res;    
    },

    async searchScheduleByCinemaId(ctx) {
        let cinemaId = ctx.params.cinema_id;

        let res = await scheduleService.searchScheduleByCinemaId(cinemaId);

        let httpStatusCode = httpStatus[res.status];
        ctx.response.status = httpStatusCode;
        ctx.response.body = res;
    },

    async searchScheduleByMovieId(ctx) {
        let movieId = ctx.params.movie_id;

        let res = await scheduleService.searchScheduleByMovieId(movieId);

        let httpStatusCode = httpStatus[res.status];
        ctx.response.status = httpStatusCode;
        ctx.response.body = res;
    },

    async searchScheduleByMovieIdCinemaId(ctx) {
        let movieId = ctx.params.movie_id;
        let cinemaId = ctx.params.cinema_id;

        let res = await scheduleService.searchScheduleByMovieIdCinemaId(movieId, cinemaId);

        let httpStatusCode = httpStatus[res.status];
        ctx.response.status = httpStatusCode;
        ctx.response.body = res;
    },

    async searchScheduleByMovieIdLocation(ctx) {
        let movieId = ctx.params.movie_id;
        let location = ctx.params.location;

        let res = await scheduleService
                .searchScheduleByMovieIdLocation(movieId, location);

        let httpStatusCode = httpStatus[res.status];
        ctx.response.status = httpStatusCode;
        ctx.response.body = res;
    },

    async deleteScheduleById(ctx) {
        let scheduleId = ctx.params.schedule_id;
        let ownerUsername = ctx.request.body.username;
        let cinemaId = ctx.request.body.cinema_id;

        let verifyInfo = await scheduleService
                .verifyScheduleOwner(ownerUsername, cinemaId, scheduleId);

        if (!ctx.session.hasOwnProperty('idInfo')
            || ctx.session.idInfo.identity !== 'cinema_owner'
            || ctx.session.idInfo.username !== ownerUsername
            || !verifyInfo) {
            ctx.response.status = 401;
            ctx.response.body = {
                'status': 'UNAUTHORIZED',
                'message': 'Permission denied. You are not the owner of this schedule.',
                'data': {}
            };
        } else {
            let res = await scheduleService.deleteScheduleById(scheduleId);
            let httpStatusCode = httpStatus[res.status];
            ctx.response.status = httpStatusCode;
            ctx.response.body = res;
        }
    }
};

module.exports = schedule;