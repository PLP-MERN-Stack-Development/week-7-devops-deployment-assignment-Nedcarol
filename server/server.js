// server.js

require('dotenv').config(); // Load env variables early

const express = require('express');
  const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

// Import routes
const postRoutes = require('./src/routes/posts');

const app = express();
const PORT = process.env.PORT || 5001;

// ✅ Middleware
app.use(express.json());          // Parses incoming JSON requests
app.use(helmet());                // Sets secure HTTP headers
app.use(cors());                  // Allows cross-origin requests
app.use(morgan('dev'));           // Logs HTTP requests to console

// ✅ Health Check
app.get('/health', (req, res) => {
  res.status(200).send('✅ Health check OK');
});

// ✅ API Routes
app.use('/api/posts', postRoutes);


// ✅ API Routes
app.use('/api/posts', postRoutes);

// ✅ Root Route
app.get('/', (req, res) => {
  res.send('🚀 Server is running! Backend is alive!');
});

// ✅ 404 Not Found
app.use((req, res, next) => {
  res.status(404).json({ message: '🔍 Route not found' });
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// ✅ Connect to MongoDB and Start Server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
});

// ✅ Export for Testing
module.exports = app;
