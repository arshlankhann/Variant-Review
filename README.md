# 🌐 Variant Review Web App

An **AI-driven, clinician-facing variant review platform** that ingests VCF files (mocked), presents genetic variants for human-in-the-loop review, and exports a polished PDF report of approved variants.

🚀 **Live Demo**: [variant-review.vercel.app](https://variant-review.vercel.app/)

---

## 📖 Table of Contents

* [Overview](#overview)
* [✨ Features](#-features)
* [⚙️ Architecture](#️-architecture)
* [🛠 Tech Stack](#-tech-stack)
* [📂 Directory Structure](#-directory-structure)
* [💻 Local Setup](#-local-setup)
* [🔑 Environment Variables](#-environment-variables)
* [🧪 Mock Data](#-mock-data)
* [▶️ Running the App](#️-running-the-app)
* [📡 API Contracts](#-api-contracts)
* [📑 PDF Generation](#-pdf-generation)
* [☁️ Deployment](#️-deployment)
* [🎨 Design & UX Notes](#-design--ux-notes)
* [🧾 Testing](#-testing)
* [🧹 Code Quality](#-code-quality)
* [🔒 Security & Privacy](#-security--privacy)
* [🐛 Troubleshooting](#-troubleshooting)
* [🛣 Roadmap](#-roadmap)
* [📜 License](#-license)

---

## Overview

This project demonstrates a **minimal full-stack genomics variant review workflow**. Instead of parsing a real VCF, the app uses a **mock dataset** of 10–15 variants. Clinicians or reviewers can:

1. Upload a `.vcf` file (mocked ingestion flow).
2. View variants in a **responsive table** with key clinical columns.
3. Click a row to open a **side panel** with more evidence.
4. **Approve** or **Reject** each variant.
5. Generate and download a **professional PDF report** of approved variants.

---

## ✨ Features

* 📂 **VCF Upload** (mocked ingestion)
* 📊 **Variant Table** with sorting & filtering
* 🔎 **Evidence Drawer** (mocked JSON evidence)
* ✅ **Approve/Reject** review flow
* 📑 **PDF Report** generation (download)
* 🎨 **Clean UI** with TailwindCSS
* 📱 **Responsive design** for desktop & mobile

---

## ⚙️ Architecture

```
apps/
  fronted/   # React frontend
  backend/   # Express backend
```

* **Frontend** (React + TailwindCSS): UI, state management, client-side PDF generation.
* **Backend** (Node.js + Express): serves mock data, file upload, evidence lookup.

---

## 🛠 Tech Stack

**Frontend**

* React (JavaScript)
* TailwindCSS
* Context API or simple state hooks
* jsPDF

**Backend**

* Node.js
* Express
* cors, multer, zod

**Tooling**

* JavaScript (ES6+)
* ESLint + Prettier
* Jest + React Testing Library

---


## 💻 Local Setup

### Prerequisites

* Node.js >= 18
* npm or yarn

### Install Dependencies

```bash
npm install
```

### Setup Environment Variables

**apps/client/.env.local**

```
REACT_APP_API_BASE_URL=http://localhost:4000
```

**apps/server/.env**

```
PORT=4000
CORS_ORIGIN=http://localhost:3000
```

---

## 🧪 Mock Data

Example variant entry:

```json
{
  "variant_id": "rs121913530",
  "gene": "MLH1",
  "clinvar_status": "Pathogenic",
  "frequency": 0.002,
  "classification": "Likely Pathogenic"
}
```

---

## ▶️ Running the App

### Start Backend

```bash
cd backend
npm run dev
```

### Start Frontend

```bash
cd frontend
npm run dev
```

---

## 📡 API Contracts

### GET `/variants`

Returns variant list.

### GET `/evidence/:variant_id`

Returns evidence for a variant.

### POST `/upload`

Accepts `.vcf` file (mocked).

---

## 📑 PDF Generation

Uses **jsPDF** to generate clean tabular reports.

```js
const doc = new jsPDF()
doc.text('Variant Review Report', 14, 18)
autoTable(doc, {
  head: [['Gene', 'Variant ID', 'Classification']],
  body: approvedVariants
})
doc.save('variant-review.pdf')
```

---

## ☁️ Deployment

* **Frontend**: Vercel → [variant-review.vercel.app](https://variant-review.vercel.app/)
* **Backend**: Render / Railway / Fly.io

---

## 🎨 Design & UX Notes

* Modern clinician-friendly UI
* Drawer-based evidence review
* Approve/Reject status badges
* Mobile-responsive Tailwind styling

---

## 🧾 Testing

* Unit tests (Jest)
* Component tests (React Testing Library)
* API tests (supertest)

---

## 🧹 Code Quality

* ESLint + Prettier
* Clear component props and modular design

---

## 🔒 Security & Privacy

* No real patient data, only mocks
* Input validation on backend
* CORS restricted in production

---

## 🐛 Troubleshooting

* **CORS issues** → check `CORS_ORIGIN`
* **API not reachable** → verify `REACT_APP_API_BASE_URL`
* **Empty PDF** → approve at least one variant

---

## 🛣 Roadmap

* ✅ Current: mock JSON + PDF export
* 🔜 Real VCF parsing
* 🔜 Authentication & roles
* 🔜 Database persistence
* 🔜 Audit logs & ACMG automation

---

## 📜 License

MIT © 2025
