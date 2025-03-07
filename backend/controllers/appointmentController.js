const { createZoomMeeting } = require('../services/zoomService');
const { sendAppointmentEmail } = require('../services/emailService');
const pool = require('../config/db');
const { DateTime } = require('luxon');

// Book a new appointment
const bookAppointment = async (req, res) => {
    console.log('⏳ Starting appointment booking process...');
    console.log('📦 Request body received:', JSON.stringify(req.body, null, 2));
    
    try {
        const { name, email, phone, address, service, date, time, userTimezone, start_time, selectedDateTime } = req.body;
        
        // Check required fields
        if (!email) {
            console.error('❌ Missing email in request body');
            return res.status(400).json({ error: 'Email is required' });
        }

        let meetingDateTime;
        let originalSlot = { date: null, time: null };
        
        // Handle different ways the date/time could be provided
        if (selectedDateTime && selectedDateTime.date && selectedDateTime.time) {
            // Use the selectedDateTime object if provided
            originalSlot = { 
                date: selectedDateTime.date, 
                time: selectedDateTime.time 
            };
            console.log(`📧 Processing booking from selectedDateTime: ${originalSlot.date} ${originalSlot.time}`);
        } else if (date && time) {
            // Otherwise use separate date and time if provided
            originalSlot = { date, time };
            console.log(`📧 Processing booking for: ${email} at ${date} ${time}`);
        } else if (start_time) {
            // Fallback to start_time if that's all that's provided
            console.log(`📧 Processing booking with only start_time: ${start_time}`);
            // For backward compatibility, but we won't have slot details for the email
        } else {
            console.error('❌ Missing date/time information in request body');
            return res.status(400).json({ 
                error: 'Date and time information is required',
                received: { 
                    hasDate: !!date, 
                    hasTime: !!time,
                    hasStartTime: !!start_time,
                    hasSelectedDateTime: !!selectedDateTime,
                    body: req.body
                }
            });
        }
        
        // Convert to proper ISO datetime for Zoom API
        try {
            if (originalSlot.date && originalSlot.time) {
                // Parse time format
                if (originalSlot.time.includes('AM') || originalSlot.time.includes('PM')) {
                    // Format: "10:00 AM"
                    const [timePart, period] = originalSlot.time.split(' ');
                    const [hours, minutes] = timePart.split(':');
                    let hour = parseInt(hours);
                    
                    // Convert 12-hour format to 24-hour format
                    if (period === 'PM' && hour !== 12) hour += 12;
                    if (period === 'AM' && hour === 12) hour = 0;
                    
                    meetingDateTime = `${originalSlot.date}T${hour.toString().padStart(2, '0')}:${minutes}:00.000Z`;
                } else {
                    // Format: "14:30"
                    const [hours, minutes] = originalSlot.time.split(':');
                    meetingDateTime = `${originalSlot.date}T${hours}:${minutes}:00.000Z`;
                }
            } else if (start_time) {
                // Just use start_time as is if it's all we have
                meetingDateTime = start_time;
            } else {
                // Absolute fallback
                meetingDateTime = new Date(Date.now() + 15 * 60 * 1000).toISOString();
            }
        } catch (error) {
            console.error('❌ Error parsing date/time:', error);
            meetingDateTime = new Date(Date.now() + 15 * 60 * 1000).toISOString(); // Fallback
        }

        console.log(`📅 Meeting date-time: ${meetingDateTime}`);

        // Store user's timezone if provided
        const clientTimezone = userTimezone || 'UTC';
        console.log(`🌐 Client timezone: ${clientTimezone}`);
        
        // Set up meeting options with the correct start time
        const meetingOptions = {
            topic: service ? `${service} Consultation` : 'Financial Consultation',
            start_time: meetingDateTime,
            duration: 30,
            timezone: 'UTC', // Zoom API expects UTC
            settings: { 
                host_video: true, 
                participant_video: true, 
                join_before_host: false 
            }
        };
        
        // Create the Zoom meeting with the specified time
        const appointment = await createZoomMeeting(meetingOptions);
        
        if (!appointment || !appointment.join_url) {
            console.error('❌ Invalid meeting data received');
            return res.status(500).json({ error: 'Invalid meeting data' });
        }

        // Store the original selected slot details in the appointment object
        // This is crucial for the email to show the correct time
        if (originalSlot.date && originalSlot.time) {
            appointment.selectedSlot = originalSlot;
            appointment.clientTimezone = clientTimezone; // Add user's timezone
        }

        // Update the selected slot as booked in the database
        if (originalSlot.date && originalSlot.time) {
            try {
                await pool.query(
                    'UPDATE meeting_slots SET is_booked = true WHERE date = $1 AND time = $2',
                    [originalSlot.date, originalSlot.time]
                );
                console.log(`✅ Slot marked as booked: ${originalSlot.date} ${originalSlot.time}`);
            } catch (dbError) {
                console.error('⚠️ Failed to mark slot as booked:', dbError.message);
                // Continue with meeting creation even if slot update fails
            }
        }

        // Send professional email with all meeting details
        await sendAppointmentEmail(email, name, appointment);

        console.log('✅ Meeting created:', {
            id: appointment.id,
            startTime: appointment.start_time,
            joinUrl: appointment.join_url
        });

        res.json({
            success: true,
            appointment,
            message: 'Meeting scheduled successfully'
        });

    } catch (error) {
        console.error('❌ Appointment booking failed:', {
            error: error.message,
            stack: error.stack,
            zoomError: error.response?.data
        });

        res.status(500).json({
            success: false,
            message: 'Failed to schedule meeting',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
};

// Get available slots for a date
const getAvailableSlots = async (req, res) => {
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
};

// Get available dates
const getAvailableDates = async (req, res) => {
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
};

module.exports = {
    bookAppointment,
    getAvailableSlots,
    getAvailableDates
};
