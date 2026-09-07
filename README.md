# BookEase — Booking Management System

BookEase is a full-stack booking management system with JWT authentication, user bookings, and an admin workspace for managing users and booking statuses.

## Features

### User Features

- Register and login
- JWT authentication with persisted sessions
- Create bookings
- View personal bookings
- Cancel eligible bookings

### Admin Features

- Admin dashboard
- View/search users and user details
- Block/unblock regular users
- View, search, and filter all bookings
- Update booking statuses

## Tech Stack

Frontend: React, Vite, Tailwind CSS, React Router, Axios

Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs

## Project Structure

```text
bookease-booking-management-system/
├── client/src/{api,components,context,pages,routes}/
├── client/.env.example
├── server/{config,controllers,middleware,models,routes}/
├── server/.env.example
├── .gitignore
└── README.md
```

## Installation

```bash
git clone <repository-url>
cd bookease-booking-management-system
cd server && npm install
cd ../client && npm install
```

Create the environment files from the examples. Run the applications in separate terminals:

```bash
cd server && npm run dev
```

```bash
cd client && npm run dev
```

The frontend normally runs at `http://localhost:5173`; the API runs at `http://localhost:5000`.

## Environment Variables

`server/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
JWT_EXPIRES_IN=7d
```

`client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Never commit real `.env` files or secrets.

## API Endpoints

| Method | Route | Access | Purpose |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register a regular user |
| POST | `/api/auth/login` | Public | Authenticate a user |
| GET | `/api/users` | Admin | List/search users |
| GET | `/api/users/:id` | Admin | View user details |
| PATCH | `/api/users/:id/block` | Admin | Toggle a regular user’s blocked status |
| POST | `/api/bookings` | Authenticated | Create a booking for the current user |
| GET | `/api/bookings/my-bookings` | Authenticated | List current user’s bookings |
| GET | `/api/bookings/:id` | Owner/Admin | View a booking |
| PATCH | `/api/bookings/:id/cancel` | Owner | Cancel an eligible booking |
| GET | `/api/bookings` | Admin | List/search/filter all bookings |
| PATCH | `/api/bookings/:id/status` | Admin | Update booking status |
| GET | `/api/admin/dashboard` | Admin | Verify admin access |

## Authentication and Role-Based Access

Login returns a signed JWT containing the user ID and role. The frontend stores the token and safe user data in localStorage. Axios automatically sends the token as a Bearer token.

Regular users can manage only their own bookings. Admins can access user management and all-booking management. Public registration always creates a regular user.

## Screenshots

Future placeholders: `screenshots/home.png`, `screenshots/login.png`, `screenshots/dashboard.png`, `screenshots/bookings.png`, and `screenshots/admin-dashboard.png`. These files are not currently included.

## Manual Testing Checklist

### Authentication

- [ ] Register user
- [ ] Reject duplicate email
- [ ] Login and reject incorrect password
- [ ] Reject blocked-user login
- [ ] Logout
- [ ] Restore authentication after refresh

### Authorization and User Management

- [ ] Redirect unauthenticated users to login
- [ ] Redirect regular users away from admin routes
- [ ] Admin loads/searches users and views details
- [ ] Admin blocks/unblocks a regular user
- [ ] Admin cannot block themselves or another admin

### Bookings

- [ ] Create booking
- [ ] Reject past dates and invalid times
- [ ] View My Bookings
- [ ] Cancel an own booking
- [ ] Reject completed-booking cancellation
- [ ] Prevent access to another user’s booking
- [ ] Admin views/searches/filters bookings
- [ ] Admin updates booking status

## Future Improvements

- Email notifications
- Pagination and calendar view
- Password reset
- Deployment configuration
- Advanced analytics

## Author

Project author details to be added.
