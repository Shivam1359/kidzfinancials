const { createZoomMeeting } = require('../services/zoomService');
const { sendAppointmentEmail } = require('../services/emailService');
const pool = require('../config/db');
const { DateTime } = require('luxon');

// Set timezone for all DateTime operations
const TIMEZONE = 'America/Toronto';

// Book a new appointment
const bookAppointment = async (req, res) => {
    console.log('⏳ Starting appointment booking process...');
    console.log('📦 Request body received:', JSON.stringify(req.body, null, 2));
    
    try {
        const { name, email, phone, address, service, date, time, start_time, selectedDateTime } = req.body;
        
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
                    
                    // Use Toronto timezone (EST/EDT) - Notice we're using a proper ISO format
                    meetingDateTime = DateTime.fromObject({
                        year: parseInt(originalSlot.date.split('-')[0]),
                        month: parseInt(originalSlot.date.split('-')[1]),
                        day: parseInt(originalSlot.date.split('-')[2]),
                        hour: hour,
                        minute: parseInt(minutes)
                    }, { zone: TIMEZONE }).toISO();
                } else {
                    // Format: "14:30"
                    const [hours, minutes] = originalSlot.time.split(':');
                    
                    // Use proper DateTime conversion to ensure correct timezone handling
                    meetingDateTime = DateTime.fromObject({
                        year: parseInt(originalSlot.date.split('-')[0]),
                        month: parseInt(originalSlot.date.split('-')[1]),
                        day: parseInt(originalSlot.date.split('-')[2]),
                        hour: parseInt(hours),
                        minute: parseInt(minutes)
                    }, { zone: TIMEZONE }).toISO();
                }
            } else if (start_time) {
                // Just use start_time as is if it's all we have
                meetingDateTime = start_time;
            } else {
                // Absolute fallback
                meetingDateTime = DateTime.now().setZone(TIMEZONE).plus({minutes: 15}).toISO();
            }
        } catch (error) {
            console.error('❌ Error parsing date/time:', error);
            meetingDateTime = DateTime.now().setZone(TIMEZONE).plus({minutes: 15}).toISO(); // Fallback
        }

        console.log(`📅 Meeting date-time: ${meetingDateTime}`);
        console.log(`📅 Parsed day of week: ${DateTime.fromISO(meetingDateTime).weekdayLong}`);

        // Set up meeting options with the correct start time
        const meetingOptions = {
            topic: service ? `${service} Consultation` : 'Financial Consultation',
            start_time: meetingDateTime,
            duration: 60,
            timezone: TIMEZONE, // Set timezone to Toronto
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
            
            // Include a human-readable date/time for display purposes
            const slotDateTime = DateTime.fromObject({
                year: parseInt(originalSlot.date.split('-')[0]),
                month: parseInt(originalSlot.date.split('-')[1]),
                day: parseInt(originalSlot.date.split('-')[2]),
                hour: getHourFromTimeString(originalSlot.time),
                minute: getMinuteFromTimeString(originalSlot.time)
            }, { zone: TIMEZONE });
            
            appointment.displayDateTime = {
                dayOfWeek: slotDateTime.weekdayLong,
                monthAndDay: slotDateTime.toFormat('MMMM d, yyyy'),
                time: slotDateTime.toFormat('h:mm a'),
                timezone: 'EST'
            };
            
            console.log(`📧 Using selected slot for email: ${appointment.displayDateTime.dayOfWeek}, ${appointment.displayDateTime.monthAndDay} at ${appointment.displayDateTime.time} EST`);
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

// Helper function to extract hours from time string
function getHourFromTimeString(timeString) {
    if (!timeString) return 0;
    
    try {
        if (timeString.includes('AM') || timeString.includes('PM')) {
            // Handle 12-hour format
            const [timePart, period] = timeString.split(' ');
            const [hours] = timePart.split(':');
            let hour = parseInt(hours);
            
            // Convert to 24-hour
            if (period === 'PM' && hour !== 12) hour += 12;
            if (period === 'AM' && hour === 12) hour = 0;
            
            return hour;
        } else {
            // Handle 24-hour format
            const [hours] = timeString.split(':');
            return parseInt(hours);
        }
    } catch (error) {
        console.error('Error parsing hours from time string:', error);
        return 0;
    }
}

// Helper function to extract minutes from time string
function getMinuteFromTimeString(timeString) {
    if (!timeString) return 0;
    
    try {
        if (timeString.includes('AM') || timeString.includes('PM')) {
            // Handle 12-hour format
            const [timePart] = timeString.split(' ');
            const [, minutes] = timePart.split(':');
            return parseInt(minutes);
        } else {
            // Handle 24-hour format
            const [, minutes] = timeString.split(':');
            return parseInt(minutes);
        }
    } catch (error) {
        console.error('Error parsing minutes from time string:', error);
        return 0;
    }
}

// Get available slots for a date
const getAvailableSlots = async (req, res) => {
    const { date } = req.query;
  
    try {
        const result = await pool.query(
            'SELECT time FROM meeting_slots WHERE date = $1 AND is_booked = false and date >= $2',
            [date, DateTime.now().setZone(TIMEZONE).toISODate()]
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
            [DateTime.now().setZone(TIMEZONE).toISODate()]
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
