const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Import routes
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

// Initialize app
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Route prefixes
app.use('/auth', authRoutes);
app.use('/api', appointmentRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));