import config from '../config/config';
import apiRequest from './api';

/**
 * Send OTP to user email
 */
export const sendOtp = async (email) => {
  return apiRequest(config.routes.auth.sendOtp, {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
};

/**
 * Verify OTP entered by user
 */
export const verifyOtp = async (email, otp) => {
  return apiRequest(config.routes.auth.verifyOtp, {
    method: 'POST',
    body: JSON.stringify({ email, otp }),
  });
};
