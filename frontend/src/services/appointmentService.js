import config from '../config/config';
import apiRequest from './api';

/**
 * Get available appointment dates
 */
export const getAvailableDates = async () => {
  return apiRequest(config.routes.appointment.availableDates);
};

/**
 * Get available time slots for a specific date
 */
export const getAvailableSlots = async (date) => {
  return apiRequest(`${config.routes.appointment.availableSlots}?date=${date}`);
};

/**
 * Book an appointment
 */
export const bookAppointment = async (appointmentData) => {
  return apiRequest(config.routes.appointment.book, {
    method: 'POST',
    body: JSON.stringify(appointmentData),
  });
};
