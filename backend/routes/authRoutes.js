const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const zoomService = require('../services/zoomService');

// Zoom OAuth routes
router.get('/login', (req, res) => {
    const zoomAuthUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${zoomService.CLIENT_ID}&redirect_uri=${zoomService.REDIRECT_URI}`;
    res.redirect(zoomAuthUrl);
});

router.get('/callback', authController.handleZoomCallback);

// OTP routes were moved to appointmentRoutes.js

module.exports = router;
