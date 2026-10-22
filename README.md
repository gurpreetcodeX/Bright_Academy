# Bright Academy

Professional React + Vite website with a student portal and Express/MongoDB API.

## 1. Frontend

From the `brightacademy` root folder:

```bash
npm install
npm run dev
```

Open the local URL Vite prints (normally `http://localhost:5173`).

## 2. Database

Install and start MongoDB locally, or create a MongoDB Atlas database. Copy `backend/.env.example` to `backend/.env`, then set `MONGODB_URI` and replace `JWT_SECRET` with a long random secret (at least 24 characters). Do not publish `.env` or share your JWT secret.

## 3. Backend

Open a second terminal:

```bash
cd backend
npm install
```

Create `backend/.env` from `.env.example`, then run:

```bash
npm run dev
```

API health check: `http://localhost:5000/api/health`.

If the frontend runs at a different origin, update `CLIENT_ORIGIN` in `backend/.env` and `VITE_API_URL` in the root `.env` file. Restart Vite after changing `.env`.

## Student portal features

- Student registration and sign-in using hashed passwords and JWT sessions.
- Student profiles and course progress stored in MongoDB.
- Progress updates saved by the API and restored on the next sign-in.
- Sign-out and protected student API endpoints.

New accounts receive a starter learning plan for the three courses shown on the website. This is a working foundation; real course content, admin-managed enrolment, password reset, email verification and production hosting still need to be configured before public launch.

## Deploy (free tiers)

1. Database: create a free MongoDB Atlas cluster and copy its connection string.
2. Backend: deploy the `backend` folder on Render (build `npm install`, start `npm start`). Set `MONGODB_URI`, `JWT_SECRET`, `NODE_ENV=production` and `CLIENT_ORIGIN` (your frontend URL).
3. Frontend: deploy the root folder on Vercel or Netlify. Set `VITE_API_URL` to `https://<your-backend>/api`. `vercel.json` and `public/_redirects` already handle page refreshes on `/courses` and other routes.
4. Change the contact email in `src/data.js`.

## Case study

Problem: a small coaching academy needed a professional website and a way for students to track progress.
Solution: a responsive React site plus a student portal with sign-up, sign-in and saved progress.
Stack: React, Vite, Tailwind CSS, Framer Motion, Node.js, Express, MongoDB, JWT.
Live demo: add link here. Demo login: add email and password here.
