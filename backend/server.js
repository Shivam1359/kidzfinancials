// const express = require('express');
// const axios = require('axios');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const { Pool } = require('pg'); // PostgreSQL for storing tokens
// const nodemailer = require('nodemailer');
// var nodeoutlook = require('nodejs-nodemailer-outlook')


// dotenv.config();
// const app = express();
// app.use(express.json());
// app.use(cors());

// const PORT = process.env.PORT || 5000;
// const CLIENT_ID = process.env.ZOOM_CLIENT_ID;
// const CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET;
// const REDIRECT_URI = process.env.ZOOM_REDIRECT_URI;

// // **PostgreSQL Database Connection**
// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
// });

// // **1️⃣ Redirect User to Zoom OAuth Login**
// app.get('/auth/login', (req, res) => {
//     const zoomAuthUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
//     res.redirect(zoomAuthUrl);
// });

// // **2️⃣ Handle OAuth Callback & Store Token in Database**
// app.get('/auth/callback', async (req, res) => {
//     const authCode = req.query.code;
//     if (!authCode) return res.status(400).json({ error: 'Authorization code missing' });

//     try {
//         const response = await axios.post('https://zoom.us/oauth/token', null, {
//             params: {
//                 grant_type: 'authorization_code',
//                 code: authCode,
//                 redirect_uri: REDIRECT_URI,
//             },
//             headers: {
//                 Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
//                 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//         });

//         const { access_token, refresh_token } = response.data;

//         // Store Tokens in Database
//         await pool.query(
//             `INSERT INTO zoom_tokens (id, access_token, refresh_token) 
//              VALUES (1, $1, $2) 
//              ON CONFLICT (id) 
//              DO UPDATE SET access_token = $1, refresh_token = $2`,
//             [access_token, refresh_token]
//         );

//         res.send('Authentication successful! You can now book Zoom meetings.');
//     } catch (error) {
//         console.error('Error getting access token:', error.response?.data || error.message);
//         res.status(500).json({ error: 'Failed to authenticate with Zoom' });
//     }
// });

// // **3️⃣ Get Latest Zoom Access Token from Database**
// async function getZoomAccessToken() {
//     const result = await pool.query('SELECT access_token, refresh_token FROM zoom_tokens WHERE id = 1');
//     return result.rows[0];
// }

// // **4️⃣ Refresh Zoom Token if Expired**
// async function refreshZoomToken() {
//     const tokens = await getZoomAccessToken();
//     if (!tokens) throw new Error('No Zoom tokens found. Please authenticate first.');

//     try {
//         const response = await axios.post('https://zoom.us/oauth/token', null, {
//             params: {
//                 grant_type: 'refresh_token',
//                 refresh_token: tokens.refresh_token,
//             },
//             headers: {
//                 Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
//                 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//         });

//         const { access_token, refresh_token } = response.data;

//         await pool.query(
//             'UPDATE zoom_tokens SET access_token = $1, refresh_token = $2 WHERE id = 1',
//             [access_token, refresh_token]
//         );

//         return access_token;
//     } catch (error) {
//         console.error('Error refreshing Zoom token:', error.response?.data || error.message);
//         throw new Error('Failed to refresh Zoom token');
//     }
// }

// // **5️⃣ Create a Zoom Meeting**
// // Update the createZoomMeeting function with better error handling
// async function createZoomMeeting() {
//     console.log('⏳ Starting Zoom meeting creation...');
//     try {
//         let tokens = await getZoomAccessToken();
//         if (!tokens) {
//             console.error('❌ No tokens found in database');
//             throw new Error('Unauthorized. Please authenticate with Zoom first.');
//         }

//         console.log('📋 Token status:', { 
//             hasAccessToken: !!tokens.access_token,
//             hasRefreshToken: !!tokens.refresh_token 
//         });

//         let accessToken = tokens.access_token;
        
//         const meetingDetails = {
//             topic: 'Scheduled Meeting',
//             type: 2,
//             start_time: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
//             duration: 30,
//             timezone: 'UTC',
//             settings: { host_video: true, participant_video: true, join_before_host: false },
//         };
//         console.log('📝 Meeting details:', JSON.stringify(meetingDetails, null, 2));

//         const response = await axios.post('https://api.zoom.us/v2/users/me/meetings', 
//             meetingDetails,
//             {
//                 headers: { 
//                     Authorization: `Bearer ${accessToken}`, 
//                     'Content-Type': 'application/json' 
//                 },
//             }
//         ).catch(err => {
//             console.error('❌ Zoom API request failed:', {
//                 status: err.response?.status,
//                 statusText: err.response?.statusText,
//                 data: err.response?.data,
//                 error: err.message
//             });
//             throw err;
//         });

//         console.log('✅ Zoom API response:', {
//             status: response.status,
//             meetingId: response.data?.id,
//             joinUrl: response.data?.join_url
//         });

//         return response.data;

//     } catch (error) {
//         if (error.response?.status === 401) {
//             console.log('🔄 Token expired, attempting refresh...');
//             try {
//                 const newAccessToken = await refreshZoomToken();
//                 console.log('✅ Token refresh successful');
//                 return createZoomMeeting(); // Retry with new token
//             } catch (refreshError) {
//                 console.error('❌ Token refresh failed:', refreshError.message);
//                 throw new Error('Failed to refresh authentication token');
//             }
//         }
        
//         console.error('❌ Meeting creation failed:', {
//             message: error.message,
//             response: error.response?.data,
//             stack: error.stack
//         });
        
//         throw new Error(`Failed to create Zoom meeting: ${error.message}`);
//     }
// }

// // **6️⃣ API to Schedule a Meeting**
// // Update the appointment booking endpoint with better error handling
// app.post('/api/book-appointment', async (req, res) => {
//     console.log('⏳ Starting appointment booking process...');
//     try {
//         const { email } = req.body;
//         if (!email) {
//             console.error('❌ Missing email in request body');
//             return res.status(400).json({ error: 'Email is required' });
//         }

//         console.log(`📧 Processing booking for: ${email}`);
        
//         const appointment = await createZoomMeeting();
        
//         if (!appointment || !appointment.join_url) {
//             console.error('❌ Invalid meeting data received');
//             return res.status(500).json({ error: 'Invalid meeting data' });
//         }

//         const emailSubject = 'Appointment Confirmation';
//         const emailText = `Hi there! Your appointment has been booked successfully. Join the meeting here: ${appointment.join_url}`;

//         await sendEmail('bansalshivam2016@gmail.com', emailSubject, emailText);
//         await sendEmail(email, emailSubject, emailText);

//         console.log('✅ Meeting created:', {
//             id: appointment.id,
//             startTime: appointment.start_time,
//             joinUrl: appointment.join_url
//         });

//         res.json({
//             success: true,
//             appointment,
//             message: 'Meeting scheduled successfully'
//         });

//     } catch (error) {
//         console.error('❌ Appointment booking failed:', {
//             error: error.message,
//             stack: error.stack,
//             zoomError: error.response?.data
//         });

//         res.status(500).json({
//             success: false,
//             message: 'Failed to schedule meeting',
//             error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
//         });
//     }
// });



// async function sendEmail(recipient, subject, text) {
//     let transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });
  
//     const mailOptions = { from: process.env.EMAIL_USER, to: recipient, subject, text };
  
//     try {
//       let info = await transporter.sendMail(mailOptions);
//       console.log(`Email sent to ${recipient}: ${info.response}`);
//     } catch (error) {
//       console.error(`Error sending email:`, error);
//     }
//   }



// // **7️⃣ Start Server**
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');
const { Pool } = require('pg');
const nodemailer = require('nodemailer');
const { DateTime } = require('luxon'); // Install with: npm install luxon

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

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
