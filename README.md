# BookEase Booking Management System

BookEase is a full-stack booking management system. This repository currently contains the initial React/Vite frontend and Express backend setup.

## Run the frontend

```bash
cd client
npm run dev
```

The Vite development server will print its local URL, normally `http://localhost:5173`.

## Run the backend

```bash
cd server
cp .env.example .env
npm run dev
```

The API will listen on `http://localhost:5000` by default. Use `npm start` for a production-style Node start without nodemon.

## Test the health endpoint

Open `http://localhost:5000/api/health` in a browser or run:

```bash
curl http://localhost:5000/api/health
```

Expected response:

```json
{
  "success": true,
  "message": "BookEase API is running"
}
```

## Manual configuration

Copy `server/.env.example` to `server/.env`. No MongoDB configuration is required yet; database connectivity will be added in a later step.

## Project structure

```text
bookease-booking-management-system/
├── client/
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env.example
├── README.md
└── .gitignore
```