const express = require('express');
const feedbackController = require('../controllers/feedbackController');
const { requireAuth } = require('../controllers/feedbackController');
const feedback = express.Router();

feedback.post('/create', requireAuth, feedbackController.createFeedback);
feedback.get('/getAll', requireAuth, feedbackController.getAllFeedbacks);
feedback.put('/update/:feedbackID', requireAuth, feedbackController.updateFeedback);
feedback.delete('/delete/:feedbackID', requireAuth, feedbackController.deleteFeedback);
feedback.get('/get', requireAuth, feedbackController.getFeedbackByLearner);

module.exports = feedback; 