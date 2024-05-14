const express = require('express');
const authController = require('../controllers/authController');
const authRoutes = express.Router();

authRoutes.post('/signup', authController.signup_post);
authRoutes.post('/login', authController.login_post);
authRoutes.get('/logout', authController.logout_get);
authRoutes.put('/reset', authController.password_reset);
authRoutes.get('/getLearner', authController.get_all_learner);
authRoutes.get('/getInstructor', authController.get_all_instructor);

module.exports = authRoutes;