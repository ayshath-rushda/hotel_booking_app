# Booking App (MERN Stack)

This is an Express + MongoDB + React for a hotel booking app.

## Project Status

This project is **not finished yet**.

Current status:
- User authentication is partially implemented
- User CRUD is implemented
- Hotel CRUD is implemented
- Room module is not implemented yet
- Authorization roles (admin/user) are not fully enforced on all routes
- Validation, tests, and production hardening are still pending

## Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- JWT authentication
- bcryptjs
- cookie-parser

## Folder Structure

```text
api/
controller/
models/
routes/
util/
index.js
```

## Requirements

- Node.js 18+ (recommended)
- MongoDB connection string

## Environment Variables

Create a `.env` file in the project root:

```env
MONGO=your_mongodb_connection_string
JWT=your_jwt_secret
```

## Installation

```bash
npm install
```

## Run (Development)

```bash
npm run dev
```

Server starts on:
- `http://localhost:9000`

## Implemented API Routes

Base URL: `http://localhost:9000/api`

### Auth

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user and set `access_token` cookie

### Users

- `GET /users/checkauthentication` - Protected test route (requires token cookie)
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user
- `GET /users/:id` - Get one user
- `GET /users` - Get all users

### Hotels

- `POST /hotels` - Create hotel
- `PUT /hotels/:id` - Update hotel
- `DELETE /hotels/:id` - Delete hotel
- `GET /hotels/:id` - Get one hotel
- `GET /hotels` - Get all hotels

### Rooms

- Room routes/controller/model are currently incomplete

## Data Models (Current)

### User

- `username` (String, required, unique)
- `email` (String, required, unique)
- `password` (String, required, hashed)
- `isAdmin` (Boolean, default: false)
- `timestamps`

### Hotel

- `name` (String, required)
- `type` (String, required)
- `city` (String, required)
- `address` (String, required)
- `distance` (String, required)
- `photos` (String[], required)
- `title` (String, required)
- `desc` (String, required)
- `rating` (Number, required, min 0, max 5)
- `rooms` (String[])
- `cheapestPrice` (Number, required)
- `featured` (Boolean, default: false)

## Next Planned Work

- Implement full Rooms module (model, controller, routes)
- Add role-based middleware (`isAdmin`, owner checks)
- Add request validation and better error responses
- Add tests (unit + integration)
- Improve API documentation (Postman/OpenAPI)

## Notes

- Authentication token is stored in an HTTP-only cookie: `access_token`
- Some code paths are still in development and may change
