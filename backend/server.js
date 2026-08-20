const express = require('express');
const cors = require('cors');
const { seedDatabase } = require('./db/seed');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());               // Allow all origins for simplicity
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
  res.json({ message: 'Waste Pickup Scheduler API is running' });
});

// Auto-seed database on startup if it's empty
try {
  seedDatabase();
  console.log('✅ Database ready');
} catch (error) {
  console.error('❌ Database seeding error:', error.message);
}

app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});