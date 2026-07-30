const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.post('/', (req, res) => {
  const { name, address, pickup_date } = req.body;

  if (!name || !address || !pickup_date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const stmt = db.prepare(
    'INSERT INTO requests (name, address, pickup_date) VALUES (?, ?, ?)'
  );
  const result = stmt.run(name, address, pickup_date);

  res.status(201).json({
    message: 'Pickup requested successfully',
    requestId: result.lastInsertRowid
  });
});

// Optional: GET all requests (to display them later)
router.get('/', (req, res) => {
  const requests = db.prepare('SELECT * FROM requests ORDER BY created_at DESC').all();
  res.json(requests);
});

module.exports = router;