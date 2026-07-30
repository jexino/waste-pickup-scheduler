const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', (req, res) => {
  const zones = db.prepare('SELECT * FROM zones').all();
  res.json(zones);
});

module.exports = router;