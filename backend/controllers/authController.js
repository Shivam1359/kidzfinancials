const { sendOtpEmail } = require('../services/emailService');
const zoomService = require('../services/zoomService');
const pool = require('../config/db');
const axios = require('axios');

// Store for OTPs
const otpStore = {};

// Handle Zoom OAuth callback
const handleZoomCallback = async (req, res) => {
    const authCode = req.query.code;
    if (!authCode) return res.status(400).json({ error: 'Authorization code missing' });

    try {
        const response = await axios.post('https://zoom.us/oauth/token', null, {
            params: {
                grant_type: 'authorization_code',
                code: authCode,
                redirect_uri: zoomService.REDIRECT_URI,
            },
            headers: {
                Authorization: `Basic ${Buffer.from(`${zoomService.CLIENT_ID}:${zoomService.CLIENT_SECRET}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const { access_token, refresh_token } = response.data;

        // Store Tokens in Database
        await pool.query(
            `INSERT INTO zoom_tokens (id, access_token, refresh_token) 
             VALUES (1, $1, $2) 
             ON CONFLICT (id) 
             DO UPDATE SET access_token = $1, refresh_token = $2`,
            [access_token, refresh_token]
        );

        res.send('Authentication successful! You can now book Zoom meetings.');
    } catch (error) {
        console.error('Error getting access token:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to authenticate with Zoom' });
    }
};

// Send OTP
const sendOtp = async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[email] = otp;

    try {
        await sendOtpEmail(email, otp);
        res.json({ success: true, message: 'OTP sent' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ success: false, message: 'Failed to send OTP' });
    }
};

// Verify OTP
const verifyOtp = (req, res) => {
    const { email, otp } = req.body;
    if (otpStore[email] == otp) {
        delete otpStore[email];
        res.json({ success: true, message: 'OTP verified' });
    } else {
        res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
};

module.exports = {
    handleZoomCallback,
    sendOtp,
    verifyOtp,
};
