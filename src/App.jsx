import React, { useState, useEffect, useMemo } from 'react';

/* =========================================================================
   DESIGN TOKENS & DUAL-THEME PALETTES
   ========================================================================= */
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
  background: none; border: none; cursor: pointer;
  font-weight: 600; font-size: .93rem;
  color: var(--text-muted);
  padding: .55rem .9rem;
  border-radius: 999px;
  transition: all .2s ease;
  white-space: nowrap;
}
.dc-nav-link:hover { color: var(--text); background: var(--surface); }
.dc-nav-link.active { color: var(--on-primary); background: var(--primary); }

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

.dc-hero {
  background: radial-gradient(120% 140% at 100% 0%, var(--surface-strong) 0%, var(--bg) 55%);
  border-bottom: 1px solid var(--border);
}
.dc-blob { border-radius: 62% 38% 53% 47% / 48% 45% 55% 52%; }
.dc-eyebrow {
  font-size: .78rem; font-weight: 700; letter-spacing: .12em;
  color: var(--accent-strong);
  text-transform: uppercase;
}

.dc-btn {
  border: none; border-radius: 999px; font-weight: 600;
  padding: .7rem 1.5rem; cursor: pointer; transition: all .2s ease;
  font-size: .95rem; display: inline-flex; align-items: center; gap: .5rem;
}
.dc-btn-primary { background: var(--primary); color: var(--on-primary); box-shadow: var(--shadow); }
.dc-btn-primary:hover:not(:disabled) { background: var(--primary-strong); transform: translateY(-1px); }
.dc-btn-accent { background: var(--accent); color: var(--on-accent); box-shadow: var(--shadow); }
.dc-btn-accent:hover:not(:disabled) { background: var(--accent-strong); transform: translateY(-1px); }
.dc-btn-ghost { background: var(--surface); color: var(--text); border: 1px solid var(--border); }
.dc-btn-ghost:hover { background: var(--surface-strong); }
.dc-btn-outline-danger {
  background: transparent; border: 1px solid var(--danger); color: var(--danger);
  border-radius: 999px; padding: .35rem .85rem; font-weight: 600; font-size: .82rem; cursor: pointer;
  transition: all .2s ease;
}
.dc-btn-outline-danger:hover { background: var(--danger); color: #fff; }
.dc-btn:disabled { opacity: .5; cursor: not-allowed; transform: none; }

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
.dc-input::placeholder { color: var(--text-muted); }
.dc-label { font-size: .82rem; font-weight: 600; color: var(--text-muted); margin-bottom: .35rem; display: block; }

.dc-icon-well {
  width: 54px; height: 54px;
  border-radius: 60% 40% 55% 45% / 45% 60% 40% 55%;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.4rem; flex-shrink: 0;
}

.dc-table thead th {
  color: var(--text-muted); font-size: .78rem; text-transform: uppercase;
  letter-spacing: .06em; font-weight: 700; border-bottom: 1px solid var(--border);
  padding: .75rem 1rem; text-align: left;
}
.dc-table tbody td {
  padding: .95rem 1rem; border-bottom: 1px solid var(--border); vertical-align: middle;
}
.dc-table tbody tr:last-child td { border-bottom: none; }
.dc-table tbody tr:hover { background: var(--surface); }

.dc-badge {
  display: inline-block; padding: .25rem .7rem; border-radius: 999px;
  font-size: .78rem; font-weight: 700;
}
.dc-footer { background: var(--surface); border-top: 1px solid var(--border); }
`;

const API_URL = 'http://localhost:4000/api';

const App = () => {
  const [theme, setTheme] = useState('light');
  const themeVars = theme === 'dark' ? DARK_VARS : LIGHT_VARS;
  const [page, setPage] = useState('home'); // 'home' | 'booking' | 'supplies' | 'dashboard' | 'auth'

  /* Auth State */
  const [currentUser, setCurrentUser] = useState(null);
  const [authRole, setAuthRole] = useState('customer'); // 'customer' | 'staff'
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [authFullName, setAuthFullName] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  /* Treatments */
  const categories = [
    { id: 1, name: "ศัลยศาสตร์ช่องปาก", description: "ถอนฟัน ผ่าฟันคุด และผ่าตัดช่องปาก", icon: "🦷" },
    { id: 2, name: "ทันตกรรมหัตถการ", description: "อุดฟัน ขูดหินปูน และทำความสะอาดฟัน", icon: "🪥" },
    { id: 3, name: "ทันตกรรมจัดฟัน", description: "เครื่องมือจัดฟันและปรับโครงสร้างขากรรไกร", icon: "✨" }
  ];

  /* Booking State */
  const timeSlots = useMemo(() => [
    "09:00", "09:30", "10:00", "10:30", "11:00", "13:00", "13:30", "14:00", "14:30", "15:00", "16:00"
  ], []);
  const [bookName, setBookName] = useState("");
  const [bookPhone, setBookPhone] = useState("");
  const [bookCategoryId, setBookCategoryId] = useState(1);
  const [bookDate, setBookDate] = useState("");
  const [bookTime, setBookTime] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  /* Inventory & Appointments State */
  const [products, setProducts] = useState([
    { id: 1, name: "ยาชาเฉพาะที่ (Lidocaine 2%)", price: 450, stock: 25 },
    { id: 2, name: "ไหมขัดฟันทางการแพทย์ (Dental Floss)", price: 85, stock: 4 },
    { id: 3, name: "ชุดกระจกส่องตรวจและสำลี (Dental Kit)", price: 120, stock: 18 }
  ]);
  const [prodName, setProdName] = useState("");
  const [prodPrice, setProdPrice] = useState("");
  const [prodStock, setProdStock] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [filterStatus, setFilterStatus] = useState('ALL');

  useEffect(() => {
    if (currentUser) {
      setBookName(currentUser.full_name || '');
      setBookPhone(currentUser.phone_number || '');
    }
  }, [currentUser]);

  /* Auth Handlers */
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    if (authMode === 'register') {
      try {
        const res = await fetch(`${API_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ full_name: authFullName, phone_number: authPhone, password: authPassword })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || data.message || 'การสมัครสมาชิกล้มเหลว');

        setAuthSuccess('สมัครสมาชิกสำเร็จ กรุณาเข้าสู่ระบบ');
        setAuthMode('login');
        setAuthPassword('');
      } catch (err) {
        setAuthError(err.message);
      }
      return;
    }

    const endpoint = authRole === 'customer' 
      ? `${API_URL}/auth/login/customer` 
      : `${API_URL}/auth/login/staff`;

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_number: authPhone, password: authPassword })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'เข้าสู่ระบบไม่สำเร็จ');

      setCurrentUser(data.user);
      setAuthPhone('');
      setAuthPassword('');
      setPage(authRole === 'staff' ? 'supplies' : 'booking');
    } catch (err) {
      setAuthError(err.message);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setPage('home');
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookName.trim() || !bookPhone.trim() || !bookDate || !bookTime) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    const selectedCat = categories.find(c => c.id === bookCategoryId);
    setConfirmation({
      code: `DC-${Date.now().toString().slice(-4)}`,
      patientName: bookName,
      treatment: selectedCat?.name || "ตรวจสุขภาพฟัน",
      date: bookDate,
      time: bookTime
    });
  };

  return (
    <div className="dc-root" style={themeVars}>
      <style>{GLOBAL_STYLES}</style>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />

      {/* NAVBAR */}
      <nav className="dc-navbar">
        <div className="container d-flex align-items-center justify-content-between py-2 flex-wrap gap-2">
          <div className="d-flex align-items-center gap-2" style={{ cursor: 'pointer' }} onClick={() => setPage('home')}>
            <div className="dc-brand-mark" style={{ color: 'var(--on-primary)' }}>🦷</div>
            <div>
              <div className="dc-display fw-bold" style={{ fontSize: '1.05rem', lineHeight: 1.1 }}>ไข่มุก เดนทัล แคร์</div>
              <div className="dc-mono" style={{ fontSize: '.68rem', color: 'var(--text-muted)' }}>PEARL DENTAL CARE</div>
            </div>
          </div>

          <div className="d-flex align-items-center gap-1 flex-wrap">
            <button className={`dc-nav-link ${page === 'home' ? 'active' : ''}`} onClick={() => setPage('home')}>หน้าแรก</button>
            <button className={`dc-nav-link ${page === 'booking' ? 'active' : ''}`} onClick={() => setPage('booking')}>จองคิวนัดตรวจ</button>
            <button className={`dc-nav-link ${page === 'supplies' ? 'active' : ''}`} onClick={() => setPage('supplies')}>คลังเวชภัณฑ์</button>
            <button className={`dc-nav-link ${page === 'dashboard' ? 'active' : ''}`} onClick={() => setPage('dashboard')}>คิวนัดหมายคลินิก</button>
          </div>

          <div className="d-flex align-items-center gap-2">
            {currentUser ? (
              <div className="d-flex align-items-center gap-2">
                <span className="dc-badge" style={{ background: 'var(--surface-strong)', color: 'var(--text)' }}>
                  👤 {currentUser.full_name || currentUser.phone_number}
                </span>
                <button className="dc-btn-outline-danger" onClick={handleLogout}>ออกจากระบบ</button>
              </div>
            ) : (
              <button 
                className={`dc-btn dc-btn-ghost ${page === 'auth' ? 'dc-btn-primary' : ''}`} 
                style={{ padding: '.45rem 1rem', fontSize: '.85rem' }}
                onClick={() => { setPage('auth'); setAuthError(''); setAuthSuccess(''); }}
              >
                เข้าสู่ระบบ / สมัคร
              </button>
            )}

            <button
              className={`dc-theme-toggle ${theme === 'dark' ? 'is-dark' : ''}`}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Theme toggle"
            >
              <span className="dc-theme-toggle-knob">{theme === 'dark' ? '🌙' : '☀️'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* PAGE: AUTH (LOGIN / REGISTER) */}
      {page === 'auth' && (
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="dc-card p-4 p-md-5">
                
                {/* สลับบทบาท (คนไข้ / เจ้าหน้าที่) */}
                <div className="d-flex gap-2 mb-4 p-1 dc-card-flat">
                  <button
                    type="button"
                    className={`dc-btn w-100 justify-content-center ${authRole === 'customer' ? 'dc-btn-primary' : 'dc-btn-ghost'}`}
                    style={{ padding: '.45rem', fontSize: '.88rem' }}
                    onClick={() => { setAuthRole('customer'); setAuthError(''); setAuthSuccess(''); }}
                  >
                    คนไข้ / ผู้รับบริการ
                  </button>
                  <button
                    type="button"
                    className={`dc-btn w-100 justify-content-center ${authRole === 'staff' ? 'dc-btn-accent' : 'dc-btn-ghost'}`}
                    style={{ padding: '.45rem', fontSize: '.88rem' }}
                    onClick={() => { setAuthRole('staff'); setAuthMode('login'); setAuthError(''); setAuthSuccess(''); }}
                  >
                    เจ้าหน้าที่คลินิก
                  </button>
                </div>

                <div className="text-center mb-4">
                  <h4 className="dc-display fw-bold mb-1">
                    {authRole === 'staff' ? 'เข้าสู่ระบบเจ้าหน้าที่' : authMode === 'login' ? 'เข้าสู่ระบบคนไข้' : 'สมัครสมาชิกคนไข้ใหม่'}
                  </h4>
                  <p className="small mb-0" style={{ color: 'var(--text-muted)' }}>
                    {authRole === 'staff' ? 'ระบบจัดการหลังบ้านและเวชภัณฑ์' : 'เข้าถึงข้อมูลนัดหมายและประวัติส่วนตัว'}
                  </p>
                </div>

                {authError && (
                  <div className="p-3 mb-3 dc-card-flat" style={{ borderColor: 'var(--danger)', color: 'var(--danger)', fontSize: '.88rem' }}>
                    ⚠️ {authError}
                  </div>
                )}
                {authSuccess && (
                  <div className="p-3 mb-3 dc-card-flat" style={{ borderColor: 'var(--success)', color: 'var(--success)', fontSize: '.88rem' }}>
                    ✅ {authSuccess}
                  </div>
                )}

                <form onSubmit={handleAuthSubmit}>
                  {authMode === 'register' && authRole === 'customer' && (
                    <div className="mb-3">
                      <label className="dc-label">ชื่อ - นามสกุล</label>
                      <input
                        type="text"
                        className="dc-input"
                        placeholder="กรอกชื่อ-นามสกุลของคุณ"
                        value={authFullName}
                        onChange={(e) => setAuthFullName(e.target.value)}
                        required
                      />
                    </div>
                  )}

                  <div className="mb-3">
                    <label className="dc-label">เบอร์โทรศัพท์ (ใช้เป็น Username)</label>
                    <input
                      type="tel"
                      className="dc-input"
                      placeholder="08XXXXXXXX"
                      value={authPhone}
                      onChange={(e) => setAuthPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="dc-label">รหัสผ่าน</label>
                    <input
                      type="password"
                      className="dc-input"
                      placeholder="กรอกรหัสผ่าน"
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className={`dc-btn w-100 justify-content-center ${authRole === 'staff' ? 'dc-btn-accent' : 'dc-btn-primary'}`}
                  >
                    {authMode === 'register' ? 'ยืนยันการสมัครสมาชิก' : 'เข้าสู่ระบบ'}
                  </button>
                </form>

                {authRole === 'customer' && (
                  <div className="text-center mt-4" style={{ fontSize: '.88rem' }}>
                    {authMode === 'login' ? (
                      <div>
                        ยังไม่มีบัญชีสมาชิก?{' '}
                        <button
                          type="button"
                          className="dc-nav-link text-decoration-underline p-0 d-inline"
                          style={{ color: 'var(--primary)' }}
                          onClick={() => { setAuthMode('register'); setAuthError(''); setAuthSuccess(''); }}
                        >
                          สมัครสมาชิกที่นี่
                        </button>
                      </div>
                    ) : (
                      <div>
                        มีบัญชีอยู่แล้ว?{' '}
                        <button
                          type="button"
                          className="dc-nav-link text-decoration-underline p-0 d-inline"
                          style={{ color: 'var(--primary)' }}
                          onClick={() => { setAuthMode('login'); setAuthError(''); setAuthSuccess(''); }}
                        >
                          เข้าสู่ระบบ
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PAGE: HOME */}
      {page === 'home' && (
        <div className="container py-5">
          <div className="dc-hero p-5 rounded-4 mb-5">
            <div className="row align-items-center g-4">
              <div className="col-lg-7">
                <div className="dc-eyebrow mb-2">คลินิกทันตกรรมครบวงจร</div>
                <h1 className="dc-display fw-bold mb-3" style={{ fontSize: '2.5rem' }}>
                  ยิ้มอย่างมั่นใจ<br />ดูแลฟันโดยแพทย์ผู้เชี่ยวชาญ
                </h1>
                <p style={{ color: 'var(--text-muted)' }} className="mb-4">
                  บริการตรวจสุขภาพช่องปาก อุดฟัน ขูดหินปูน ผ่าฟันคุด และจัดฟัน พร้อมระบบนัดหมายออนไลน์ที่สะดวก รวดเร็ว
                </p>
                <div className="d-flex gap-3">
                  <button className="dc-btn dc-btn-primary" onClick={() => setPage('booking')}>จองคิวนัดหมาย →</button>
                  <button className="dc-btn dc-btn-ghost" onClick={() => setPage('dashboard')}>ตรวจสอบคิวตรวจ</button>
                </div>
              </div>
              <div className="col-lg-5 text-center">
                <div className="dc-blob p-5" style={{ background: 'var(--surface-strong)', fontSize: '5rem' }}>
                  🦷
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4">
            {categories.map((cat) => (
              <div className="col-md-4" key={cat.id}>
                <div className="dc-card p-4 h-100">
                  <div className="dc-icon-well mb-3" style={{ background: 'var(--accent-soft)' }}>{cat.icon}</div>
                  <h5 className="dc-display fw-semibold mb-2">{cat.name}</h5>
                  <p style={{ color: 'var(--text-muted)', fontSize: '.92rem' }}>{cat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PAGE: BOOKING */}
      {page === 'booking' && (
        <div className="container py-5">
          {confirmation ? (
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="dc-card p-5 text-center">
                  <div style={{ fontSize: '3rem' }}>🎉</div>
                  <h3 className="dc-display fw-bold mt-2">จองคิวนัดหมายสำเร็จ</h3>
                  <div className="dc-card-flat p-3 my-4 text-start">
                    <div><strong>รหัสนัดหมาย:</strong> <span className="dc-mono">{confirmation.code}</span></div>
                    <div><strong>ชื่อคนไข้:</strong> {confirmation.patientName}</div>
                    <div><strong>การรักษา:</strong> {confirmation.treatment}</div>
                    <div><strong>วัน-เวลา:</strong> {confirmation.date} • {confirmation.time} น.</div>
                  </div>
                  <button className="dc-btn dc-btn-primary" onClick={() => setConfirmation(null)}>จองคิวใหม่</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="dc-card p-4 mb-4">
                  <h5 className="dc-display fw-bold mb-3">จองคิวนัดหมายทันตกรรม</h5>
                  <form onSubmit={handleBookingSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="dc-label">ชื่อ-นามสกุล คนไข้</label>
                        <input className="dc-input" value={bookName} onChange={(e) => setBookName(e.target.value)} required />
                      </div>
                      <div className="col-md-6">
                        <label className="dc-label">เบอร์โทรศัพท์ติดต่อ</label>
                        <input className="dc-input" value={bookPhone} onChange={(e) => setBookPhone(e.target.value)} required />
                      </div>
                      <div className="col-12">
                        <label className="dc-label">เลือกการรักษา</label>
                        <select className="dc-input" value={bookCategoryId} onChange={(e) => setBookCategoryId(Number(e.target.value))}>
                          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="dc-label">วันที่สะดวก</label>
                        <input type="date" className="dc-input" value={bookDate} onChange={(e) => setBookDate(e.target.value)} required />
                      </div>
                      <div className="col-md-6">
                        <label className="dc-label">เวลาที่สะดวก</label>
                        <select className="dc-input" value={bookTime} onChange={(e) => setBookTime(e.target.value)} required>
                          <option value="">-- เลือกเวลา --</option>
                          {timeSlots.map(t => <option key={t} value={t}>{t} น.</option>)}
                        </select>
                      </div>
                      <div className="col-12 mt-4">
                        <button type="submit" className="dc-btn dc-btn-primary w-100 justify-content-center">ยืนยันการจองคิว</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* PAGE: SUPPLIES (คลังเวชภัณฑ์) */}
      {page === 'supplies' && (
        <div className="container py-5">
          <div className="dc-card p-4">
            <h5 className="dc-display fw-bold mb-3">คลังเวชภัณฑ์และอุปกรณ์ทันตกรรม</h5>
            <div className="dc-card-flat p-3 mb-4">
              <div className="row g-2">
                <div className="col-md-5">
                  <input className="dc-input" placeholder="ชื่อเวชภัณฑ์/อุปกรณ์" value={prodName} onChange={(e) => setProdName(e.target.value)} />
                </div>
                <div className="col-md-3">
                  <input type="number" className="dc-input" placeholder="ราคา (฿)" value={prodPrice} onChange={(e) => setProdPrice(e.target.value)} />
                </div>
                <div className="col-md-2">
                  <input type="number" className="dc-input" placeholder="คงเหลือ" value={prodStock} onChange={(e) => setProdStock(e.target.value)} />
                </div>
                <div className="col-md-2">
                  <button className="dc-btn dc-btn-primary w-100 justify-content-center" onClick={() => {
                    if (prodName && prodPrice && prodStock) {
                      setProducts([...products, { id: Date.now(), name: prodName, price: Number(prodPrice), stock: Number(prodStock) }]);
                      setProdName(''); setProdPrice(''); setProdStock('');
                    }
                  }}>+ เพิ่ม</button>
                </div>
              </div>
            </div>

            <table className="dc-table w-100">
              <thead>
                <tr>
                  <th>รหัส</th>
                  <th>ชื่อเวชภัณฑ์</th>
                  <th>ราคา</th>
                  <th>คงเหลือ</th>
                  <th className="text-end">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id}>
                    <td className="dc-mono">#{p.id}</td>
                    <td className="fw-semibold">{p.name}</td>
                    <td className="dc-mono">฿{p.price}</td>
                    <td>
                      <span className="dc-badge" style={{ background: p.stock < 5 ? 'var(--danger-soft)' : 'var(--success-soft)', color: p.stock < 5 ? 'var(--danger)' : 'var(--success)' }}>
                        {p.stock} หน่วย
                      </span>
                    </td>
                    <td className="text-end">
                      <button className="dc-btn-outline-danger" onClick={() => setProducts(products.filter(item => item.id !== p.id))}>ลบ</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PAGE: DASHBOARD (คิวนัดหมาย) */}
      {page === 'dashboard' && (
        <div className="container py-5">
          <div className="dc-card p-4">
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
              <h5 className="dc-display fw-bold mb-0">รายการคิวนัดหมายคนไข้</h5>
              <div className="d-flex gap-1">
                {['ALL', 'PENDING', 'COMPLETED'].map(st => (
                  <button
                    key={st}
                    className={`dc-nav-link ${filterStatus === st ? 'active' : ''}`}
                    onClick={() => setFilterStatus(st)}
                  >
                    {st === 'ALL' ? 'ทั้งหมด' : st === 'PENDING' ? 'รอดำเนินการ' : 'ตรวจแล้ว'}
                  </button>
                ))}
              </div>
            </div>

            <div className="table-responsive">
              <table className="dc-table w-100">
                <thead>
                  <tr>
                    <th>ชื่อคนไข้</th>
                    <th>เบอร์โทร</th>
                    <th>รายการรักษา</th>
                    <th>วัน-เวลานัด</th>
                    <th>สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-muted">ไม่พบข้อมูลนัดหมาย</td>
                    </tr>
                  ) : (
                    appointments.map(app => (
                      <tr key={app.id}>
                        <td className="fw-semibold">{app.patientName}</td>
                        <td>{app.patientPhone}</td>
                        <td>{app.treatment}</td>
                        <td>{new Date(app.appointmentDate).toLocaleString('th-TH')}</td>
                        <td>
                          <span className="dc-badge" style={{ background: app.status === 'COMPLETED' ? 'var(--success-soft)' : 'var(--warning-soft)', color: app.status === 'COMPLETED' ? 'var(--success)' : 'var(--warning)' }}>
                            {app.status === 'COMPLETED' ? 'ตรวจแล้ว' : 'รอดำเนินการ'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
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
};

export default App;