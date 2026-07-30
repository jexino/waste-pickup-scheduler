const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const zonesRouter = require('./routes/zones');
const pickupsRouter = require('./routes/pickups');
const requestsRouter = require('./routes/requests');

app.use('/api/requests', requestsRouter);
app.use('/api/zones', zonesRouter);
app.use('/api/pickups', pickupsRouter);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});