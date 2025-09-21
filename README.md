# Variant Review

Monorepo with a Node.js Express backend and a React + Vite + Tailwind frontend.

## Structure

backend/
- server.js (HTTP bootstrap)
- src/
  - app.js (Express app)
  - routes/
    - variants.js
    - reports.js
  - controllers/
    - variantsController.js
    - reportsController.js
  - config/
    - upload.js
  - data/
    - mockVariants.js

frontend/
- src/
  - components/
    - ui/
      - card.jsx, button.jsx, input.jsx
  - data/
    - mockData.js
  - App.jsx, main.jsx, styles

## Getting Started

In one terminal, run the backend:

```
cd backend
npm install
npm run dev
```

In another terminal, run the frontend:

```
cd frontend
npm install
npm run dev
```

Backend will listen on port 5000 by default. Frontend runs via Vite.

## Environment Variables

Frontend (`frontend/.env`):
- `VITE_API_BASE_URL` — Base URL of the backend in production, e.g. `https://variant-review-8rt6.vercel.app`.

Backend (`backend/.env`):
- `FRONTEND_ORIGIN` — Allowed frontend origin for CORS, e.g. `https://variant-review.vercel.app`.
- `PORT` — Local port override (optional).

Vercel configuration:
- Set `VITE_API_BASE_URL` in the frontend project to the backend URL.
- Set `FRONTEND_ORIGIN` in the backend project to the frontend URL.
