# 📊 DataPulse — React + Node.js + MongoDB Dashboard

A production-ready full-stack analytics dashboard with JWT authentication and live charts.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB running locally (or MongoDB Atlas)

---

### 1. Setup Backend

```bash
cd server
npm install
```

Copy env file:
```bash
copy .env.example .env
```

> Edit `.env` if you use MongoDB Atlas — change `MONGO_URI` to your Atlas connection string.

Seed the database with demo data:
```bash
node seed.js
```

Start the backend:
```bash
npm run dev
```
Backend runs at → **http://localhost:5000**

---

### 2. Setup Frontend

Open a new terminal:

```bash
cd client
npm install
npm run dev
```
Frontend runs at → **http://localhost:5173**

---

## 🔐 Authentication

| Endpoint | Method | Access |
|----------|--------|--------|
| `/api/auth/signup` | POST | Public |
| `/api/auth/login`  | POST | Public |
| `/api/auth/me`     | GET  | Private (JWT) |

---

## 📊 Dashboard API

All endpoints require `Authorization: Bearer <token>` header.

| Endpoint | Data |
|----------|------|
| `/api/dashboard/stats`      | KPI cards (users, revenue, sales) |
| `/api/dashboard/revenue`    | 12-month revenue → Line Chart |
| `/api/dashboard/sales`      | 12-month sales → Bar Chart |
| `/api/dashboard/categories` | Category split → Donut Chart |
| `/api/dashboard/userstats`  | User growth → Area Chart |

---

## 📁 Project Structure

```
my_project/
├── client/          ← React 18 + Vite frontend
│   └── src/
│       ├── pages/   ← Login, Signup, Dashboard
│       ├── components/charts/  ← 4 chart components
│       ├── context/ ← AuthContext
│       └── services/← Axios API client
│
└── server/          ← Node.js + Express backend
    ├── models/      ← User, Revenue, Sales, UserStats, Category
    ├── routes/      ← auth.js, dashboard.js
    ├── middleware/  ← JWT authMiddleware
    ├── controllers/ ← authController, dashboardController
    ├── config/      ← MongoDB connection
    └── seed.js      ← Demo data seeder
```

---

## 🛠️ Tech Stack

| | Technology |
|-|-----------|
| Frontend | React 18, Vite, React Router v6 |
| Charts | Recharts (Line, Bar, Pie, Area) |
| Auth | JWT + bcryptjs |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Security | helmet, cors, express-rate-limit |
