import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Register from './pages/Register';
import PatientPortal from './pages/PatientPortal';
import DentalManagement from './pages/DentalManagement';
import Dashboard from './pages/Dashboard';
import StaffDashboard from './pages/StaffDashboard';
import StaffLogin from './pages/StaffLogin';
import './App.css';

const Navigation = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="dc-navbar">
      <div className="container d-flex align-items-center justify-content-between py-2 flex-wrap gap-2">
        <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
          <div className="dc-brand-mark text-white">🦷</div>
          <div>
            <div className="dc-display fw-bold text-dark" style={{ fontSize: '1.05rem', lineHeight: 1.1 }}>ไข่มุก เดนทัล แคร์</div>
          </div>
        </Link>
        <div className="d-flex align-items-center gap-1 flex-wrap">
          <Link to="/" className="btn btn-light rounded-pill px-3 fw-semibold text-secondary border-0">หน้าแรก</Link>
          <Link to="/booking" className="btn btn-light rounded-pill px-3 fw-semibold text-secondary border-0">จองคิวนัดตรวจ</Link>
          <Link to="/portal" className="btn btn-light rounded-pill px-3 fw-semibold text-secondary border-0">ประวัติคนไข้</Link>
          <Link to="/management" className="btn btn-light rounded-pill px-3 fw-semibold text-secondary border-0">ทันตแพทย์</Link>
        </div>
        <div className="d-flex align-items-center gap-2">
          {user ? (
            <>
              <span className="badge bg-light text-dark border px-3 py-2 rounded-pill">👤 {user.full_name || user.phone_number}</span>
              <button className="btn btn-outline-danger rounded-pill px-3" onClick={handleLogout}>ออกจากระบบ</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-light rounded-pill px-3 border">เข้าสู่ระบบ</Link>
              <Link to="/register" className="btn btn-success rounded-pill px-3" style={{backgroundColor: '#0F5C56'}}>สมัครสมาชิก</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <div className="dc-root" style={{ backgroundColor: '#F5F8F6', minHeight: '100vh', fontFamily: "'IBM Plex Sans Thai', sans-serif" }}>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
        <Navigation />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/portal" element={<PatientPortal />} />
            <Route path="/management" element={<DentalManagement />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/staff" element={<StaffDashboard />} />
            <Route path="/staff-login" element={<StaffLogin />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;