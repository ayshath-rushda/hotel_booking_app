# Booking App (MERN Stack)

Hotel booking app with Express + MongoDB + React.

## Project Status

**Complete.** All core features implemented:

- User authentication (register, login, JWT in HTTP-only cookie)
- Full CRUD for Hotels, Rooms, Users (admin-protected where needed)
- Room module with availability tracking (unavailable dates per room number)
- Booking/reservation system (date picker, room selection, availability check)
- Search with city + price filters via URL query params
- Admin panel with tabbed CRUD for Hotels, Rooms, Users
- Auth context + Search context (shared state across all pages)
- Dynamic hotel detail page with photo slider

## Tech Stack

### Backend
- Node.js, Express 5
- MongoDB + Mongoose 9
- JWT authentication (jsonwebtoken)
- bcryptjs (password hashing)
- cookie-parser (HTTP-only cookie for token)

### Frontend
- React 18 (Create React App)
- React Router v6 (URL-driven search, protected routes)
- Axios (API calls)
- react-date-range + date-fns (date pickers)
- FontAwesome (icons)

## Folder Structure

```text
api/
├── controller/       # Route handlers (auth, hotel, room, user, booking)
├── models/           # Mongoose schemas (Hotel, Room, User, Booking)
├── routes/           # Express routers
├── util/             # Error helper, JWT verification middleware
└── index.js          # Express entry point

client/
└── src/
    ├── components/   # Reusable UI (navbar, header, searchItem, reserve, adminRoute)
    ├── context/      # React Context (SearchContext, AuthContext)
    ├── hooks/        # useFetch (custom GET + reFetch hook)
    └── pages/        # Page components (home, list, hotel, login, register, admin)
```

## Requirements

- Node.js 18+
- MongoDB connection string

## Environment Variables

Create `api/.env`:

```env
MONGO=mongodb://localhost:27017/booking
JWT=your_jwt_secret
```

## Installation

```bash
cd api && npm install
cd ../client && npm install
```

## Run (Development)

Two terminals:

```bash
# Backend (port 9000)
cd api && npm run dev

# Frontend (port 3000)
cd client && npm start
```

Frontend proxies `/api` requests to `http://localhost:9000/api`.

## API Routes

Base URL: `http://localhost:9000/api`

### Auth

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/auth/register` | None | Register new user (bcrypt hash) |
| POST | `/auth/login` | None | Login, sets `access_token` HTTP-only cookie |

### Hotels

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/hotels` | None | List hotels (query: `city`, `min`, `max`, `featured`, `limit`) |
| GET | `/hotels/find/:id` | None | Get single hotel |
| GET | `/hotels/countByCity` | None | Count by city (`?cities=a,b,c`) |
| GET | `/hotels/countByType` | None | Count by type |
| POST | `/hotels` | Admin | Create hotel |
| PUT | `/hotels/:id` | Admin | Update hotel |
| DELETE | `/hotels/:id` | Admin | Delete hotel |

### Rooms

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/rooms` | None | List all rooms |
| GET | `/rooms/:id` | None | Get single room |
| POST | `/rooms/:hotelid` | Admin | Create room (links to hotel) |
| PUT | `/rooms/:id` | Admin | Update room |
| DELETE | `/rooms/:id/:hotelid` | Admin | Delete room (unlinks from hotel) |

### Users

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/users` | Admin | List all users |
| GET | `/users/:id` | Owner/Admin | Get user |
| POST | `/users` | Admin | Create user (with password hashing) |
| PUT | `/users/:id` | Owner/Admin | Update user |
| DELETE | `/users/:id` | Owner/Admin | Delete user |

### Bookings

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/bookings` | Auth | Create booking (checks availability, marks unavailable dates) |
| GET | `/bookings` | Auth | Get current user's bookings |
| GET | `/bookings/all` | Admin | Get all bookings |
| PUT | `/bookings/:id` | Admin | Update booking status |

## Frontend Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Search bar, featured cities, property types, featured properties |
| `/hotels` | List | Search results driven by `?city`, `?min`, `?max` query params |
| `/hotels/:id` | Hotel | Hotel detail with photo slider, reserve/book button |
| `/login` | Login | Username/password form |
| `/register` | Register | Username/email/password form |
| `/admin` | Admin | Tabbed CRUD panel (Hotels/Rooms/Users) — admin only |

## Data Models

### User
- `username` (String, required, unique)
- `email` (String, required, unique)
- `password` (String, required, hashed)
- `isAdmin` (Boolean, default: false)
- `timestamps`

### Hotel
- `name`, `type`, `city`, `address`, `distance` (String, required)
- `photos` ([String], required)
- `title`, `desc` (String, required)
- `rating` (Number, required, 0–5)
- `rooms` ([String] — room ObjectIds)
- `cheapestPrice` (Number, required)
- `featured` (Boolean, default: false)
- `timestamps`

### Room
- `title`, `desc` (String, required)
- `price` (Number, required)
- `maxPeople` (Number, required)
- `roomNumbers` ([{ number: Number, unavailableDates: [Date] }])
- `timestamps`

### Booking
- `hotelId` (ObjectId → Hotel)
- `roomId` (ObjectId → Room)
- `userId` (ObjectId → User)
- `roomNumbers` ([Number])
- `dateRange` ({ startDate, endDate })
- `status` (enum: pending / confirmed / cancelled)
- `price` (Number)
- `timestamps`

## Context API

- **SearchContext** — Shares `destination`, `date`, `options` across Header and List pages
- **AuthContext** — Manages user state, login/register/logout, persisted in localStorage

## Notes

- JWT stored in HTTP-only cookie named `access_token`
- All admin routes use `verifyAdmin` middleware
- Booking creation checks room number availability for the requested date range
- Frontend proxy (`client/package.json`) forwards `/api` → `http://localhost:9000/api`
