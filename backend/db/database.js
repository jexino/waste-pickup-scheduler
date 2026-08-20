const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Use /tmp for Render (writable without persistent disk)
// Use local db folder for development
const dbPath = process.env.NODE_ENV === 'production'
  ? '/tmp/database.sqlite'
  : path.join(__dirname, 'database.sqlite');

// Ensure the directory exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath);
console.log(`Database opened at: ${dbPath}`);

// Enable WAL mode
db.pragma('journal_mode = WAL');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS zones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS schedules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    zone_id INTEGER NOT NULL,
    day_of_week TEXT NOT NULL,
    waste_type TEXT NOT NULL,
    frequency TEXT DEFAULT 'weekly',
    start_date TEXT,
    FOREIGN KEY (zone_id) REFERENCES zones(id)
  );

  CREATE TABLE IF NOT EXISTS holidays (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    pickup_date TEXT NOT NULL,
    status TEXT DEFAULT 'Pending',
    created_at TEXT DEFAULT (datetime('now'))
  );
`);

module.exports = db;