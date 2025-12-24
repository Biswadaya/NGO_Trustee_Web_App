import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import DashboardLayout from '@/pages/Dashboard/Layout';
import Overview from '@/pages/Dashboard/Overview';
import Notices from '@/pages/Dashboard/Notices';
import Profile from '@/pages/Dashboard/Profile';
import AdminStats from '@/pages/Dashboard/AdminStats';
import PendingVolunteers from '@/pages/Dashboard/PendingVolunteers';
import Home from '@/pages/Home';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Overview />} />
            <Route path="notices" element={<Notices />} />
            <Route path="profile" element={<Profile />} />
            <Route path="admin" element={<AdminStats />} />
            <Route path="volunteers/pending" element={<PendingVolunteers />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

