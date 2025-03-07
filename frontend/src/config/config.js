const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  routes: {
    auth: {
      sendOtp: '/api/send-otp',
      verifyOtp: '/api/verify-otp',
    },
    appointment: {
      book: '/api/book-appointment',
      availableSlots: '/api/available-slots',
      availableDates: '/api/available-dates',
    },
  }
};

export default config;
