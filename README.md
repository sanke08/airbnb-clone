# Airbnb Clone

A full-stack property rental platform built with Next.js 14, TypeScript, MongoDB, and NextAuth. Users can browse and filter listings across 15 property categories, make reservations, manage their own listings, and save favourites.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js | 14.1.0 |
| Language | TypeScript | — |
| Database | MongoDB + Mongoose | — |
| Authentication | NextAuth | v4 |
| Auth Strategy | JWT (session) | — |
| Auth Providers | Credentials + Google OAuth | — |
| State Management | Redux (vanilla) | — |
| File Uploads | UploadThing | — |
| Date Picker | React-Date-Range | — |
| Styling | Tailwind CSS | — |
| UI Primitives | Radix UI | — |
| Password Hashing | bcryptjs | — |
| Package Manager | npm | — |

---

## Database Schema

All Mongoose models live in `src/lib/modals/`. The MongoDB database name is `"Airnnb"`.

### User (`user.modal.ts`)

| Field | Type | Notes |
|---|---|---|
| `email` | String | Unique |
| `name` | String | Display name |
| `image` | String | Avatar URL |
| `password` | String | bcrypt hash; absent for Google OAuth users |

### Listing (`listing.modal.ts`)

| Field | Type | Notes |
|---|---|---|
| `title` | String | — |
| `description` | String | — |
| `image` | String[] | UploadThing CDN URLs |
| `category` | String | One of the 15 categories |
| `roomCount` | Number | — |
| `bathroomCount` | Number | — |
| `bedRoomCount` | Number | — |
| `guestCount` | Number | — |
| `location` | Object | `state`, `country`, `street`, `address` |
| `price` | Number | Per-night price |
| `type` | String | `"room"` or `"home"` |
| `isActive` | Boolean | Visibility toggle |
| `amenities` | String[] | — |
| `creator` | Ref → User | Listing owner |

### Reservation (`reservation.modal.ts`)

| Field | Type | Notes |
|---|---|---|
| `startDate` | Date | Check-in |
| `endDate` | Date | Check-out |
| `totalPrice` | Number | Calculated client-side |
| `listing` | Ref → Listing | — |
| `reserver` | Ref → User | Who booked |

### Favourite (`favourite.modal.ts`)

Mongoose model name: `"Favourite"`.

| Field | Type | Notes |
|---|---|---|
| `listId` | Ref → Listing | The saved listing |
| `userId` | Ref → User | The user who saved it |

---

## Authentication

Configured in `src/lib/authOptions.ts` using NextAuth v4 with the JWT session strategy.

**Credentials provider** — accepts email + password; password verified with `bcrypt.compare`.

**Google OAuth provider** — on first login, a new `User` document is created in MongoDB. No password field is set for OAuth users.

---

## User Flows

### Auth → Browse → Book

1. Open the app; unauthenticated users see the Auth modal (Redux `openAuth` toggle).
2. Sign in with email/password or Google OAuth.
3. The home page (`/`) renders all active listings in a grid.
4. Click a category tab to filter the feed by property type.
5. Open the filter panel to narrow by rooms, bathrooms, bedrooms, price range, or listing type.
6. Click a listing card to open the detail page (`/[listingId]`).
7. Select check-in / check-out dates on the `Calender` component (past dates and already-reserved dates are disabled).
8. Confirm the reservation — `POST /api/reservation/[reservationId]` creates the booking.

### Create a Listing

1. Click "Add Listing" in the Navbar; requires auth (dispatches `OPEN_LISTING` to Redux toggle).
2. Complete the multi-step form: category → location → room/bathroom/bedroom/guest counts → title → description → price → type → images.
3. Upload images via UploadThing (max 5 MB per file); URLs are stored in `listing.image[]`.
4. Submit — `POST /api/listing` creates the record.

### Manage Properties and Reservations

- `/properties` — view, edit (`PUT /api/listing/[listId]`), or delete (`DELETE /api/listing/[listId]`) your own listings.
- `/reservations` — view or cancel (`DELETE /api/reservation/[reservationId]`) your bookings.
- `/favourites` — listings saved via the heart icon; toggled with `PATCH /api/favourites`.

---

## API Endpoints

### User Registration

| Method | Path | Description |
|---|---|---|
| POST | `/api/register` | Create a new user (email + password) |
| * | `/api/auth/[...nextauth]` | NextAuth handler |

### Listings

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/listing` | No | Browse listings (supports filters) |
| POST | `/api/listing` | Yes | Create a listing |
| PUT | `/api/listing/[listId]` | Yes (creator) | Update a listing |
| DELETE | `/api/listing/[listId]` | Yes (creator) | Delete a listing |

**GET /api/listing query parameters:**

| Param | Type | Description |
|---|---|---|
| `roomCount` | number | Minimum room count |
| `bathroomCount` | number | Minimum bathroom count |
| `bedRoomCount` | number | Minimum bedroom count |
| `type` | string | Property type (`"room"` or `"home"`) |
| `price` | string | Price range in `"min-max"` format, e.g. `"50-300"` |

### Reservations

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/reservation/[reservationId]` | Yes | Create a reservation |
| DELETE | `/api/reservation/[reservationId]` | Yes | Cancel a reservation |

### Favourites

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/favourites` | Yes | Get user's saved listings |
| PATCH | `/api/favourites` | Yes | Toggle a favourite (add or remove) |

### File Upload

| Method | Path | Description |
|---|---|---|
| * | `/api/uploadthing` | UploadThing handler (max 5 MB, single image per request) |

---

## Redux State

The app uses vanilla Redux with three slices.

### `toggleReducer`

| Key | Type | Description |
|---|---|---|
| `openListin` | boolean | Listing creation/edit modal open |
| `openAuth` | boolean | Auth modal open |

### `listingReducer` — Listing Form State

Holds the multi-step listing creation and edit form state.

| Field | Type |
|---|---|
| `category` | string |
| `location` | `{ state, country, street, address }` |
| `bathrooms` | number |
| `guests` | number |
| `rooms` | number |
| `title` | string |
| `description` | string |
| `price` | number |
| `type` | string |
| `images` | string[] |
| `_id` | string (set when editing an existing listing) |

Action `CLEAN_UP` resets all fields to their defaults.

### `filterReducer` — Active Filters

| Action | Field |
|---|---|
| `FTYPE` | Listing type |
| `FPRICE` | Price range |
| `FROOMS` | Room count |
| `FBATHROOMS` | Bathroom count |
| `FBEDROOMS` | Bedroom count |
| `FAMINITIES` | Amenities |

---

## Components

| Component | Description |
|---|---|
| `Navbar` | Sticky top bar; "Add Listing" button, user avatar, auth modal trigger |
| `Categories` | Horizontal scrollable row of 15 category filter tabs |
| `ListingCard` | Listing thumbnail with image slider, price, heart icon |
| `ListingCardSlider` | Image slider used inside `ListingCard` |
| `ListingHead` | Full-width image carousel at the top of the detail page |
| `ListingInfo` | Title, counts, host info, description, and amenities on detail page |
| `ListingAction` | Edit / delete buttons shown only to the listing creator |
| `Calender` | Date range picker (react-date-range); disables past and reserved dates |
| `FileUploader` | UploadThing drag-and-drop image uploader |
| `Counter` | Increment/decrement numeric input for room/bathroom/guest counts |
| `Togglebutton` | Boolean toggle for switching between listing types |
| `ReservationCard` | Reservation summary card on the `/reservations` page |

### 15 Property Categories

Beach, Windmills, Modern, Countryside, Pools, Islands, Lake, Skiing, Castles, Caves, Camping, Arctic, Desert, Barns, Lux

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
MONGO_URL=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_SECRET=your-random-secret-32-chars-minimum
```

---

## Setup

### Prerequisites

- Node.js 18+
- A MongoDB Atlas cluster or local MongoDB instance
- A Google Cloud project with OAuth 2.0 credentials

### Install and Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Google OAuth

1. Create a project in [Google Cloud Console](https://console.cloud.google.com).
2. Enable the Google Identity API.
3. Create OAuth 2.0 credentials (Web Application type).
4. Add `http://localhost:3000/api/auth/callback/google` as an authorized redirect URI.
5. Copy the client ID and secret to `.env.local`.

### Production Build

```bash
npm run build
npm start
```

---

## Architecture

```
Browser (Next.js 14)
    │
    ├──▶ NextAuth (Credentials + Google OAuth, JWT session)
    │
    ├──▶ Next.js API Routes (/api/*)
    │        │
    │        ├──▶ MongoDB "Airnnb" (Mongoose)
    │        │        Models: User, Listing, Reservation, Favourite
    │        │
    │        └──▶ UploadThing
    │                 Image URLs stored in Listing.image[]
    │
    └──▶ Redux Store (client state)
             toggleReducer  → modal open/close
             listingReducer → create/edit listing form
             filterReducer  → browse filters
```

---

## User Flow

1. **Register** → POST /api/register → bcrypt hash password → User created
2. **Sign In** → NextAuth Credentials: email + bcrypt.compare → JWT session  |  Google: creates User if new
3. **Browse** → GET /api/listing?type=Beach&price=0-500&roomCount=2 → ListingCard grid
4. **View Listing** → /:listingId → ListingHead (image carousel) + ListingInfo + Calender (reserved dates shown) + reservation form
5. **Book** → select dates → POST /api/reservation {listingId, startDate, endDate, totalPrice} → Reservation created → viewable at /reservations
6. **Create Listing** → AddListing modal → fill form + upload images (UploadThing) → POST /api/listing → Listing created
7. **Favourite** → heart button → PATCH /api/favourites {listId} → toggles Favourite record → viewable at /favourites
8. **Manage Properties** → /properties → user's listings with edit/delete via ListingAction

---

## Data Flow

```
User selects dates and clicks Book
    │
    ▼ POST /api/reservation { listingId, startDate, endDate, totalPrice }
Next.js API Route
    │ Mongoose: Reservation.create({ listing, reserver: session.user.id, startDate, endDate, totalPrice })
    ▼ MongoDB "Airnnb"
Reservation saved
    │
    ▼ /reservations page → GET reservations where reserver=userId → ReservationCard list

Browse + Filter flow:
User clicks category "Beach"
    │ Redux filterReducer: FTYPE = "Beach"
    ▼ GET /api/listing?type=Beach&roomCount=N&price=min-max
Mongoose.find({ type:"Beach", roomCount:{$gte:N}, price:{$gte:min,$lte:max} })
    ▼ ListingCard grid re-renders
```
