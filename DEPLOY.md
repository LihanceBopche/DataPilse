# 🚀 DataPulse — Deployment Guide (Simple Hindi Mein)

## Kya Deploy Karna Hai?

```
MongoDB Atlas  ← Free cloud database
     ↑
Render.com     ← Free backend hosting (Node.js)
     ↑
Vercel         ← Free frontend hosting (React)
```

**Teen cheezein deploy karni hain — sab FREE hain!**

---

## STEP 1 — MongoDB Atlas (Database Cloud Pe)

### A. Account Banao

1. Jao: **https://www.mongodb.com/atlas/database**
2. "Try Free" pe click karo
3. Google se sign up karo (sabse aasaan)

### B. Free Cluster Banao

1. Login ke baad "Build a Database" click karo
2. **FREE (M0)** plan choose karo
3. Provider: **AWS**, Region: **Mumbai (ap-south-1)** (ya koi bhi)
4. Cluster Name: `Cluster0` (default theek hai)
5. **"Create" pe click karo** — 2-3 minute wait karo

### C. Database User Banao

1. Left menu mein **"Database Access"** pe jao
2. **"Add New Database User"** click karo
3. Username: `dashboarduser`
4. Password: Koi strong password (note karke rakho!)
5. Role: **"Read and write to any database"**
6. **"Add User"** click karo

### D. Network Access Set Karo

1. Left menu mein **"Network Access"** pe jao
2. **"Add IP Address"** click karo
3. **"Allow Access From Anywhere"** click karo → `0.0.0.0/0` aayega
4. **"Confirm"** click karo

> ⚠️ Yeh production mein security issue hai, lekin shuru karne ke liye theek hai.

### E. Connection String Lao

1. Left menu mein **"Database"** pe jao
2. Cluster ke paas **"Connect"** click karo
3. **"Drivers"** choose karo
4. **Node.js** select karo
5. Connection string copy karo — kuch aisa dikhega:

```
mongodb+srv://dashboarduser:<password>@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
```

6. `<password>` ki jagah apna real password daalo
7. URL ke end mein database name bhi daalo:

```
mongodb+srv://dashboarduser:MyPass123@cluster0.abc123.mongodb.net/dashboard_db?retryWrites=true&w=majority
```

**Yeh connection string save kar lo — aage kaam aayegi!**

---

## STEP 2 — GitHub Pe Code Upload Karo

> Render aur Vercel GitHub se directly deploy karte hain.

### A. `.gitignore` File Banao

`d:\my_project\` folder mein ek file banao `.gitignore`:

```
# Server
server/node_modules/
server/.env

# Client
client/node_modules/
client/.env
client/dist/
```

### B. GitHub Pe Repository Banao

1. Jao: **https://github.com**
2. Account nahi hai → "Sign up" karo (free)
3. **"New repository"** click karo (+ button, top right)
4. Name: `datapulse-dashboard`
5. **Public** rakho
6. **"Create repository"** click karo

### C. Code Upload Karo

Apne computer mein `d:\my_project` folder mein PowerShell kholo aur yeh commands chalao:

```powershell
cd d:\my_project
git init
git add .
git commit -m "Initial commit - DataPulse Dashboard"
git branch -M main
git remote add origin https://github.com/TUMHARA_USERNAME/datapulse-dashboard.git
git push -u origin main
```

> `TUMHARA_USERNAME` ki jagah apna GitHub username daalo.

**GitHub pe jao aur check karo — saara code wahan dikhna chahiye!**

---

## STEP 3 — Render Pe Backend Deploy Karo

### A. Account Banao

1. Jao: **https://render.com**
2. **"Get Started for Free"** click karo
3. **GitHub se sign up karo** (GitHub wala button)

### B. New Web Service Banao

1. Dashboard mein **"New +"** click karo
2. **"Web Service"** choose karo
3. Apni GitHub repo ko **"Connect"** karo
4. `datapulse-dashboard` dikh rahi hogi — **"Connect"** click karo

### C. Service Settings

Yeh settings bharo:

| Setting | Value |
|---------|-------|
| **Name** | `datapulse-backend` |
| **Root Directory** | `server` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `node server.js` |
| **Instance Type** | `Free` |

### D. Environment Variables Daalo

"Environment Variables" section mein yeh sab ek ek karke daalo:

| Key | Value |
|-----|-------|
| `MONGO_URI` | (Atlas connection string jo copy ki thi) |
| `JWT_SECRET` | `koi_bhi_lamba_random_string_jaise_abc123xyz789` |
| `JWT_EXPIRES_IN` | `7d` |
| `NODE_ENV` | `production` |
| `CLIENT_URL` | (Pehle khali rakho, Vercel deploy ke baad update karenge) |

### E. Deploy Karo

**"Create Web Service"** click karo.

- Render deploy shuru karega — 3-5 minute lagenge
- Logs mein `🚀 Server running` aur `✅ MongoDB Connected` dikhna chahiye

**Render aapko ek URL dega jaise:**
```
https://datapulse-backend.onrender.com
```

**Yeh URL save kar lo!**

### F. MongoDB Mein Seed Data Daalo

Render deploy hone ke baad, apne local computer pe yeh command chalao with Atlas URI:

```powershell
cd d:\my_project\server
# .env mein MONGO_URI ko Atlas wali string se badlo, phir:
node seed.js
```

> Ya seedhi Atlas URI environment variable set karke:
```powershell
$env:MONGO_URI="mongodb+srv://dashboarduser:password@cluster0.xxx.mongodb.net/dashboard_db"
node seed.js
```

---

## STEP 4 — Vercel Pe Frontend Deploy Karo

### A. Account Banao

1. Jao: **https://vercel.com**
2. **"Sign Up"** → **"Continue with GitHub"**

### B. New Project Import Karo

1. Dashboard mein **"Add New... → Project"** click karo
2. GitHub repo `datapulse-dashboard` dikh rahi hogi
3. **"Import"** click karo

### C. Project Settings

| Setting | Value |
|---------|-------|
| **Root Directory** | `client` |
| **Framework Preset** | `Vite` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

### D. Environment Variables Daalo

"Environment Variables" section mein:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://datapulse-backend.onrender.com/api` |

> ⚠️ `datapulse-backend.onrender.com` ki jagah apna Render URL daalo!

### E. Deploy Karo

**"Deploy"** click karo!

- 2-3 minute mein deploy ho jayega
- Vercel ek URL dega jaise:

```
https://datapulse-dashboard.vercel.app
```

---

## STEP 5 — Final: Render Pe CLIENT_URL Update Karo

Yeh bahut zaroori hai — warna CORS error aayega!

1. Render dashboard mein jao
2. `datapulse-backend` service open karo
3. **"Environment"** tab pe jao
4. `CLIENT_URL` variable edit karo:
   - Value: `https://datapulse-dashboard.vercel.app`
5. Save karo → Render automatically redeploy karega

---

## ✅ Test Karo

1. Vercel URL kholo: `https://datapulse-dashboard.vercel.app`
2. Signup karo → Dashboard khulna chahiye
3. Graphs mein MongoDB Atlas ka data dikhna chahiye
4. Login/Logout test karo

---

## 🔄 Aage Code Update Kaise Karein?

Jab bhi code mein changes karo, sirf yeh karo:

```powershell
cd d:\my_project
git add .
git commit -m "Changes ka description"
git push
```

**GitHub push hote hi:**
- **Render** automatically backend redeploy karega
- **Vercel** automatically frontend redeploy karega

**Zero manual kaam!** 🎉

---

## ❗ Common Problems aur Solutions

### Problem 1: "CORS Error" frontend pe

**Cause:** `CLIENT_URL` Render pe sahi nahi set ki
**Fix:** Render > Environment > `CLIENT_URL` = exact Vercel URL (https:// ke saath)

---

### Problem 2: "Cannot connect to MongoDB"

**Cause:** Atlas Network Access sahi nahi
**Fix:** MongoDB Atlas > Network Access > `0.0.0.0/0` allow karo

---

### Problem 3: Graphs mein data nahi aata

**Cause:** Seed script Atlas pe nahi chala
**Fix:** Local se `MONGO_URI` Atlas wali set karke `node seed.js` chalao

---

### Problem 4: Render free tier — site slow hai

**Cause:** Free tier 15 min inactivity ke baad "sleep" ho jaata hai
**Fix:** Pehli request slow hogi (30 sec), uske baad normal. Paid plan se fix hoga.

---

### Problem 5: Vercel deploy fail ho raha hai

**Check karo:** `VITE_API_URL` environment variable sahi set hai?
Format: `https://RENDER-URL.onrender.com/api` (`/api` end mein zaroori hai)

---

## 💰 Paise Kitne Lagenge?

| Service | Free Tier |
|---------|-----------|
| **MongoDB Atlas** | 512MB storage — FREE |
| **Render** | 750 hrs/month — FREE (bas thoda slow) |
| **Vercel** | Unlimited projects — FREE |

**Total cost = ₹0** (Shuru mein) ✅

---

## 📋 Deployment Checklist

```
[ ] MongoDB Atlas account bana
[ ] Free cluster bana (Mumbai region)
[ ] Database user bana (username + password)
[ ] Network Access mein 0.0.0.0/0 allow kiya
[ ] Connection string copy ki

[ ] .gitignore banaya
[ ] GitHub repo banaya
[ ] Code push kiya (git push)

[ ] Render account bana (GitHub se)
[ ] Web Service banaya (root: server)
[ ] Environment variables daale (MONGO_URI, JWT_SECRET, etc.)
[ ] Deploy kiya — logs check kiye
[ ] Render URL note kiya

[ ] node seed.js chalaya (Atlas URI se)

[ ] Vercel account bana (GitHub se)
[ ] Project import kiya (root: client)
[ ] VITE_API_URL daali (Render URL + /api)
[ ] Deploy kiya — Vercel URL note kiya

[ ] Render pe CLIENT_URL = Vercel URL update kiya
[ ] Final test: signup → dashboard → graphs
```
