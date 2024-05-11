const express = require('express');
const schedulingController = require('../controllers/schedulingController');
const { requireAuth } = require('../controllers/schedulingController')
const schedule = express.Router();

schedule.post('/create',requireAuth,schedulingController.createSchedule);
schedule.get('/get/:email',requireAuth,schedulingController.getSchedule);
schedule.put('/update',requireAuth,schedulingController.updateSchedule);
schedule.delete('/delete/:email',requireAuth,schedulingController.deleteSchedule);

module.exports = schedule; 

