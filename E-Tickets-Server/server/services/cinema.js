const cinemaModel = require('../models/cinema');

const cinema = {
    async createCinema(ownerUsername, cinemaName, cinemaLoc) {
        let res = {};

        try {
            let cinemaId = await cinemaModel
                    .createCinema(ownerUsername, cinemaName, cinemaLoc);

            res.status = 'OK';
            res.message = 'Create cinema successfully.';
            res.data = {
                'cinema_id': cinemaId,
                'owner': ownerUsername,
                'cinema_name': cinemaName,
                'cinema_location': cinemaLoc
            };
        } catch(err) {
            res.status = 'INTERNAL_ERROR';
            res.message = 'Cannot create this cinema.';
            res.data = {};
        }

        return res;
    },

    async createMovieHall(ownerUsername, cinemaId, hallId, sizeId, size) {
        let res = {};
        let cinemasInfo = await cinemaModel.getCinemaInfo(cinemaId);
        if (cinemasInfo.length > 0) {
            if (cinemasInfo[0].owner === ownerUsername) {
                try {
                    await cinemaModel.cearteMovieHall(cinemaId, hallId, sizeId, size);
                    res.status = 'OK';
                    res.message = 'Create movie hall successfully.';
                    res.data = {
                        'cinema_id': cinemaId,
                        'hall_id': hallId,
                        'size_id': sizeId,
                        'size': size
                    };
                } catch(err) {
                    res.status = 'INTERNAL_ERROR';
                    res.message = 'Cannot create this movie hall.';
                    res.data = {};
                }
            } else {
                res.status = 'UNAUTHORIZED';
                res.message = 'Permission denied. You are not the owner of this cinema.';
                res.data = {};
            }
        } else {
            res.status = 'NOT_FOUND';
            res.message = 'Cinema does not exist.';
            res.data = {};
        }
        
        return res;
    },

    async verifyOwner(username, cinemaId) {
        let cinemasInfo = await cinemaModel.getCinemaInfo(cinemaId);

        if (cinemasInfo.length > 0 && cinemasInfo[0].owner === username) {
            return true;
        }

        return false;
    },

    async getCinemaInfo(cinemaId) {
        let cinemasInfo = await cinemaModel.getCinemaInfo(cinemaId);
        let res = {};

        if (cinemasInfo.length > 0) {
            res.status = 'OK';
            res.message = 'Cinema information.';
            res.data = cinemasInfo[0];
        } else {
            res.status = 'NOT_FOUND';
            res.message = 'Cinema does not exist.';
            res.data = {};
        }

        return res;
    },

    async getMovieHallInfo(cinemaId, hallId) {
        let hallsInfo = await cinemaModel.getMovieHallInfo(cinemaId, hallId);
        let res = {};

        if (hallsInfo.length > 0) {
            res.status = 'OK';
            res.message = 'Movie Hall information.';
            res.data = hallsInfo[0];
        } else {
            res.status = 'NOT_FOUND';
            res.message = 'Movie hall does not exist.';
            res.data = {};
        }

        return res;
    },

    async searchCinemaByOwner(ownerUsername) {
        let res = {};
        let cinemasInfo = await cinemaModel
                .searchCinemaInfoByOwner(ownerUsername);

        if (cinemasInfo.length > 0) {
            res.status = 'OK';
            res.message = 'Cinema search by owner.'
            res.data = cinemasInfo;
        } else {
            res.status = 'NOT_FOUND';
            res.message = 'Cannot find any cinemas.';
            res.data = {};
        }

        return res;
    },

    async searchCinemaByLoc(location) {
        let res = {};
        let cinemasInfo = await cinemaModel
                .searchCinemaInfoByLocation(location);

        if (cinemasInfo.length > 0) {
            res.status = 'OK';
            res.message = 'Cinema search by location.'
            res.data = cinemasInfo;
        } else {
            res.status = 'NOT_FOUND';
            res.message = 'Cannot find any cinemas.';
            res.data = {};
        }

        return res;
    },

    async searchCinemaByName(cinemaName) {
        let res = {};
        let cinemasInfo = await cinemaModel.searchCinemaInfoByName(cinemaName);

        if (cinemasInfo.length > 0) {
            res.status = 'OK';
            res.message = 'Cinema search by name.'
            res.data = cinemasInfo;
        } else {
            res.status = 'NOT_FOUND';
            res.message = 'Cannot find any cinemas.';
            res.data = {};
        }

        return res;
    },

    async searchMovieHallByCinemaId(cinemaId) {
        let res = {};
        let hallsInfo = await cinemaModel.searchMovieHallByCinemaId(cinemaId);

        if (hallsInfo.length > 0) {
            res.status = 'OK';
            res.message = 'Moviehall search by cinema_id.'
            res.data = hallsInfo;
        } else {
            res.status = 'NOT_FOUND';
            res.message = 'Cannot find any movie halls.';
            res.data = {};
        }

        return res;
    }
};

module.exports = cinema;