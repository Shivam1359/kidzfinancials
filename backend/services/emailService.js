const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

// Create reusable transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { 
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS 
  },
});

// Send OTP email
async function sendOtpEmail(email, otp) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP is ${otp}. It expires in 5 minutes.`,
  });
}

// Send appointment confirmation email
async function sendAppointmentEmail(email, name, meetingDetails) {
  const emailSubject = 'Your Appointment Confirmation - KidzFinancials';
  
  // Use the selected slot information if available, otherwise fall back to Zoom's start_time
  let formattedDate, formattedTime;
  let timezoneInfo = '';
  
  if (meetingDetails.selectedSlot && meetingDetails.selectedSlot.date && meetingDetails.selectedSlot.time) {
    // Use the actual selected date from the slot
    const dateObj = new Date(meetingDetails.selectedSlot.date);
    formattedDate = dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Use the exact selected time from the slot
    formattedTime = meetingDetails.selectedSlot.time;
    
    // Add timezone information if available
    if (meetingDetails.clientTimezone) {
      timezoneInfo = ` (${meetingDetails.clientTimezone})`;
    }
    
    console.log(`📧 Using selected slot for email: ${formattedDate} at ${formattedTime}${timezoneInfo}`);
  } else {
    // Fall back to Zoom API response time
    const zoomDateTime = new Date(meetingDetails.start_time);
    formattedDate = zoomDateTime.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    formattedTime = zoomDateTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    
    console.log(`📧 Using Zoom start_time for email: ${formattedDate} at ${formattedTime}`);
  }
  
  const emailText = `
Dear ${name || 'Valued Client'},

Thank you for scheduling an appointment with KidzFinancials. We're looking forward to meeting with you.

APPOINTMENT DETAILS:
------------------------------------------
Date: ${formattedDate}
Time: ${formattedTime}${timezoneInfo}
Duration: ${meetingDetails.duration} minutes
Topic: ${meetingDetails.topic}
------------------------------------------

JOIN MEETING:
${meetingDetails.join_url}

PREPARATION:
Please ensure you have a stable internet connection and your camera and microphone are working properly before the meeting. If you need to reschedule, please contact us at least 24 hours in advance.

If you have any questions or need assistance, please reply to this email or call us at ${process.env.COMPANY_PHONE || '(555) 123-4567'}.

Best regards,

KidzFinancials Team
${process.env.COMPANY_EMAIL || 'support@kidzfinancials.com'}
${process.env.COMPANY_WEBSITE || 'www.kidzfinancials.com'}
  `;

  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #4285f4; padding: 20px; color: white; text-align: center; }
    .content { padding: 20px; background-color: #f9f9f9; }
    .meeting-details { background-color: #ffffff; padding: 15px; margin: 20px 0; border-left: 4px solid #4285f4; }
    .cta-button { display: inline-block; background-color: #4285f4; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; margin: 20px 0; }
    .footer { text-align: center; padding-top: 20px; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Appointment Confirmation</h1>
    </div>
    <div class="content">
      <p>Dear ${name || 'Valued Client'},</p>
      <p>Thank you for scheduling an appointment with KidzFinancials. We're looking forward to meeting with you.</p>
      
      <div class="meeting-details">
        <h3>APPOINTMENT DETAILS</h3>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Time:</strong> ${formattedTime}${timezoneInfo}</p>
        <p><strong>Duration:</strong> ${meetingDetails.duration} minutes</p>
        <p><strong>Topic:</strong> ${meetingDetails.topic}</p>
      </div>
      
      <p><strong>JOIN MEETING:</strong></p>
      <a href="${meetingDetails.join_url}" class="cta-button">Join Zoom Meeting</a>
      
      <p><strong>PREPARATION:</strong></p>
      <p>Please ensure you have a stable internet connection and your camera and microphone are working properly before the meeting. If you need to reschedule, please contact us at least 24 hours in advance.</p>
      
      <p>If you have any questions or need assistance, please reply to this email or call us at ${process.env.COMPANY_PHONE || '(555) 123-4567'}.</p>
    </div>
    <div class="footer">
      <p>Best regards,</p>
      <p><strong>KidzFinancials Team</strong></p>
      <p>${process.env.COMPANY_EMAIL || 'support@kidzfinancials.com'} | ${process.env.COMPANY_WEBSITE || 'www.kidzfinancials.com'}</p>
    </div>
  </div>
</body>
</html>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: emailSubject,
    text: emailText,
    html: emailHtml
  });
}

module.exports = {
  sendOtpEmail,
  sendAppointmentEmail
};
