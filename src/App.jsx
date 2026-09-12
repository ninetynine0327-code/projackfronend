import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Register from './pages/Register';
import StaffDashboard from './pages/StaffDashboard';
import StaffLogin from './pages/StaffLogin';
import PatientPortal from './pages/PatientPortal';
import DentalManagement from './pages/DentalManagement';
import Dashboard from './pages/Dashboard';

const LIGHT_VARS = {
  '--bg': '#F5F8F6',
  '--bg-elevated': '#FFFFFF',
  '--surface': '#EAF3EF',
  '--surface-strong': '#DCEEE7',
  '--text': '#132B27',
  '--text-muted': '#5B7A73',
  '--primary': '#0F5C56',
  '--primary-strong': '#0B4842',
  '--on-primary': '#F5F8F6',
  '--accent': '#E4744B',
  '--accent-strong': '#C95E38',
  '--accent-soft': '#FBE1D2',
  '--on-accent': '#FFFFFF',
  '--border': '#D8E6E0',
  '--warning': '#B77B00',
  '--warning-soft': '#FBEBCF',
  '--success': '#237A55',
  '--success-soft': '#DDF0E4',
  '--danger': '#C24B4B',
  '--danger-soft': '#FDE8E8',
  '--shadow': '0 12px 30px -14px rgba(15, 44, 40, 0.25)',
};

const DARK_VARS = {
  '--bg': '#0A1917',
  '--bg-elevated': '#102421',
  '--surface': '#13302A',
  '--surface-strong': '#173B33',
  '--text': '#EAF4F0',
  '--text-muted': '#93B7AC',
  '--primary': '#57D9BE',
  '--primary-strong': '#7CE6CE',
  '--on-primary': '#062421',
  '--accent': '#F0916C',
  '--accent-strong': '#F5A886',
  '--accent-soft': '#2E241C',
  '--on-accent': '#20120A',
  '--border': '#1E3E36',
  '--warning': '#E3B04B',
  '--warning-soft': '#2E2716',
  '--success': '#4BC98D',
  '--success-soft': '#153627',
  '--danger': '#F87171',
  '--danger-soft': '#3A1E1E',
  '--shadow': '0 16px 34px -14px rgba(0, 0, 0, 0.55)',
};

const GLOBAL_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Thai:wght@500;600;700&family=IBM+Plex+Sans+Thai:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');

.dc-root {
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  font-family: 'IBM Plex Sans Thai', 'IBM Plex Sans', sans-serif;
  transition: background-color .35s ease, color .35s ease;
}
.dc-display { font-family: 'Noto Serif Thai', serif; }
.dc-mono { font-family: 'IBM Plex Mono', monospace; letter-spacing: .01em; }

.dc-navbar {
  background: var(--bg-elevated);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 40;
}
.dc-brand-mark {
  width: 40px; height: 40px;
  border-radius: 62% 38% 55% 45% / 45% 55% 42% 58%;
  background: linear-gradient(135deg, var(--primary), var(--primary-strong));
  display: flex; align-items: center; justify-content: center;
  font-size: 1.15rem; flex-shrink: 0;
}
.dc-nav-link {
  text-decoration: none;
  font-weight: 600; font-size: .93rem;
  color: var(--text-muted);
  padding: .55rem .9rem;
  border-radius: 999px;
  transition: all .2s ease;
  white-space: nowrap;
}
.dc-nav-link:hover { color: var(--text); background: var(--surface); }

.dc-theme-toggle {
  border: 1px solid var(--border);
  background: var(--surface);
  border-radius: 999px;
  width: 60px; height: 32px;
  position: relative;
  cursor: pointer;
  flex-shrink: 0;
}
.dc-theme-toggle-knob {
  position: absolute; top: 3px; left: 3px;
  width: 24px; height: 24px; border-radius: 50%;
  background: var(--primary);
  color: var(--on-primary);
  display: flex; align-items: center; justify-content: center;
  font-size: .75rem;
  transition: transform .3s cubic-bezier(.4,0,.2,1);
}
.dc-theme-toggle.is-dark .dc-theme-toggle-knob { transform: translateX(28px); }

.dc-btn {
  border: none; border-radius: 999px; font-weight: 600;
  padding: .7rem 1.5rem; cursor: pointer; transition: all .2s ease;
  font-size: .95rem; display: inline-flex; align-items: center; gap: .5rem;
  text-decoration: none;
}
.dc-btn-primary { background: var(--primary); color: var(--on-primary); box-shadow: var(--shadow); }
.dc-btn-primary:hover:not(:disabled) { background: var(--primary-strong); color: var(--on-primary); transform: translateY(-1px); }
.dc-btn-ghost { background: var(--surface); color: var(--text); border: 1px solid var(--border); }
.dc-btn-outline-danger {
  background: transparent; border: 1px solid var(--danger); color: var(--danger);
  border-radius: 999px; padding: .35rem .85rem; font-weight: 600; font-size: .82rem; cursor: pointer;
}
.dc-card {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 20px;
  box-shadow: var(--shadow);
}
.dc-card-flat {
  background: var(--surface);
  border-radius: 18px;
  border: 1px solid var(--border);
}
.dc-input {
  width: 100%; border: 1px solid var(--border); border-radius: 12px;
  background: var(--bg-elevated); color: var(--text);
  padding: .65rem .9rem; font-size: .95rem; outline: none;
  transition: border-color .2s ease, box-shadow .2s ease;
}
.dc-input:focus { border-color: var(--primary); box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 20%, transparent); }
.dc-label { font-size: .82rem; font-weight: 600; color: var(--text-muted); margin-bottom: .35rem; display: block; }
.dc-badge {
  display: inline-block; padding: .25rem .7rem; border-radius: 999px;
  font-size: .78rem; font-weight: 700;
}
.dc-footer { background: var(--surface); border-top: 1px solid var(--border); }
`;

function AppContent({ theme, setTheme }) {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="dc-root" style={theme === 'dark' ? DARK_VARS : LIGHT_VARS}>
      <style>{GLOBAL_STYLES}</style>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />

      <nav className="dc-navbar">
        <div className="container d-flex align-items-center justify-content-between py-2 flex-wrap gap-2">
          <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
            <div className="dc-brand-mark" style={{ color: 'var(--on-primary)' }}>🦷</div>
            <div>
              <div className="dc-display fw-bold" style={{ fontSize: '1.05rem', lineHeight: 1.1, color: 'var(--text)' }}>ไข่มุก เดนทัล แคร์</div>
              <div className="dc-mono" style={{ fontSize: '.68rem', color: 'var(--text-muted)' }}>PEARL DENTAL CARE</div>
            </div>
          </Link>

          <div className="d-flex align-items-center gap-1 flex-wrap">
            <Link to="/" className="dc-nav-link">หน้าแรก</Link>
            <Link to="/booking" className="dc-nav-link">จองคิวนัดตรวจ</Link>
            <Link to="/portal" className="dc-nav-link">ประวัติคนไข้</Link>
            <Link to="/management" className="dc-nav-link">ทันตแพทย์</Link>
            <Link to="/staff" className="dc-nav-link">เจ้าหน้าที่</Link>
            <Link to="/dashboard" className="dc-nav-link">สถิติ</Link>
          </div>

          <div className="d-flex align-items-center gap-2">
            {user ? (
              <div className="d-flex align-items-center gap-2">
                <span className="dc-badge" style={{ background: 'var(--surface-strong)', color: 'var(--text)' }}>
                  👤 {user.full_name || user.phone_number}
                </span>
                <button className="dc-btn-outline-danger" onClick={handleLogout}>ออกจากระบบ</button>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Link to="/login" className="dc-btn dc-btn-ghost" style={{ padding: '.45rem 1rem', fontSize: '.85rem' }}>
                  เข้าสู่ระบบ
                </Link>
                <Link to="/register" className="dc-btn dc-btn-primary" style={{ padding: '.45rem 1rem', fontSize: '.85rem' }}>
                  สมัครสมาชิก
                </Link>
              </div>
            )}

            <button
              className={`dc-theme-toggle ${theme === 'dark' ? 'is-dark' : ''}`}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <span className="dc-theme-toggle-knob">{theme === 'dark' ? '🌙' : '☀️'}</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/portal" element={<PatientPortal />} />
          <Route path="/management" element={<DentalManagement />} />
          <Route path="/staff-login" element={<StaffLogin />} />
          <Route path="/staff" element={<StaffDashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>

      <footer className="dc-footer py-4 mt-5">
        <div className="container d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div className="d-flex align-items-center gap-2">
            <div className="dc-brand-mark" style={{ width: '28px', height: '28px', fontSize: '.8rem', color: 'var(--on-primary)' }}>🦷</div>
            <span className="dc-display fw-semibold">ไข่มุก เดนทัล แคร์</span>
          </div>
          <div className="dc-mono" style={{ color: 'var(--text-muted)', fontSize: '.8rem' }}>
            © {new Date().getFullYear()} Pearl Dental Care Management System
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState('light');
  return (
    <BrowserRouter>
      <AppContent theme={theme} setTheme={setTheme} />
    </BrowserRouter>
  );
}