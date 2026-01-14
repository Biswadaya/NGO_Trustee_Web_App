# Deployment Guide

This guide outlines the steps to deploy the **NGO Trustee Web App** using **Vercel** for the frontend and **Render/Railway** for the backend.

## 🏗️ Architecture Overview

- **Frontend:** React (Vite) -> Deployed on **Vercel**
- **Backend:** Node.js (Express) -> Deployed on **Render** or **Railway**
- **Database:** PostgreSQL -> Hosted on **Aiven** (Existing)
- **Caching:** Redis -> Hosted on **Redis Cloud** (Existing)

---

## 🚀 Part 1: Backend Deployment (Render/Railway)

We recommend deploying the backend first so you have the live API URL to configure the frontend.

### Option A: Deploy on Render (Recommended for Free Tier)

1.  **Push Code to GitHub:** Ensure your project is pushed to a GitHub repository.
2.  **Create Web Service:**
    - Log in to [Render](https://dashboard.render.com/).
    - Click **New +** -> **Web Service**.
    - Connect your GitHub repository.
3.  **Configure Service:**
    - **Root Directory:** `server-app` (Important! Current root is the repo root, backend is in `server-app`)
    - **Environment:** Node
    - **Build Command:** `npm install && npm run build` (or just `npm install` if you compile TS in start)
        - *Note:* Our `npm start` runs `node dist/server.js`, so we need to run `npm run build` (tsc) first.
        - **Better Build Command:** `npm install && npx prisma generate && npm run build`
    - **Start Command:** `npm start`
4.  **Environment Variables:**
    Add the following Environment Variables in the Render dashboard:
    - `NODE_ENV`: `production`
    - `DATABASE_URL`: (Your Aiven PostgreSQL URL)
    - `REDIS_URL`: (Your Redis Cloud URL)
    - `JWT_SECRET`: (Generate a strong secret)
    - `JWT_REFRESH_SECRET`: (Generate a strong secret)
    - `CLOUDINARY_CLOUD_NAME`, `API_KEY`, `API_SECRET`: (Your credentials)
    - `STRIPE_SECRET_KEY`: (Your Stripe Key)
    - `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_FROM`: (SMTP details)
5.  **Deploy:** Click **Create Web Service**.
6.  **Copy URL:** Once deployed, copy the backend URL (e.g., `https://ngo-backend.onrender.com`).

### Option B: Deploy on Railway

1.  **New Project:** Go to [Railway](https://railway.app/) and create a **New Project** -> **Deploy from GitHub repo**.
2.  **Select Repo:** Choose your NGO repository.
3.  **Configure Root Directory:**
    - Go to **Settings** -> **Root Directory**.
    - Set it to `/server-app`.
4.  **Build & Start:**
    - Railway automatically detects `package.json`.
    - Ensure `npm run build` runs `tsc`.
    - Ensure `npm start` runs `node dist/server.js`.
    - Add a **Custom Build Command** if needed: `npm install && npx prisma generate && npm run build`.
5.  **Variables:**
    - Go to **Variables** tab.
    - Add all variables listed in the Render section above.
6.  **Public Domain:**
    - Go to **Settings** -> **Networking** -> **Generate Domain**.
    - Copy this URL.

---

## 🌐 Part 2: Frontend Deployment (Vercel)

1.  **Import Project:**
    - Log in to [Vercel](https://vercel.com/).
    - Click **Add New...** -> **Project**.
    - Import your GitHub repository.
2.  **Project Configuration:**
    - **Framework Preset:** Vite
    - **Root Directory:** Edit this and select `client-app`.
3.  **Build Settings:**
    - **Build Command:** `npm run build` (Default)
    - **Output Directory:** `dist` (Default)
4.  **Environment Variables:**
    - Add the API URL from Part 1:
    - `VITE_API_URL`: `https://your-backend-url.onrender.com/api/v1` (Don't forget the `/api/v1` suffix if your endpoints expect it!)
5.  **Deploy:** Click **Deploy**.
6.  **Verify:** Visit the deployed Vercel URL.

---

## ✅ Post-Deployment Checks

1.  **CORS:** If you encounter CORS errors on the frontend:
    - Go to your backend code (`server-app/src/app.ts` or `server.ts`).
    - Update the `cors` configuration to allow your Vercel domain.
    - *Quick Fix:* Set `origin: '*'` temporarily or add `process.env.CLIENT_URL` and set that var in Render/Railway.

2.  **Database Migrations:**
    - The build command `npx prisma generate` creates the client.
    - To apply migrations in production:
        - Add `npx prisma migrate deploy` to your build command, or
        - Run it manually via the platform's console/shell.

3.  **Health Check:**
    - Visit `https://your-backend.com/api/v1/health` (if you have a health route) or try logging in.

## 📁 Configuration Added
- **`client-app/vercel.json`**: Added to handle SPA routing (rewrites requests to `index.html`).
- **`server-app/Procfile`**: Added for platform compatibility.
