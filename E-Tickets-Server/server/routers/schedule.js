const router = require('koa-router')();

const scheduleController = require('../controllers/schedule');

router.post('/', scheduleController.createSchedule);

router.get('/:schedule_id', scheduleController.getScheduleInfo);
router.del('/:schedule_id', scheduleController.deleteScheduleById);

module.exports = router;