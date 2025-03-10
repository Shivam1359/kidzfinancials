const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');
const { Pool } = require('pg');
const nodemailer = require('nodemailer');
const { DateTime } = require('luxon');
const compression = require('compression');
const helmet = require('helmet');

// Import routes
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

// Initialize app
dotenv.config();
const app = express();

// Add security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Enable in production with proper configuration
}));

// Add compression middleware with more aggressive settings
app.use(compression({
  level: 6, // Higher compression level
  threshold: 0, // Compress all responses
  filter: (req, res) => {
    // Don't compress responses with this request header
    if (req.headers['x-no-compression']) {
      return false;
    }
    // Fallback to default filter function
    return compression.filter(req, res);
  },
  // Use different strategies for different content types
  strategy: (req, res) => {
    if (res.getHeader('Content-Type')?.includes('application/json')) {
      return 1; // Fast compression for JSON
    }
    return 2; // Default compression strategy
  }
}));

// Parse JSON with size limits
app.use(express.json({ limit: '1mb' }));

// Configure CORS with specific origins in production
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://kidzfinancials.com', 'https://www.kidzfinancials.com'] 
    : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Set default timezone for the application
const TIMEZONE = 'America/Toronto';

// Make timezone available to routes
app.locals.timezone = TIMEZONE;

const PORT = process.env.PORT || 5000;

// Route prefixes
app.use('/auth', authRoutes);
app.use('/api', appointmentRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));