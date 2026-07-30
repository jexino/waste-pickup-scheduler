const express = require('express');
const router = express.Router();
const db = require('../db/database');
const { getUpcomingPickups } = require('../utils/dateHelpers');

router.get('/:zoneId', (req, res) => {
  const zoneId = parseInt(req.params.zoneId);
  const days = parseInt(req.query.days) || 14;

  const schedules = db.prepare('SELECT * FROM schedules WHERE zone_id = ?').all(zoneId);
  if (schedules.length === 0) {
    return res.status(404).json({ error: 'Zone not found or no schedules' });
  }

  const holidays = db.prepare('SELECT date FROM holidays').all();
  const pickups = getUpcomingPickups(schedules, holidays, days);

  // Also fetch zone name for UI
  const zone = db.prepare('SELECT name FROM zones WHERE id = ?').get(zoneId);
  res.json({
    zoneId,
    zoneName: zone ? zone.name : `Zone ${zoneId}`,
    pickups
  });
});

module.exports = router;