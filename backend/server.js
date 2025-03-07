const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');
const { Pool } = require('pg');
const nodemailer = require('nodemailer');
const { DateTime } = require('luxon'); // Install with: npm install luxon
const compression = require('compression');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(compression({
  level: 6,
  threshold: 0,
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// **Generate OTP & Send Email**
const otpStore = {};

app.post('/api/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[email] = otp;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP is ${otp}. It expires in 5 minutes.`,
  });

  res.json({ success: true, message: 'OTP sent' });
});

app.post('/api/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  if (otpStore[email] == otp) {
    delete otpStore[email];
    res.json({ success: true, message: 'OTP verified' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid OTP' });
  }
});

// **Create Zoom Meeting**
app.post('/api/book-appointment', async (req, res) => {
  try {
    const { name, email, phone, address, service, start_time } = req.body;
    if (!start_time) return res.status(400).json({ message: 'Start time required' });

    const accessToken = process.env.ZOOM_ACCESS_TOKEN;
    const meetingDetails = {
      topic: service,
      type: 2,
      start_time,
      duration: 60,
      timezone: 'UTC',
      settings: { host_video: true, participant_video: true, join_before_host: false },
    };

    const response = await axios.post(
      'https://api.zoom.us/v2/users/me/meetings',
      meetingDetails,
      { headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' } }
    );

    const appointment = response.data;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Appointment Confirmation',
      text: `Your meeting is scheduled for ${start_time}. Join here: ${appointment.join_url}`,
    });

    res.json({ success: true, appointment });
  } catch (error) {
    console.error('Booking failed:', error);
    res.status(500).json({ success: false, message: 'Booking failed' });
  }
});


// Get available slots for a date
app.get('/api/available-slots', async (req, res) => {
    const { date } = req.query;
  
    try {
      const result = await pool.query(
        'SELECT time FROM meeting_slots WHERE date = $1 AND is_booked = false and date >= $2',
        [date, DateTime.now().toISODate()]
      );

      console.log(result.rows);
  
      res.json({ success: true, slots: result.rows.map(row => row.time) });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });

  app.get('/api/available-dates', async (req, res) => {
    try {
      const result = await pool.query(
        'SELECT DISTINCT date FROM meeting_slots WHERE is_booked = false and date >= $1',
        [DateTime.now().toISODate()]
      );
  
      const availableDates = result.rows.map(row => row.date.toISOString().split('T')[0]); // Format YYYY-MM-DD
  


      res.json({ success: true, dates: availableDates });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });





app.listen(5000, () => console.log('Server running on port 5000'));
