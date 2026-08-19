const Database = require('better-sqlite3');
const path = require('path');

const dbPath = process.env.DB_PATH || path.join(__dirname, 'database.sqlite');
const db = new Database(dbPath);

// Enable WAL mode for better concurrency
db.pragma('journal_mode = WAL');

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS zones (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS schedules (
    id INTEGER PRIMARY KEY,
    zone_id INTEGER NOT NULL,
    day_of_week TEXT NOT NULL,
    waste_type TEXT NOT NULL,
    frequency TEXT DEFAULT 'weekly',
    start_date TEXT,
    FOREIGN KEY (zone_id) REFERENCES zones(id)
  );

  CREATE TABLE IF NOT EXISTS holidays (
    id INTEGER PRIMARY KEY,
    date TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS requests (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  pickup_date TEXT NOT NULL,
  status TEXT DEFAULT 'Pending',
  created_at TEXT DEFAULT (datetime('now'))
  );

`);

module.exports = db;