// server/src/app.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const postRoutes = require('./routes/posts');

dotenv.config();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

const app = express();

app.use(express.json());
app.use('/api/posts', postRoutes);

app.get('/', (req, res) => {
  res.send('API is live!');
});

module.exports = app;
