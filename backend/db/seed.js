const db = require('./database');

function seedDatabase() {
  console.log('🌱 Checking if database needs seeding...');

  // Check if zones table is empty
  const zoneCount = db.prepare('SELECT COUNT(*) as count FROM zones').get();

  if (zoneCount.count > 0) {
    console.log('✅ Database already seeded');
    return;
  }

  console.log('🌱 Seeding database...');

  // Insert zones
  const insertZone = db.prepare('INSERT INTO zones (name) VALUES (?)');
  insertZone.run('Lafia North - Tudun Amba');
  insertZone.run('Shabu- Assakio ');
  insertZone.run('City Centre - Town Core ');
  insertZone.run('Kwandare- Danka ');

  // Insert schedules
  const insertSchedule = db.prepare(
    'INSERT INTO schedules (zone_id, day_of_week, waste_type, frequency, start_date) VALUES (?, ?, ?, ?, ?)'
  );

  // lafia North
insertSchedule.run(1, 'Monday', 'trash', 'weekly', null);
insertSchedule.run(1, 'Wednesday', 'recycling', 'weekly', null);

// shabu
insertSchedule.run(2, 'Tuesday', 'trash', 'biweekly', '2026-01-06');
insertSchedule.run(2, 'Thursday', 'recycling', 'weekly', null);

// city centre
insertSchedule.run(3, 'Friday', 'yard_waste', 'weekly', null);
insertSchedule.run(3, 'Monday', 'trash', 'weekly', null);

// kwandare
insertSchedule.run(4, 'Thursday', 'trash', 'weekly', null);
insertSchedule.run(4, 'Saturday', 'recycling', 'weekly', null);
  // lafia North
insertSchedule.run(1, 'Monday', 'trash', 'weekly', null);
insertSchedule.run(1, 'Wednesday', 'recycling', 'weekly', null);

  // Insert holidays
  const insertHoliday = db.prepare('INSERT INTO holidays (date) VALUES (?)');
  insertHoliday.run('2026-12-25');
  insertHoliday.run('2027-01-01');
  console.log('✅ Holidays added');
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase();
  db.close();
}

// Export for use in server.js
module.exports = { seedDatabase };