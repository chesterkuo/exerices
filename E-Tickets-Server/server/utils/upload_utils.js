const multer = require('koa-multer');

const config = require('../config');

const storageEngine = {
    avatarEngine: multer.diskStorage({
        destination: config.path.avatarPath,
        filename: (req, file, cb) => {
            const originalname = file.originalname;
    
            let pointIndex = originalname.lastIndexOf('.');
    
            let filename = originalname.substr(0, pointIndex);
            let format = originalname.substr(pointIndex + 1);
    
            cb(null, filename + '-' + Date.now().toString() + '.' + format);
        }
    }),

    posterEngine: multer.diskStorage({
        destination: config.path.posterPath,
        filename: (req, file, cb) => {
            const originalname = file.originalname;
    
            let pointIndex = originalname.lastIndexOf('.');
    
            let filename = originalname.substr(0, pointIndex);
            let format = originalname.substr(pointIndex + 1);
    
            cb(null, filename + '-' + Date.now().toString() + '.' + format);
        }
    }),
};

module.exports = storageEngine;