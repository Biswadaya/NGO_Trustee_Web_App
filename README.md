# NGO Trustee Web App

A comprehensive web application designed for managing NGO operations, including trustee management, volunteer coordination, event organization, and donation processing.

## 🚀 Features

*   **User Management**: Role-based access control for Admins, Managers, Volunteers, and Donors.
*   **Volunteer Coordination**: Manage volunteer profiles, tasks, groups, and ID cards (with QR codes).
*   **Event Management**: Create and manage events with details like capacity, location, and categories.
*   **Donations**: Secure donation processing with stripe integration (campaign-based and general).
*   **Campaigns**: Create fundraising campaigns with goals and progress tracking.
*   **Communication**: Internal messaging system and notice board for announcements.
*   **Reporting**: Transparency reports and certificate generation.
*   **Files**: File management system for uploading documents and images.
*   **Internationalization**: Multi-language support (English, Hindi, Odia).

## 🛠️ Tech Stack

### Client App
*   **Framework**: React 19 (via Vite)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS v4, Radix UI (Primitives)
*   **State Management**: TanStack Query (React Query)
*   **Forms**: React Hook Form, Zod, Formik, Yup
*   **Routing**: React Router DOM v7
*   **Utilities**: date-fns, axios, framer-motion, lucide-react, i18next

### Server App
*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Language**: TypeScript
*   **Database**: PostgreSQL
*   **ORM**: Prisma
*   **Caching/Queue**: Redis
*   **Authentication**: JWT, bcryptjs
*   **Real-time**: Socket.io
*   **Other Tools**: Nodemailer (Email), Multer (Uploads), PDFKit (PDFs), ExcelJS (Excel exports), Stripe (Payments)

## 📋 Prerequisites

Ensure you have the following installed on your local machine:
*   [Node.js](https://nodejs.org/) (v18 or higher recommended)
*   [PostgreSQL](https://www.postgresql.org/)
*   [Redis](https://redis.io/)

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd NGO_Trustee_Web_App/NGO_Trustee_Web_App
```

### 2. server-app Setup
Navigate to the server directory and install dependencies:
```bash
cd server-app
npm install
```

**Environment Variables**:
Create a `.env` file in `server-app` and configure the necessary variables (Database URL, JWT Secret, Cloudinary credentials, Stripe keys, etc.).
Example:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/ngo_db?schema=public"
PORT=5000
JWT_SECRET=your_secret_key
# Add other service keys (Stripe, Cloudinary, Email)
```

**Database Migration**:
Run Prisma migrations to set up the database schema:
```bash
npx prisma migrate dev
```

**Start the Server**:
```bash
npm run dev
```

### 3. client-app Setup
Open a new terminal, navigate to the client directory and install dependencies:
```bash
cd ../client-app
npm install
```

**Start the Client**:
```bash
npm run dev
```
The application should now be running at `http://localhost:5173` (or the port shown in the terminal).

## 🤝 Contributing

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature`).
3.  Commit your changes (`git commit -m 'Add some feature'`).
4.  Push to the branch (`git push origin feature/YourFeature`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License.
