const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// Appointment routes
router.post('/book-appointment', appointmentController.bookAppointment);
router.get('/available-slots', appointmentController.getAvailableSlots);
router.get('/available-dates', appointmentController.getAvailableDates);

module.exports = router;
