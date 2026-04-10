const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet({ crossOriginResourcePolicy: false })); // Set security HTTP headers (disabled CORP for CORS)
app.use(cors({ origin: process.env.FRONTEND_URL || '*' })); // Allow React to connect
app.use(express.json()); // Parses incoming JSON requests


// Auth Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/messages', require('./routes/messages'));

// Ride Routes
app.use('/api/rides', require('./routes/rides'));
// MongoDB Connection
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected to Chalo Bhaiya DB'))
    .catch(err => console.error('MongoDB connection error:', err));
} else {
  console.warn("WARNING: MONGO_URI is missing in .env file");
}

// Basic Test Route
app.get('/', (req, res) => {
  res.send('Chalo Bhaiya API is running...');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(errorHandler);
