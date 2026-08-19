# Waste Pickup Scheduler

A full-stack web app for residents to check their waste collection schedule, find pickups by zone or address, and submit pickup requests.

## Features

- View collection dates by neighborhood or zone
- Search by address to find the relevant pickup schedule
- Submit a pickup request and track its status
- Browse existing requests in the app
- Manage schedules and requests through a SQLite-backed API

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: SQLite via better-sqlite3

## Project Structure

```text
waste-pickup-scheduler/
├── backend/
│   ├── db/
│   ├── routes/
│   ├── utils/
│   ├── package.json
│   ├── server.js
│   └── database.sqlite
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── package.json
├── README.md
└── .gitignore
```

## Prerequisites

Before running the app, make sure you have:

- Node.js 18+
- npm

## Installation

1. Clone the repository.
2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

## Running the App

### Start the backend

```bash
cd backend
npm run dev
```

The API runs by default on:

- http://localhost:5000

### Start the frontend

```bash
cd frontend
npm run dev
```

The frontend runs by default on:

- http://localhost:5173

## Available Scripts

### Backend

```bash
npm run start
npm run dev
npm run seed
```

### Frontend

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## API Overview

The backend exposes endpoints such as:

- GET /api/zones
- GET /api/pickups/:zoneId
- GET /api/requests
- POST /api/requests

## Notes

- The app uses SQLite for local data storage.
- The backend can be configured with an environment variable such as `FRONTEND_URL` for CORS.
- If you are working with the database, you can seed sample schedules with the backend seed script.

## License

This project is licensed under the ISC License.
