const db = require('./database');

// Clear existing data
db.exec('DELETE FROM schedules');
db.exec('DELETE FROM zones');
db.exec('DELETE FROM holidays');

// Insert zones
const insertZone = db.prepare('INSERT INTO zones (name) VALUES (?)');
insertZone.run('Downtown');
insertZone.run('Uptown');
insertZone.run('Suburbs');

// Insert schedules
const insertSchedule = db.prepare(
  'INSERT INTO schedules (zone_id, day_of_week, waste_type, frequency, start_date) VALUES (?, ?, ?, ?, ?)'
);

// Downtown
insertSchedule.run(1, 'Monday', 'trash', 'weekly', null);
insertSchedule.run(1, 'Wednesday', 'recycling', 'weekly', null);

// Uptown
insertSchedule.run(2, 'Tuesday', 'trash', 'biweekly', '2026-01-06');
insertSchedule.run(2, 'Thursday', 'recycling', 'weekly', null);

// Suburbs
insertSchedule.run(3, 'Friday', 'yard_waste', 'weekly', null);
insertSchedule.run(3, 'Monday', 'trash', 'weekly', null);

// Insert a holiday
db.prepare('INSERT INTO holidays (date) VALUES (?)').run('2026-12-25');

console.log('Database seeded successfully.');