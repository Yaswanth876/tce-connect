# TCE Connect Backend

This is a Node.js + Express.js backend API for TCE Connect, using MongoDB Atlas as the cloud database.

## Features
- REST API for users and events
- MongoDB Atlas integration
- Environment variable support via `.env`
- Ready for deployment

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Set your `MONGODB_URI` to your MongoDB Atlas connection string
   - Optionally set `PORT` (default is 5000)

3. **Run the server:**
   ```bash
   npm run dev
   ```
   or
   ```bash
   npm start
   ```

## MongoDB Atlas Setup
- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster and database
- Get your connection string and set it in `.env`

## API Endpoints
- `GET /api/users` - List all users
- `POST /api/users` - Create a user
- `GET /api/events` - List all events
- `POST /api/events` - Create an event

## Folder Structure
```
backend/
  src/
    models/
      User.js
      Event.js
    routes/
      user.js
      event.js
    index.js
  .env.example
  package.json
  README.md
```
