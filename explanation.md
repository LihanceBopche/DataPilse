# 📘 DataPulse Project — Complete Explanation (Simple Hindi Mein)

---

## 🧠 Project Kya Hai?

**DataPulse** ek **Full-Stack Web Application** hai jisme:
- User **Login/Signup** kar sakta hai (Authentication)
- Login ke baad ek **Dashboard** dikhta hai
- Dashboard mein **4 types ke graphs** hain
- Graphs mein **live data** MongoDB database se aata hai
- Har **30 seconds** mein data automatically refresh hota hai

---

## 🏗️ Project Ki 3 Main Layers

```
┌─────────────────────────────────────────────────────┐
│  FRONTEND (React)  — Jo user dekhta hai             │
│  Port: 5173        — http://localhost:5173           │
├─────────────────────────────────────────────────────┤
│  BACKEND (Node.js + Express)  — Dimag of the app    │
│  Port: 5000        — http://localhost:5000           │
├─────────────────────────────────────────────────────┤
│  DATABASE (MongoDB)  — Data store karta hai         │
│  Port: 27017       — Local MongoDB                  │
└─────────────────────────────────────────────────────┘
```

**Simple bhasha mein:**
- **Frontend** = Jo dikhta hai (buttons, graphs, forms)
- **Backend** = Jo kaam karta hai (login check, data fetch)
- **Database** = Jo yaad rakhta hai (users, sales data, revenue)

---

## 📁 Project Ka Folder Structure (Poora)

```
my_project/
│
├── server/                      ← BACKEND (Node.js)
│   ├── server.js                ← Main file — server yahan se shuru hota hai
│   ├── seed.js                  ← Demo data MongoDB mein daalta hai
│   ├── .env                     ← Secret settings (password, port, etc.)
│   │
│   ├── config/
│   │   └── db.js                ← MongoDB se connect karta hai
│   │
│   ├── models/                  ← Database ke tables (MongoDB mein "collections")
│   │   ├── User.js              ← User ka data (name, email, password)
│   │   ├── Revenue.js           ← Monthly revenue data
│   │   ├── Sales.js             ← Monthly sales data
│   │   ├── UserStats.js         ← Monthly user growth data
│   │   └── Category.js          ← Product category data
│   │
│   ├── middleware/
│   │   └── authMiddleware.js    ← Check karta hai ki user logged in hai ya nahi
│   │
│   ├── controllers/
│   │   ├── authController.js    ← Signup aur Login ka logic
│   │   └── dashboardController.js ← Charts ka data bhejta hai
│   │
│   └── routes/
│       ├── auth.js              ← /api/auth/... ke routes
│       └── dashboard.js         ← /api/dashboard/... ke routes
│
└── client/                      ← FRONTEND (React)
    └── src/
        ├── main.jsx             ← React app ka shuru hone ka point
        ├── App.jsx              ← Routes define karta hai (kaunsa URL kya dikhaye)
        ├── index.css            ← Poora design system (colors, fonts, cards)
        │
        ├── context/
        │   └── AuthContext.jsx  ← Login info poori app mein share karta hai
        │
        ├── services/
        │   └── api.js           ← Backend se baat karne ke functions
        │
        ├── components/
        │   ├── ProtectedRoute.jsx   ← Login ke bina Dashboard nahi dene deta
        │   ├── Sidebar.jsx          ← Left side ka navigation menu
        │   ├── Navbar.jsx           ← Upar ka header bar
        │   └── charts/
        │       ├── RevenueLineChart.jsx  ← Line graph
        │       ├── SalesBarChart.jsx     ← Bar graph
        │       ├── CategoryPieChart.jsx  ← Pie/Donut graph
        │       └── UserGrowthAreaChart.jsx ← Area graph
        │
        └── pages/
            ├── Login.jsx        ← Login ka page
            ├── Signup.jsx       ← Signup ka page
            └── Dashboard.jsx    ← Main dashboard page
```

---

## 🔐 Authentication System (Login/Signup) Kaise Kaam Karta Hai?

### Step-by-step:

```
User → Form bharta hai → Backend check karta hai → JWT Token milta hai → Dashboard khulta hai
```

### 1. Signup (Naya Account Banana)

```
User: Name, Email, Password daalta hai
   ↓
Backend: Email already exist karta hai? → Agar yes → Error batao
   ↓
Backend: Password ko bcryptjs se HASH karta hai
         (Real password kabhi save nahi hota — sirf encrypted version)
   ↓
MongoDB: Naya user save hota hai
   ↓
Backend: JWT Token generate karta hai (ek secret key jaisi)
   ↓
Frontend: Token localStorage mein save hota hai
   ↓
User: Dashboard pe redirect ho jata hai ✅
```

### 2. Login (Purana Account)

```
User: Email + Password daalta hai
   ↓
Backend: Email se user dhundta hai MongoDB mein
   ↓
Backend: bcryptjs se password match karta hai
         (Encrypted password se compare)
   ↓
Agar match → JWT Token milta hai
Agar nahi match → "Invalid credentials" error
   ↓
Frontend: Token localStorage mein save → Dashboard open
```

### 3. JWT Token Kya Hota Hai?

JWT = **JSON Web Token** — ek secret code jaisa hota hai.

```
Socho: Token = Library Card
- Library card milne ka matlab = tumhe andar jaane ki permission hai
- Har baar andar jaao → card dikhao
- Card expire ho jaye → dobara login karo
```

**Hamare app mein:** Token 7 din mein expire hota hai.

---

## 🛡️ Middleware — Security Guard

`authMiddleware.js` ek **security guard** ki tarah kaam karta hai.

```
User: /api/dashboard/revenue pe request bhejta hai
   ↓
Middleware check karta hai: "Kya request mein valid token hai?"
   ↓
Agar token hai aur valid hai → Request aage jaane do ✅
Agar token nahi hai         → "401 Access Denied" ❌
Agar token expired hai      → "401 Invalid Token" ❌
```

---

## 🌐 Saare API Endpoints (Backend Routes)

### 🔓 PUBLIC Routes (Bina Login Ke)

---

#### `POST /api/auth/signup`
**Kaam:** Naya user register karta hai

**Request (Jo bhejna hota hai):**
```json
{
  "name": "Ali Khan",
  "email": "ali@example.com",
  "password": "mypassword123"
}
```

**Response (Jo milta hai - Success):**
```json
{
  "success": true,
  "message": "Account created successfully.",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "664abc...",
    "name": "Ali Khan",
    "email": "ali@example.com",
    "role": "user"
  }
}
```

**Response (Error - Email already exists):**
```json
{
  "success": false,
  "message": "An account with this email already exists."
}
```

---

#### `POST /api/auth/login`
**Kaam:** Existing user ko login karta hai

**Request:**
```json
{
  "email": "ali@example.com",
  "password": "mypassword123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Login successful.",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "664abc...",
    "name": "Ali Khan",
    "email": "ali@example.com"
  }
}
```

**Response (Wrong Password):**
```json
{
  "success": false,
  "message": "Invalid email or password."
}
```

---

### 🔒 PRIVATE Routes (Login Zaroori Hai)

> Yeh sab routes use karne ke liye request mein yeh header bhejna hota hai:
> `Authorization: Bearer <token>`

---

#### `GET /api/auth/me`
**Kaam:** Logged in user ki apni info milti hai

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "664abc...",
    "name": "Ali Khan",
    "email": "ali@example.com",
    "role": "user",
    "createdAt": "2024-01-15T..."
  }
}
```

**Kab use hota hai?** Jab page reload hota hai — app check karta hai ki token valid hai ya nahi.

---

#### `GET /api/dashboard/stats`
**Kaam:** Dashboard ke upar wale 4 KPI cards ka data

**Response:**
```json
{
  "success": true,
  "data": {
    "totalUsers": 3593,
    "totalRevenue": 819900,
    "totalSales": 6010,
    "activeUsers": 2950,
    "revenueGrowth": 15.4
  }
}
```

**Har value kahan se aati hai:**
- `totalUsers` → Users collection mein total documents count
- `totalRevenue` → Revenue collection ke saare amounts ka sum
- `totalSales` → Sales collection ke saare units ka sum
- `activeUsers` → Last month ki UserStats se
- `revenueGrowth` → Last 2 months ka % difference

---

#### `GET /api/dashboard/revenue`
**Kaam:** Line Chart ke liye monthly revenue data

**Response:**
```json
{
  "success": true,
  "data": [
    { "month": "Jan", "year": 2024, "amount": 42000, "target": 40000 },
    { "month": "Feb", "year": 2024, "amount": 47500, "target": 45000 },
    { "month": "Mar", "year": 2024, "amount": 53200, "target": 50000 },
    ...12 months
  ]
}
```

**Chart mein:** `amount` = blue line, `target` = dashed purple line

---

#### `GET /api/dashboard/sales`
**Kaam:** Bar Chart ke liye monthly sales data

**Response:**
```json
{
  "success": true,
  "data": [
    { "month": "Jan", "year": 2024, "units": 320, "returns": 12 },
    { "month": "Feb", "year": 2024, "units": 380, "returns": 15 },
    ...
  ]
}
```

**Chart mein:** `units` = colored bars, `returns` = red bars

---

#### `GET /api/dashboard/userstats`
**Kaam:** Area Chart ke liye user growth data

**Response:**
```json
{
  "success": true,
  "data": [
    { "month": "Jan", "year": 2024, "newUsers": 120, "totalUsers": 1200, "activeUsers": 980 },
    { "month": "Feb", "year": 2024, "newUsers": 145, "totalUsers": 1345, "activeUsers": 1100 },
    ...
  ]
}
```

**Chart mein:** 3 alag area lines — Total, Active, New users

---

#### `GET /api/dashboard/categories`
**Kaam:** Donut/Pie Chart ke liye category data

**Response:**
```json
{
  "success": true,
  "data": [
    { "name": "Electronics", "value": 38, "color": "#6366f1" },
    { "name": "Clothing",    "value": 24, "color": "#8b5cf6" },
    { "name": "Furniture",   "value": 18, "color": "#a78bfa" },
    { "name": "Books",       "value": 12, "color": "#c4b5fd" },
    { "name": "Others",      "value": 8,  "color": "#ddd6fe" }
  ]
}
```

**Chart mein:** Har slice ek category hai — `value` = % size

---

## 🗄️ MongoDB Models (Database Tables)

### 1. User Model (`models/User.js`)

```
Field       Type      Kaam
─────────────────────────────────────────
name        String    User ka naam
email       String    Unique email address
password    String    Hashed password (plain kabhi nahi)
role        String    "user" ya "admin"
lastLogin   Date      Aakhri baar kab login kiya
createdAt   Date      Account kab bana (auto)
updatedAt   Date      Kab update hua (auto)
```

> **Special:** Password save hone se pehle automatically hash hota hai (bcrypt)

---

### 2. Revenue Model (`models/Revenue.js`)

```
Field    Type    Kaam
─────────────────────────────
month    String  "Jan", "Feb", etc.
year     Number  2024
amount   Number  Is month ki revenue (USD mein)
target   Number  Is month ka target revenue
```

---

### 3. Sales Model (`models/Sales.js`)

```
Field     Type    Kaam
───────────────────────────────
month     String  "Jan", "Feb", etc.
year      Number  2024
units     Number  Kitne products bike
returns   Number  Kitne wapas aaye
category  String  Kaunsi category ka
```

---

### 4. UserStats Model (`models/UserStats.js`)

```
Field        Type    Kaam
─────────────────────────────────
month        String  "Jan", "Feb", etc.
year         Number  2024
newUsers     Number  Is month kitne naye user aaye
totalUsers   Number  Ab tak total kitne user hain
activeUsers  Number  Is month kitne active the
```

---

### 5. Category Model (`models/Category.js`)

```
Field  Type    Kaam
─────────────────────────────
name   String  Category ka naam (Electronics, etc.)
value  Number  Percentage (38 matlab 38%)
color  String  Graph mein kaunsa color dikhaye
```

---

## ⚛️ Frontend Pages aur Components

### 📄 `pages/Login.jsx` — Login Page

**Kya karta hai:**
1. Email aur Password ka form dikhata hai
2. Submit pe validation karta hai (khaali fields check)
3. Backend ko API call karta hai
4. Token milne pe Dashboard pe le jaata hai
5. Error hone pe toast notification dikhata hai

---

### 📄 `pages/Signup.jsx` — Signup Page

**Kya karta hai:**
1. Name, Email, Password, Confirm Password form
2. Validate karta hai — password match, min length, valid email
3. Backend ko request bhejta hai
4. Success pe token save karke Dashboard kholta hai

---

### 📄 `pages/Dashboard.jsx` — Main Dashboard

**Kya karta hai:**
1. **Shuru mein** — 5 API calls ek saath karta hai (stats + 4 charts)
2. **KPI Cards** dikhata hai — Total Users, Revenue, Sales, Active Users
3. **4 Charts** render karta hai live MongoDB data se
4. **Har 30 second** mein automatically data refresh hota hai
5. **Sidebar** se alag section select karne pe sirf wo chart full size mein dikhata hai

---

### 🧩 `components/Sidebar.jsx` — Left Menu

**Kya karta hai:**
1. Navigation links dikhata hai (Dashboard, Revenue, Sales, Users, Categories)
2. Active section ko highlight karta hai
3. Neeche user ka naam aur role dikhata hai
4. Logout button hai
5. Mobile pe hamburger menu se open/close hota hai

---

### 🧩 `components/Navbar.jsx` — Top Bar

**Kya karta hai:**
1. Current section ka title dikhata hai
2. "Live" badge dikhata hai (green blinking dot)
3. Last refresh time dikhata hai
4. Refresh button — click pe data reload
5. Mobile pe hamburger button

---

### 🧩 `components/ProtectedRoute.jsx` — Route Guard

**Kya karta hai:**
```
User /dashboard pe jaana chahta hai
   ↓
ProtectedRoute check karta hai: "Kya user logged in hai?"
   ↓
Agar haan → Dashboard dikha do ✅
Agar nahi → Login page pe bhej do ❌
```

---

### 🧩 `context/AuthContext.jsx` — Global Login State

**Kya karta hai:**

Socho ek **global store** hai jahan login info rakhi jaati hai.

```
Login hone pe:
- Token localStorage mein save hota hai
- User info memory mein rakhi jaati hai
- Poori app ko pata hota hai ki user logged in hai

Logout hone pe:
- Token localStorage se hata diya jaata hai
- User info clear ho jaati hai
- Automatically /login pe redirect
```

**Page reload hone pe:**
- App check karta hai: "localStorage mein token hai?"
- Agar hai → Backend se verify karta hai
- Valid hai → User logged in rahe
- Invalid → Logout karwa deta hai

---

### 🧩 `services/api.js` — Backend Se Baat Karna

**Kya karta hai:**

Yeh ek **translator** ki tarah kaam karta hai — React components seedha backend se baat nahi karte, yeh file beech mein hoti hai.

```javascript
// Example: Revenue data maangna
dashboardAPI.getRevenue()
→ Internally: GET /api/dashboard/revenue
→ Header mein automatically token lagate hai
→ Response milne pe data return
```

**Important Feature:** Agar kabhi bhi **401 error** aaye (token expire), toh yeh automatically logout kar deta hai aur login page pe bhej deta hai.

---

## 📊 Charon Graphs Detail Mein

### 1. 📈 Revenue Line Chart (`RevenueLineChart.jsx`)

```
Data source: GET /api/dashboard/revenue
Collections: revenues (MongoDB)

X-axis: Months (Jan se Dec)
Y-axis: Amount in $k (42k, 47k, etc.)

Lines:
- Solid purple line   = Actual Revenue (amount)
- Dashed line         = Target Revenue (target)

Kab useful: Dekhte hain ki har month revenue badh raha hai ya nahi
```

---

### 2. 📊 Sales Bar Chart (`SalesBarChart.jsx`)

```
Data source: GET /api/dashboard/sales
Collections: sales (MongoDB)

X-axis: Months
Y-axis: Number of units

Bars:
- Colored bars  = Units Sold (320, 380, etc.)
- Red bars      = Returns (12, 15, etc.)

Kab useful: Dekhte hain ki kitna bika aur kitna wapas aaya
```

---

### 3. 🍩 Category Donut Chart (`CategoryPieChart.jsx`)

```
Data source: GET /api/dashboard/categories
Collections: categories (MongoDB)

Slices:
- Electronics = 38% (purple)
- Clothing    = 24% (violet)
- Furniture   = 18% (light purple)
- Books       = 12% (lavender)
- Others      = 8%  (very light)

Kab useful: Dekhte hain kaunsi category sabse zyada bikti hai
```

---

### 4. 📉 User Growth Area Chart (`UserGrowthAreaChart.jsx`)

```
Data source: GET /api/dashboard/userstats
Collections: userstats (MongoDB)

X-axis: Months
Y-axis: Number of users

3 Area lines with gradient fill:
- Purple area  = Total Users (1200 → 3593)
- Cyan area    = Active Users (980 → 2950)
- Green area   = New Users (120 → 350)

Kab useful: Dekhte hain user base kitni tezi se badhh raha hai
```

---

## 🔒 Security Features

| Feature | Kya Karta Hai |
|---------|--------------|
| **bcryptjs** | Password ko encrypt karta hai — plain password kabhi save nahi hota |
| **JWT Token** | Har API call mein proof hota hai ki user valid hai |
| **Token Expiry** | 7 din baad token expire — dobara login karna padta hai |
| **helmet** | HTTP headers secure karta hai (common attacks se bachata hai) |
| **CORS** | Sirf frontend (`localhost:5173`) ko backend se baat karne deta hai |
| **Rate Limiting** | 15 min mein 100 se zyada login attempts block |
| **ProtectedRoute** | Bina login ke `/dashboard` nahi khulta |

---

## 🌊 Poora Data Flow Ek Baar (End-to-End)

```
1. User browser mein http://localhost:5173 kholta hai

2. App.jsx dekhta hai: "/" → /dashboard redirect

3. ProtectedRoute: "Token hai localStorage mein?"
   - Nahi hai → /login pe bhej do

4. Login page pe user credentials daalta hai

5. api.js: POST /api/auth/login → Backend ko bhejta hai

6. authController.js:
   - MongoDB mein email dhundta hai
   - bcrypt se password verify karta hai
   - JWT token generate karta hai

7. Token frontend ko milta hai → localStorage mein save

8. Dashboard.jsx load hota hai

9. Promise.all se 5 API calls ek saath:
   - /api/dashboard/stats
   - /api/dashboard/revenue
   - /api/dashboard/sales
   - /api/dashboard/userstats
   - /api/dashboard/categories

10. authMiddleware har request pe token verify karta hai

11. dashboardController MongoDB se data fetch karta hai

12. Data frontend ko milta hai

13. React charts render hote hain — Line, Bar, Pie, Area

14. setInterval(30000) → Har 30 sec mein step 9 repeat

15. User sidebar se "Revenue" click karta hai
    → Sirf Revenue chart full screen mein dikhta hai

16. User logout karta hai
    → Token localStorage se delete
    → /login pe redirect
```

---

## 🛠️ Environment Variables (`.env` File)

```env
PORT=5000              ← Backend kaunse port pe chale
MONGO_URI=mongodb://localhost:27017/dashboard_db
                       ← Database ka address
JWT_SECRET=...         ← Token banane ki secret key (kisi ko mat batao)
JWT_EXPIRES_IN=7d      ← Token 7 din mein expire
CLIENT_URL=http://localhost:5173
                       ← CORS ke liye frontend ka address
```

> ⚠️ **Important:** `.env` file kabhi GitHub pe push mat karo — isme secret keys hoti hain!

---

## 🌱 `seed.js` Kya Karta Hai?

```
node seed.js chalate hi:

1. MongoDB se connect hota hai
2. Purana data delete karta hai (revenues, sales, userstats, categories)
3. Naya demo data insert karta hai:
   - 12 months ki revenue
   - 12 months ki sales
   - 12 months ke user stats
   - 5 categories
4. "Seeded successfully!" print karta hai
5. Process exit karta hai
```

**Kab chalana chahiye:**
- Pehli baar app setup karte waqt ✅
- Agar database reset karna ho ✅
- Production mein mat chalao (real data delete ho jayega) ❌

---

## 📌 Quick Reference — Kaunsi File Kya Kaam Karti Hai

| File | Ek Line Explanation |
|------|---------------------|
| `server/server.js` | Server start hota hai, saari settings lagti hain |
| `server/seed.js` | Demo data MongoDB mein daalta hai |
| `server/config/db.js` | MongoDB se connection |
| `server/models/User.js` | Users table ka structure |
| `server/models/Revenue.js` | Revenue table ka structure |
| `server/models/Sales.js` | Sales table ka structure |
| `server/models/UserStats.js` | User stats table ka structure |
| `server/models/Category.js` | Category table ka structure |
| `server/middleware/authMiddleware.js` | Token check karta hai |
| `server/controllers/authController.js` | Login/Signup logic |
| `server/controllers/dashboardController.js` | Charts ka data bhejta hai |
| `server/routes/auth.js` | Auth ke URLs define |
| `server/routes/dashboard.js` | Dashboard ke URLs define |
| `client/src/App.jsx` | React app ka router |
| `client/src/index.css` | Poora design (colors, fonts) |
| `client/src/context/AuthContext.jsx` | Login info poori app share karna |
| `client/src/services/api.js` | Backend se baat karna |
| `client/src/components/ProtectedRoute.jsx` | Dashboard guard |
| `client/src/components/Sidebar.jsx` | Left navigation |
| `client/src/components/Navbar.jsx` | Top header |
| `client/src/pages/Login.jsx` | Login form |
| `client/src/pages/Signup.jsx` | Signup form |
| `client/src/pages/Dashboard.jsx` | Main dashboard + charts |
| `client/src/components/charts/RevenueLineChart.jsx` | Line graph |
| `client/src/components/charts/SalesBarChart.jsx` | Bar graph |
| `client/src/components/charts/CategoryPieChart.jsx` | Donut graph |
| `client/src/components/charts/UserGrowthAreaChart.jsx` | Area graph |
