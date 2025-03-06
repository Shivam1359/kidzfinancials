const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const authController = require('../controllers/authController');

// OTP routes - moved here from authRoutes.js
router.post('/send-otp', authController.sendOtp);
router.post('/verify-otp', authController.verifyOtp);

// Appointment routes
router.post('/book-appointment', appointmentController.bookAppointment);
router.get('/available-slots', appointmentController.getAvailableSlots);
router.get('/available-dates', appointmentController.getAvailableDates);

module.exports = router;
