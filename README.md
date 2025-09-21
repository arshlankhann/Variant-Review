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
