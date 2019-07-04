const scheduleModel = require('../models/schedule');
const cinemaService = require('./cinema');

const scheduleUtils = {
    dateToStr(date) {
        let dateArray = [];
        dateArray.push(date.getFullYear() + '');
        dateArray.push((date.getMonth() + 1) + '');
        dateArray.push(date.getDate() + '');
        dateArray.push(date.getHours() + '');
        dateArray.push(date.getMinutes() + '');
        
        dateArray = dateArray.map((str) => {
            if (str.length < 2) {
                str = '0' + str;
            }
            return str;
        });

        let dateStr = dateArray[0] + '-' + dateArray[1] + '-'
                + dateArray[2] + ' ' + dateArray[3] + ':' + dateArray[4];
        return dateStr;
    },

    getThreeDateRange(date) {
        let timeBegin, timeEnd;

        if (date) {
            timeBegin = date;
            timeBegin.setHours(0, 0, 0, 0);
            timeEnd = new Date();
            timeEnd.setHours(0, 0, 0, 0);
            timeEnd.setDate(timeEnd.getDate() + 3);        
        } else {
            timeBegin = new Date();
            timeBegin.setHours(0, 0, 0, 0);
            timeEnd = new Date();
            timeEnd.setHours(0, 0, 0, 0);
            timeEnd.setDate(timeEnd.getDate() + 3);
        }

        return {
            'begin': this.dateToStr(timeBegin),
            'end': this.dateToStr(timeEnd)
        };
    }
};

const schedule = {
    async createSchedule(cinemaId, hallId, timeStr, movieId, price) {
        let res = {};

        let scheduleId;

        try {
            scheduleId = await scheduleModel.createSchedule(cinemaId, 
                    hallId, timeStr, movieId, price);
            res.status = 'OK';
            res.message = 'Create schedule successfully.';
            res.data = {
                'schedule_id': scheduleId,
                'movie_id': movieId,
                'cinema_id': cinemaId,
                'hall_id': hallId,
                'time': timeStr,
                'price': price
            };
        } catch(err) {
            if (err.code === 'ER_TRUNCATED_WRONG_VALUE') {
                res.status = 'BAD_REQUEST';
                res.message = 'Invalid time string.';
                res.data = {};
            } else {
                res.status = 'UNKNOWN_ERROR';
                res.message = 'Something wrong.';
                res.data = {};
            }
        }
        return res;
    },

    async getScheduleInfo(scheduleId) {
        let schedulesInfo = await scheduleModel.getScheduleInfo(scheduleId);

        let res = {};

        if (schedulesInfo.length > 0) {
            res.status = 'OK';
            res.message = 'Get schedule infomation successfully.';
            res.data = schedulesInfo[0];
        } else {
            res.status = 'NOT_FOUND';
            res.message = 'Cannot find any schedules.';
            res.data = {};
        }

        return res;
    },

    async verifyScheduleOwner(ownerUsername, cinemaId, scheduleId) {
        let verifyInfo = await cinemaService.verifyOwner(ownerUsername, cinemaId);

        if (verifyInfo) {
            let schedulesInfo = await scheduleModel.getScheduleInfo(scheduleId);

            if (schedulesInfo.length > 0
                && schedulesInfo[0].cinema_id === cinemaId) {
                return true;
            }
        }

        return false;
    },

    async searchScheduleByCinemaId(cinemaId) {
        let dateRange = scheduleUtils.getThreeDateRange(null);
        // let dateRange = scheduleUtils.getThreeDateRange(new Date(2018, 6, 30));

        let schedulesInfo = await scheduleModel.searchScheduleByCinemaId(cinemaId, 
                dateRange.begin, dateRange.end);
        
        let res = {};

        if (schedulesInfo.length > 0) {
            res.status = 'OK';
            res.message = 'Get schedules successfully.';
            res.data = schedulesInfo;
        } else {
            res.status = 'NOT_FOUND';
            res.message = 'Cannot find any schedules.';
            res.data = {};
        }

        return res;
    },

    async searchScheduleByMovieId(movieId) {
        let dateRange = scheduleUtils.getThreeDateRange(null);
        // let dateRange = scheduleUtils.getThreeDateRange(new Date(2018, 6, 30));

        let schedulesInfo = await scheduleModel.searchScheduleByMovieId(movieId,
                dateRange.begin, dateRange.end);
        
        let cinemaScheudlesInfo = [];

        for (let schedule of schedulesInfo) {
            let flag = 0;
            for (let cinemaSchedule of cinemaScheudlesInfo) {
                if (schedule.cinema_id === cinemaSchedule.cinema_id) {
                    cinemaSchedule.schedules.push({
                        schedule_id: schedule.schedule_id,
                        hall_id: schedule.hall_id,
                        time: schedule.time,
                        price: schedule.price
                    });
                    flag = 1;
                    break;
                }
            }
            if (flag === 0) {
                cinemaScheudlesInfo.push({
                    cinema_id: schedule.cinema_id,
                    movie_id: schedule.movie_id,
                    cinema_name: schedule.cinema_name,
                    schedules: [{
                        schedule_id: schedule.schedule_id,
                        hall_id: schedule.hall_id,
                        time: schedule.time,
                        price: schedule.price
                    }]
                });
            }
        }

        let res = {};

        if (cinemaScheudlesInfo.length > 0) {
            res.status = 'OK';
            res.message = 'Get schedules successfully.';
            res.data = cinemaScheudlesInfo;
        } else {
            res.status = 'NOT_FOUND';
            res.message = 'Cannot find any schedules.';
            res.data = {};
        }

        return res;
    },

    async searchScheduleByMovieIdCinemaId(movieId, cinemaId) {
        let dateRange = scheduleUtils.getThreeDateRange(null);
        // let dateRange = scheduleUtils.getThreeDateRange(new Date(2018, 6, 30));

        let schedulesInfo = await scheduleModel
            .searchScheduleByMovieIdCinemaId(movieId, cinemaId, dateRange.begin, dateRange.end);
        
        let res = {};

        if (schedulesInfo.length > 0) {
            res.status = 'OK';
            res.message = 'Get schedules successfully.';
            res.data = schedulesInfo;
        } else {
            res.status = 'NOT_FOUND';
            res.message = 'Cannot find any schedules.';
            res.data = {};
        }

        return res;
    },

    async searchScheduleByMovieIdLocation(movieId, location) {
        let dateRange = scheduleUtils.getThreeDateRange(null);
        // let dateRange = scheduleUtils.getThreeDateRange(new Date(2018, 6, 30));

        let schedulesInfo = await scheduleModel
                .searchScheduleByMovieIdLocation(movieId, location, 
                        dateRange.begin, dateRange.end);

        let res = {};

        if (schedulesInfo.length > 0) {
            res.status = 'OK';
            res.message = 'Get schedules successfully.';
            res.data = schedulesInfo;
        } else {
            res.status = 'NOT_FOUND';
            res.message = 'Cannot find any schedules.';
            res.data = {};
        }

        return res;
    },

    async deleteScheduleById(scheduleId) {
        let res = {};
        try {
            await scheduleModel.deleteScheduleById(scheduleId);
            res.status = 'OK';
            res.message = 'Delete schedule successfully.';
            res.data = {};
        } catch(err) {
            res.status = 'NOT_FOUND';
            res.message = 'Cannot find any schedules.';
            res.data = {};
        }

        return res;
    }
};

module.exports = schedule;