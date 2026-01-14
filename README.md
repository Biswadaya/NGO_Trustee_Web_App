# NGO Trustee Web App

A comprehensive web-based management system for the National Humanity & Rural Development (NHRD) Trust. This application facilitates donor management, volunteer coordination, event organization, and public outreach through a modern, responsive interface.

## 🚀 Features

### Public Portal
- **Modern UI/UX:** Built with the "Heart of Odisha" design system using TailwindCSS v4 and Framer Motion.
- **Information Pages:** Homepage, About Us, What We Do, Get Involved.
- **Engagement:** Newsletter signup, contact forms, and impactful storytelling.

### Authentication & Roles
- **Secure Auth:** JWT-based authentication with refresh tokens and role-based access control (RBAC).
- **Roles:**
  - **Admin/Super Admin:** Full system control.
  - **Volunteer:** Task management and field reporting.
  - **Donor:** Donation history, ID card generation, event tickets.
  - **Member:** Exclusive resources and task assignments.

### Core Functionality
- **Donation Management:** Integrated payment gateway (Stripe) and donation tracking.
- **Event Management:** Event creation, ticketing, and registration tracking.
- **Volunteer Management:** Task assignment, reporting, and performance tracking.
- **Dashboard:** tailored dashboards for Admins, Volunteers, Donors, and Members.
- **ID Cards:** Automated ID card generation for donors with QR codes.
- **Communications:** Email notifications and automated alerts.

## 🛠️ Tech Stack

### Frontend (`client-app`)
- **Framework:** React 19 (Vite)
- **Styling:** TailwindCSS v4, Shadcn UI
- **State Management:** React Query (@tanstack/react-query), Context API
- **Routing:** React Router v7
- **Animations:** Framer Motion
- **Utilities:** Axios, Date-fns, Zod, React Hook Form

### Backend (`server-app`)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL (via Aiven), Redis (Caching)
- **ORM:** Prisma
- **Real-time:** Socket.io
- **Services:**
  - **Storage:** Cloudinary
  - **Email:** Nodemailer / SMTP
  - **Payments:** Stripe
  - **PDF Generation:** PDFKit

## 📦 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL Database
- Redis Server (optional, for caching)

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd NGO_Trustee_Web_App
```

### 2. Backend Setup
Navigate to the server directory and install dependencies:
```bash
cd server-app
npm install
```

Create a `.env` file in `server-app` (copy `.env.example` if available) and configure your variables:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your_jwt_secret"
JWT_REFRESH_SECRET="your_refresh_secret"
# Add Stripe, Cloudinary, and Email credentials as needed
```

Run database migrations:
```bash
npx prisma generate
npx prisma db push # or npx prisma migrate dev
```

Start the server:
```bash
npm run dev
```

### 3. Frontend Setup
Navigate to the client directory and install dependencies:
```bash
cd client-app
npm install
```

Create a `.env` file in `client-app` if required (e.g., for API base URL):
```env
VITE_API_URL=http://localhost:5000/api/v1
```

Start the development server:
```bash
npm run dev
```

## 📜 Scripts

### Server
- `npm run dev`: Start server in development mode with nodemon.
- `npm start`: Start server in production mode.
- `npm run build`: Compile TypeScript to JavaScript.
- `npm run migrate:dev`: Run Prisma migrations.

### Client
- `npm run dev`: Start Vite development server.
- `npm run build`: Build for production.
- `npm run preview`: Preview production build.

## 🤝 Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📄 License
Attribute to National Humanity & Rural Development (NHRD) Trust.
