const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());

// Routes
const zonesRouter = require('./routes/zones');
const pickupsRouter = require('./routes/pickups');
const requestsRouter = require('./routes/requests');

app.use('/api/zones', zonesRouter);
app.use('/api/pickups', pickupsRouter);
app.use('/api/requests', requestsRouter);

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'Waste Pickup Scheduler API is running',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});