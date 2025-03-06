const axios = require('axios');
const pool = require('../config/db');
const dotenv = require('dotenv');
dotenv.config();

const CLIENT_ID = process.env.ZOOM_CLIENT_ID;
const CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET;
const REDIRECT_URI = process.env.ZOOM_REDIRECT_URI;

// Get Latest Zoom Access Token from Database
async function getZoomAccessToken() {
    const result = await pool.query('SELECT access_token, refresh_token FROM zoom_tokens WHERE id = 1');
    return result.rows[0];
}

// Refresh Zoom Token if Expired
async function refreshZoomToken() {
    const tokens = await getZoomAccessToken();
    if (!tokens) throw new Error('No Zoom tokens found. Please authenticate first.');

    try {
        const response = await axios.post('https://zoom.us/oauth/token', null, {
            params: {
                grant_type: 'refresh_token',
                refresh_token: tokens.refresh_token,
            },
            headers: {
                Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const { access_token, refresh_token } = response.data;

        await pool.query(
            'UPDATE zoom_tokens SET access_token = $1, refresh_token = $2 WHERE id = 1',
            [access_token, refresh_token]
        );

        return access_token;
    } catch (error) {
        console.error('Error refreshing Zoom token:', error.response?.data || error.message);
        throw new Error('Failed to refresh Zoom token');
    }
}

// Create a Zoom Meeting
async function createZoomMeeting(meetingOptions = {}) {
    console.log('⏳ Starting Zoom meeting creation...');
    try {
        let tokens = await getZoomAccessToken();
        if (!tokens) {
            console.error('❌ No tokens found in database');
            throw new Error('Unauthorized. Please authenticate with Zoom first.');
        }

        console.log('📋 Token status:', { 
            hasAccessToken: !!tokens.access_token,
            hasRefreshToken: !!tokens.refresh_token 
        });

        let accessToken = tokens.access_token;
        
        // Default meeting details that can be overridden by provided options
        const meetingDetails = {
            topic: meetingOptions.topic || 'Financial Consultation',
            type: 2, // Scheduled meeting
            start_time: meetingOptions.start_time || new Date(Date.now() + 15 * 60 * 1000).toISOString(),
            duration: meetingOptions.duration || 30,
            timezone: meetingOptions.timezone || 'UTC',
            settings: { 
                host_video: true, 
                participant_video: true, 
                join_before_host: false,
                ...meetingOptions.settings
            },
        };
        console.log('📝 Meeting details:', JSON.stringify(meetingDetails, null, 2));

        const response = await axios.post('https://api.zoom.us/v2/users/me/meetings', 
            meetingDetails,
            {
                headers: { 
                    Authorization: `Bearer ${accessToken}`, 
                    'Content-Type': 'application/json' 
                },
            }
        ).catch(err => {
            console.error('❌ Zoom API request failed:', {
                status: err.response?.status,
                statusText: err.response?.statusText,
                data: err.response?.data,
                error: err.message
            });
            throw err;
        });

        console.log('✅ Zoom API response:', {
            status: response.status,
            meetingId: response.data?.id,
            joinUrl: response.data?.join_url
        });

        return response.data;

    } catch (error) {
        if (error.response?.status === 401) {
            console.log('🔄 Token expired, attempting refresh...');
            try {
                const newAccessToken = await refreshZoomToken();
                console.log('✅ Token refresh successful');
                return createZoomMeeting(meetingOptions); // Retry with new token
            } catch (refreshError) {
                console.error('❌ Token refresh failed:', refreshError.message);
                throw new Error('Failed to refresh authentication token');
            }
        }
        
        console.error('❌ Meeting creation failed:', {
            message: error.message,
            response: error.response?.data,
            stack: error.stack
        });
        
        throw new Error(`Failed to create Zoom meeting: ${error.message}`);
    }
}

module.exports = {
    getZoomAccessToken,
    refreshZoomToken,
    createZoomMeeting,
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
};
