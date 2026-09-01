import React, { useState, useEffect, useMemo } from 'react';

/* =========================================================================
   DESIGN TOKENS & STYLES
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
.dc-btn-primary:hover { background: var(--primary-strong); transform: translateY(-1px); }
.dc-btn-accent { background: var(--accent); color: var(--on-accent); box-shadow: var(--shadow); }
.dc-btn-accent:hover { background: var(--accent-strong); transform: translateY(-1px); }
.dc-btn-ghost { background: var(--surface); color: var(--text); border: 1px solid var(--border); }
.dc-btn-ghost:hover { background: var(--surface-strong); }
.dc-btn-outline-danger {
  background: transparent; border: 1px solid #C24B4B; color: #C24B4B;
  border-radius: 999px; padding: .4rem 1rem; font-weight: 600; font-size: .85rem; cursor: pointer;
}
.dc-btn-outline-danger:hover { background: #C24B4B; color: #fff; }
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
  padding: .6rem .75rem; text-align: left;
}
.dc-table tbody td {
  padding: .85rem .75rem; border-bottom: 1px solid var(--border); vertical-align: middle;
}
.dc-table tbody tr:last-child td { border-bottom: none; }
.dc-table tbody tr:hover { background: var(--surface); }

.dc-badge {
  display: inline-block; padding: .25rem .65rem; border-radius: 999px;
  font-size: .78rem; font-weight: 700;
}

.dc-slot {
  border: 1px solid var(--border); border-radius: 12px; padding: .5rem .4rem;
  text-align: center; font-size: .85rem; cursor: pointer; background: var(--bg-elevated);
  transition: all .15s ease;
}
.dc-slot:hover:not(.is-taken) { border-color: var(--primary); }
.dc-slot.is-selected { background: var(--primary); color: var(--on-primary); border-color: var(--primary); }
.dc-slot.is-taken { background: var(--surface); color: var(--text-muted); text-decoration: line-through; cursor: not-allowed; opacity: .6; }

.dc-dentist-card { cursor: pointer; transition: all .18s ease; border: 2px solid transparent; }
.dc-dentist-card:hover { transform: translateY(-2px); }
.dc-dentist-card.is-selected { border-color: var(--primary); background: var(--surface); }

.dc-stat-number { font-size: 2rem; font-weight: 700; color: var(--primary); }
.dc-footer { background: var(--surface); border-top: 1px solid var(--border); }

@media (max-width: 767px) {
  .dc-nav-links { display: none !important; }
  .dc-nav-links.is-open { display: flex !important; flex-direction: column; align-items: stretch; }
}
`;

const GumlineDivider = ({ flip }) => (
  <svg
    viewBox="0 0 400 24"
    preserveAspectRatio="none"
    style={{ width: '100%', height: '22px', display: 'block', transform: flip ? 'rotate(180deg)' : 'none' }}
  >
    <path
      d="M0,0 Q12.5,24 25,0 Q37.5,24 50,0 Q62.5,24 75,0 Q87.5,24 100,0 Q112.5,24 125,0 Q137.5,24 150,0 Q162.5,24 175,0 Q187.5,24 200,0 Q212.5,24 225,0 Q237.5,24 250,0 Q262.5,24 275,0 Q287.5,24 300,0 Q312.5,24 325,0 Q337.5,24 350,0 Q362.5,24 375,0 Q387.5,24 400,0 L400,24 L0,24 Z"
      fill="var(--surface)"
    />
  </svg>
);

const App = () => {
  const [theme, setTheme] = useState('light');
  const themeVars = theme === 'dark' ? DARK_VARS : LIGHT_VARS;

  /* User Auth State */
  const [currentUser, setCurrentUser] = useState(null);
  const [authRole, setAuthRole] = useState('customer'); // 'customer' | 'staff'
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [authFullName, setAuthFullName] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  /* Navigation */
  const [page, setPage] = useState('home');
  const [navOpen, setNavOpen] = useState(false);
  const goTo = (p) => { 
    setPage(p); 
    setNavOpen(false); 
    setAuthError('');
    setAuthSuccess('');
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  /* Mock Data */
  const initialProducts = [
    { id: 1, name: "ยาชาเฉพาะที่ (Lidocaine)", price: 450, stock: 25 },
    { id: 2, name: "ไหมขัดฟันทางการแพทย์ (Dental Floss)", price: 85, stock: 5 },
    { id: 3, name: "ชุดกระจกส่องปากและสำลี (Dental Kit)", price: 120, stock: 18 }
  ];

  const initialCategories = [
    { id: 1, name: "ศัลยศาสตร์ช่องปาก", description: "ถอนฟัน ผ่าฟันครุฑ และงานศัลยกรรม", icon: "🦷" },
    { id: 2, name: "ทันตกรรมหัตถการ", description: "อุดฟัน ขูดหินปูน และทำความสะอาด", icon: "🪥" },
    { id: 3, name: "ทันตกรรมจัดฟัน", description: "เครื่องมือจัดฟันและอุปกรณ์ปรับโครงสร้าง", icon: "✨" }
  ];

  const dentists = [
    { id: 1, name: "ทพญ. พิมพ์ชนก วงศ์ทันตกรรม", specialty: "ทันตกรรมทั่วไป", initials: "พช" },
    { id: 2, name: "ทพ. ธนกร ศัลยกิจ", specialty: "ศัลยศาสตร์ช่องปาก", initials: "ธก" },
    { id: 3, name: "ทพญ. อารยา จัดฟันดี", specialty: "ทันตกรรมจัดฟัน", initials: "อจ" },
    { id: 4, name: "ทพ. กิตติ หัตถการเวช", specialty: "ทันตกรรมหัตถการ", initials: "กห" },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [productSearch, setProductSearch] = useState("");

  const [categories, setCategories] = useState(initialCategories);
  const [catName, setCatName] = useState("");
  const [catDesc, setCatDesc] = useState("");
  const [catSearch, setCatSearch] = useState("");

  /* Handlers: Auth */
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    if (authMode === 'register') {
      try {
        // อัปเดต IP ให้เป็น 192.168.0.133
        const res = await fetch('http://192.168.0.133:3000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ full_name: authFullName, phone_number: authPhone, password: authPassword })
        });
        
        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.error ? `ปัญหาฐานข้อมูล: ${data.error}` : data.message);
        }
        
        setAuthSuccess('สมัครสมาชิกสำเร็จ กรุณาเข้าสู่ระบบ');
        setAuthMode('login');
        setAuthPassword('');
      } catch (err) {
        setAuthError(err.message);
      }
      return;
    }

    // อัปเดต IP ให้เป็น 192.168.0.133
    const endpoint = authRole === 'customer' 
      ? 'http://192.168.0.133:3000/api/auth/login/customer' 
      : 'http://192.168.0.133:3000/api/auth/login/staff';

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
      goTo(authRole === 'staff' ? 'supplies' : 'booking');
    } catch (err) {
      setAuthError(err.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    goTo('home');
  };

  /* Handlers: Product */
  const handleAddProduct = () => {
    if (!name.trim() || !price || !stock) {
      alert("กรุณากรอกข้อมูลอุปกรณ์ทันตกรรมให้ครบถ้วน");
      return;
    }
    const newProduct = { name, price: Number(price), stock: Number(stock), id: Date.now() };
    setProducts([...products, newProduct]);
    setName(""); setPrice(""); setStock("");
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  /* Handlers: Category */
  const handleAddCategory = () => {
    if (!catName.trim()) {
      alert("กรุณากรอกชื่อหมวดหมู่การรักษา");
      return;
    }
    const newCategory = { name: catName, description: catDesc, icon: "🦷", id: Date.now() };
    setCategories([...categories, newCategory]);
    setCatName(""); setCatDesc("");
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  const filteredProducts = products.filter((prd) =>
    prd.name.toLowerCase().includes(productSearch.toLowerCase())
  );
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(catSearch.toLowerCase()) ||
    (cat.description && cat.description.toLowerCase().includes(catSearch.toLowerCase()))
  );

  /* Booking State */
  const timeSlots = useMemo(() => {
    const slots = [];
    for (let h = 9; h <= 17; h++) {
      slots.push(`${String(h).padStart(2, '0')}:00`);
      if (h !== 17) slots.push(`${String(h).padStart(2, '0')}:30`);
    }
    return slots;
  }, []);
  const takenSlots = ["10:00", "10:30", "14:00", "15:30"];

  const [bookName, setBookName] = useState("");
  const [bookPhone, setBookPhone] = useState("");
  const [bookCategoryId, setBookCategoryId] = useState(null);
  const [bookDentistId, setBookDentistId] = useState(null);
  const [bookDate, setBookDate] = useState("");
  const [bookTime, setBookTime] = useState("");
  const [bookNote, setBookNote] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    if (currentUser && (currentUser.role === 'user' || currentUser.role === 'PATIENT')) {
      setBookName(currentUser.full_name || '');
      setBookPhone(currentUser.phone_number || '');
    }
  }, [currentUser]);

  const handleStartBookingForCategory = (id) => {
    setBookCategoryId(id);
    goTo('booking');
  };

  const handleSubmitBooking = () => {
    if (!bookName.trim() || !bookPhone.trim() || !bookCategoryId || !bookDentistId || !bookDate || !bookTime) {
      alert("กรุณากรอกข้อมูลการจองคิวให้ครบถ้วน");
      return;
    }
    const bookingPayload = {
      name: bookName, phone: bookPhone, categoryId: bookCategoryId,
      dentistId: bookDentistId, date: bookDate, time: bookTime, note: bookNote,
    };
    const code = `DC-${Date.now().toString().slice(-6)}`;
    setConfirmation({ code, ...bookingPayload });
  };

  const resetBookingForm = () => {
    setBookName(currentUser?.full_name || ""); 
    setBookPhone(currentUser?.phone_number || ""); 
    setBookCategoryId(null);
    setBookDentistId(null); 
    setBookDate(""); 
    setBookTime(""); 
    setBookNote("");
    setConfirmation(null);
  };

  const selectedCategory = categories.find((c) => c.id === bookCategoryId);
  const selectedDentist = dentists.find((d) => d.id === bookDentistId);
  const todayStr = new Date().toISOString().split('T')[0];

  const navItems = [
    { id: 'home', label: 'หน้าแรก' },
    { id: 'booking', label: 'จองคิว' },
    { id: 'categories', label: 'หมวดหมู่การรักษา' },
    ...(currentUser?.role && ['admin', 'staff', 'dentist'].includes(currentUser.role) 
      ? [{ id: 'supplies', label: 'คลังอุปกรณ์ (พนักงาน)' }] 
      : []),
    { id: 'contact', label: 'ติดต่อเรา' },
  ];

  return (
    <div className="dc-root" style={themeVars} data-theme={theme}>
      <style>{GLOBAL_STYLES}</style>

      {/* ============ NAVBAR ============ */}
      <nav className="dc-navbar">
        <div className="container d-flex align-items-center justify-content-between py-2" style={{ gap: '1rem', flexWrap: 'wrap' }}>
          <div className="d-flex align-items-center gap-2" style={{ cursor: 'pointer' }} onClick={() => goTo('home')}>
            <div className="dc-brand-mark">🦷</div>
            <div>
              <div className="dc-display fw-bold" style={{ fontSize: '1.05rem', lineHeight: 1.1 }}>ไข่มุก เดนทัล แคร์</div>
              <div className="dc-mono" style={{ fontSize: '.68rem', color: 'var(--text-muted)' }}>PEARL DENTAL CARE</div>
            </div>
          </div>

          <button
            className="d-md-none dc-btn dc-btn-ghost"
            style={{ padding: '.4rem .8rem' }}
            onClick={() => setNavOpen(!navOpen)}
          >
            ☰ เมนู
          </button>

          <div className={`dc-nav-links d-flex align-items-center gap-1 ${navOpen ? 'is-open' : ''}`} style={{ flexWrap: 'wrap' }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`dc-nav-link ${page === item.id ? 'active' : ''}`}
                onClick={() => goTo(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="d-flex align-items-center gap-3">
            {currentUser ? (
              <div className="d-flex align-items-center gap-2">
                <span className="dc-badge" style={{ background: 'var(--surface-strong)', color: 'var(--text)' }}>
                  👤 {currentUser.full_name} ({currentUser.role})
                </span>
                <button className="dc-btn-outline-danger" onClick={handleLogout}>ออกจากระบบ</button>
              </div>
            ) : (
              <button
                className="dc-btn dc-btn-ghost"
                style={{ padding: '.45rem 1rem', fontSize: '.85rem' }}
                onClick={() => goTo('auth')}
              >
                เข้าสู่ระบบ / สมัคร
              </button>
            )}

            <button
              className="dc-btn dc-btn-accent d-none d-md-inline-flex"
              style={{ padding: '.5rem 1.1rem', fontSize: '.85rem' }}
              onClick={() => goTo('booking')}
            >
              จองคิวเลย
            </button>
            <button
              className={`dc-theme-toggle ${theme === 'dark' ? 'is-dark' : ''}`}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="สลับโหมดมืด/สว่าง"
            >
              <span className="dc-theme-toggle-knob">{theme === 'dark' ? '🌙' : '☀️'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ============ PAGE: AUTH ============ */}
      {page === 'auth' && (
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="dc-card p-4">
                <div className="d-flex gap-2 mb-4 p-1 dc-card-flat">
                  <button
                    className={`dc-btn w-100 justify-content-center ${authRole === 'customer' ? 'dc-btn-primary' : 'dc-btn-ghost'}`}
                    style={{ padding: '.5rem' }}
                    onClick={() => { setAuthRole('customer'); setAuthError(''); setAuthSuccess(''); }}
                  >
                    คนไข้ / ลูกค้า
                  </button>
                  <button
                    className={`dc-btn w-100 justify-content-center ${authRole === 'staff' ? 'dc-btn-accent' : 'dc-btn-ghost'}`}
                    style={{ padding: '.5rem' }}
                    onClick={() => { setAuthRole('staff'); setAuthMode('login'); setAuthError(''); setAuthSuccess(''); }}
                  >
                    เจ้าหน้าที่คลินิก
                  </button>
                </div>

                <h4 className="dc-display fw-bold mb-3 text-center">
                  {authRole === 'staff'
                    ? 'เข้าสู่ระบบเจ้าหน้าที่'
                    : authMode === 'login' ? 'เข้าสู่ระบบคนไข้' : 'สมัครสมาชิกคนไข้ใหม่'}
                </h4>

                {authError && (
                  <div className="p-3 mb-3 dc-card-flat" style={{ borderColor: '#C24B4B', color: '#C24B4B', fontSize: '.9rem' }}>
                    ⚠️ {authError}
                  </div>
                )}
                {authSuccess && (
                  <div className="p-3 mb-3 dc-card-flat" style={{ borderColor: 'var(--success)', color: 'var(--success)', fontSize: '.9rem' }}>
                    ✅ {authSuccess}
                  </div>
                )}

                <form onSubmit={handleAuthSubmit}>
                  {authMode === 'register' && authRole === 'customer' && (
                    <div className="mb-3">
                      <label className="dc-label">ชื่อ - นามสกุล</label>
                      <input
                        className="dc-input"
                        placeholder="กรอกชื่อ-นามสกุลของคุณ"
                        value={authFullName}
                        onChange={(e) => setAuthFullName(e.target.value)}
                        required
                      />
                    </div>
                  )}

                  <div className="mb-3">
                    <label className="dc-label">เบอร์โทรศัพท์</label>
                    <input
                      className="dc-input"
                      placeholder="08xxxxxxxx"
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
                  <div className="text-center mt-3" style={{ fontSize: '.88rem' }}>
                    {authMode === 'login' ? (
                      <div>
                        ยังไม่มีบัญชีใช่หรือไม่?{' '}
                        <button
                          className="dc-nav-link text-decoration-underline p-0 d-inline"
                          style={{ color: 'var(--primary)' }}
                          onClick={() => { setAuthMode('register'); setAuthError(''); }}
                        >
                          สมัครสมาชิกที่นี่
                        </button>
                      </div>
                    ) : (
                      <div>
                        มีบัญชีแล้วใช่หรือไม่?{' '}
                        <button
                          className="dc-nav-link text-decoration-underline p-0 d-inline"
                          style={{ color: 'var(--primary)' }}
                          onClick={() => { setAuthMode('login'); setAuthError(''); }}
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

      {/* ============ PAGE: HOME ============ */}
      {page === 'home' && (
        <>
          <section className="dc-hero">
            <div className="container py-5">
              <div className="row align-items-center g-5 py-4">
                <div className="col-lg-6">
                  <div className="dc-eyebrow mb-3">คลินิกทันตกรรมที่ไว้ใจได้</div>
                  <h1 className="dc-display fw-bold mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.2 }}>
                    ยิ้มอย่างมั่นใจ<br />ดูแลฟันอย่างเข้าใจ
                  </h1>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '480px' }} className="mb-4">
                    นัดหมายทันตแพทย์ผู้เชี่ยวชาญได้ง่ายในไม่กี่ขั้นตอน พร้อมทีมงานที่ดูแลทุกรายละเอียด
                    ตั้งแต่การตรวจสุขภาพช่องปากไปจนถึงงานทันตกรรมเฉพาะทาง
                  </p>
                  <div className="d-flex gap-3 flex-wrap">
                    <button className="dc-btn dc-btn-primary" onClick={() => goTo('booking')}>
                      จองคิวทันที →
                    </button>
                    <button className="dc-btn dc-btn-ghost" onClick={() => goTo('categories')}>
                      ดูบริการของเรา
                    </button>
                  </div>

                  <div className="d-flex gap-4 mt-5 flex-wrap">
                    <div>
                      <div className="dc-stat-number dc-mono">12+</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '.85rem' }}>ปีที่ดูแลคนไข้</div>
                    </div>
                    <div>
                      <div className="dc-stat-number dc-mono">{dentists.length}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '.85rem' }}>ทันตแพทย์ผู้เชี่ยวชาญ</div>
                    </div>
                    <div>
                      <div className="dc-stat-number dc-mono">98%</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '.85rem' }}>ความพึงพอใจของคนไข้</div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div
                    className="dc-blob p-5 d-flex align-items-center justify-content-center"
                    style={{ background: 'linear-gradient(150deg, var(--surface-strong), var(--accent-soft))', minHeight: '340px' }}
                  >
                    <div className="text-center">
                      <div style={{ fontSize: '5rem' }}>✨</div>
                      <div className="dc-display fw-semibold mt-2" style={{ fontSize: '1.2rem' }}>คิวว่างวันนี้</div>
                      <div style={{ color: 'var(--text-muted)' }}>{timeSlots.length - takenSlots.length} ช่วงเวลาให้เลือก</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <GumlineDivider />

          {/* Services */}
          <section className="py-5" style={{ background: 'var(--surface)' }}>
            <div className="container">
              <div className="text-center mb-5">
                <div className="dc-eyebrow mb-2">บริการของเรา</div>
                <h2 className="dc-display fw-bold" style={{ fontSize: '1.9rem' }}>หมวดหมู่การรักษาที่พร้อมดูแลคุณ</h2>
              </div>
              <div className="row g-4">
                {categories.map((cat) => (
                  <div className="col-md-4" key={cat.id}>
                    <div className="dc-card p-4 h-100">
                      <div className="dc-icon-well mb-3" style={{ background: 'var(--accent-soft)' }}>
                        {cat.icon || '🦷'}
                      </div>
                      <h5 className="dc-display fw-semibold mb-2">{cat.name}</h5>
                      <p style={{ color: 'var(--text-muted)', fontSize: '.92rem', minHeight: '48px' }}>
                        {cat.description || 'ไม่มีคำอธิบายเพิ่มเติม'}
                      </p>
                      <button
                        className="dc-btn dc-btn-ghost w-100 justify-content-center mt-2"
                        onClick={() => handleStartBookingForCategory(cat.id)}
                      >
                        จองคิวหมวดนี้
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <GumlineDivider flip />

          {/* Dentists */}
          <section className="py-5">
            <div className="container">
              <div className="text-center mb-5">
                <div className="dc-eyebrow mb-2">ทีมทันตแพทย์</div>
                <h2 className="dc-display fw-bold" style={{ fontSize: '1.9rem' }}>พบกับทันตแพทย์ผู้เชี่ยวชาญของเรา</h2>
              </div>
              <div className="row g-4">
                {dentists.map((d) => (
                  <div className="col-6 col-md-3" key={d.id}>
                    <div className="dc-card-flat p-3 text-center h-100">
                      <div
                        className="dc-blob mx-auto mb-3 d-flex align-items-center justify-content-center dc-display fw-bold"
                        style={{ width: '72px', height: '72px', background: 'var(--primary)', color: 'var(--on-primary)', fontSize: '1.3rem' }}
                      >
                        {d.initials}
                      </div>
                      <div className="fw-semibold" style={{ fontSize: '.95rem' }}>{d.name}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '.82rem' }}>{d.specialty}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ============ PAGE: BOOKING ============ */}
      {page === 'booking' && (
        <div className="container py-5">
          {confirmation ? (
            <div className="row justify-content-center">
              <div className="col-lg-7">
                <div className="dc-card p-5 text-center">
                  <div style={{ fontSize: '3.5rem' }}>🎉</div>
                  <h3 className="dc-display fw-bold mt-3 mb-2">จองคิวสำเร็จแล้ว</h3>
                  <p style={{ color: 'var(--text-muted)' }}>เราจะติดต่อยืนยันอีกครั้งทางโทรศัพท์ที่ท่านให้ไว้</p>
                  <div className="dc-card-flat p-4 my-4 text-start mx-auto" style={{ maxWidth: '420px' }}>
                    <div className="d-flex justify-content-between mb-2">
                      <span style={{ color: 'var(--text-muted)' }}>รหัสการจอง</span>
                      <span className="dc-mono fw-bold" style={{ color: 'var(--primary)' }}>{confirmation.code}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span style={{ color: 'var(--text-muted)' }}>ชื่อคนไข้</span>
                      <span className="fw-semibold">{confirmation.name}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span style={{ color: 'var(--text-muted)' }}>หมวดหมู่</span>
                      <span className="fw-semibold">{selectedCategory?.name || '-'}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span style={{ color: 'var(--text-muted)' }}>ทันตแพทย์</span>
                      <span className="fw-semibold">{selectedDentist?.name || '-'}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span style={{ color: 'var(--text-muted)' }}>วันเวลานัดหมาย</span>
                      <span className="dc-mono fw-semibold">{confirmation.date} • {confirmation.time}</span>
                    </div>
                  </div>
                  <button className="dc-btn dc-btn-primary" onClick={resetBookingForm}>จองคิวใหม่อีกครั้ง</button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-5">
                <div className="dc-eyebrow mb-2">นัดหมาย</div>
                <h2 className="dc-display fw-bold" style={{ fontSize: '2rem' }}>จองคิวทันตกรรม</h2>
                <p style={{ color: 'var(--text-muted)' }}>เลือกหมวดหมู่ ทันตแพทย์ และเวลาที่สะดวก</p>
              </div>

              <div className="row g-4">
                <div className="col-lg-8">
                  {/* Step 1: Category */}
                  <div className="dc-card p-4 mb-4">
                    <h6 className="dc-display fw-semibold mb-3">1. เลือกหมวดหมู่การรักษา</h6>
                    <div className="row g-3">
                      {categories.map((cat) => (
                        <div className="col-md-4" key={cat.id}>
                          <div
                            className={`dc-dentist-card dc-card-flat p-3 text-center h-100 ${bookCategoryId === cat.id ? 'is-selected' : ''}`}
                            onClick={() => setBookCategoryId(cat.id)}
                          >
                            <div style={{ fontSize: '1.6rem' }}>{cat.icon || '🦷'}</div>
                            <div className="fw-semibold mt-1" style={{ fontSize: '.88rem' }}>{cat.name}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Dentist */}
                  <div className="dc-card p-4 mb-4">
                    <h6 className="dc-display fw-semibold mb-3">2. เลือกทันตแพทย์</h6>
                    <div className="row g-3">
                      {dentists.map((d) => (
                        <div className="col-md-6" key={d.id}>
                          <div
                            className={`dc-dentist-card dc-card-flat p-3 d-flex align-items-center gap-3 ${bookDentistId === d.id ? 'is-selected' : ''}`}
                            onClick={() => setBookDentistId(d.id)}
                          >
                            <div
                              className="dc-blob d-flex align-items-center justify-content-center dc-display fw-bold flex-shrink-0"
                              style={{ width: '48px', height: '48px', background: 'var(--primary)', color: 'var(--on-primary)', fontSize: '1rem' }}
                            >
                              {d.initials}
                            </div>
                            <div>
                              <div className="fw-semibold" style={{ fontSize: '.9rem' }}>{d.name}</div>
                              <div style={{ color: 'var(--text-muted)', fontSize: '.8rem' }}>{d.specialty}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step 3: Date & Time */}
                  <div className="dc-card p-4">
                    <h6 className="dc-display fw-semibold mb-3">3. เลือกวันและเวลา</h6>
                    <label className="dc-label">วันที่นัดหมาย</label>
                    <input
                      type="date"
                      className="dc-input mb-3"
                      style={{ maxWidth: '240px' }}
                      min={todayStr}
                      value={bookDate}
                      onChange={(e) => setBookDate(e.target.value)}
                    />
                    <label className="dc-label">ช่วงเวลา</label>
                    <div className="row g-2">
                      {timeSlots.map((t) => {
                        const isTaken = takenSlots.includes(t);
                        return (
                          <div className="col-3 col-md-2" key={t}>
                            <div
                              className={`dc-slot dc-mono ${bookTime === t ? 'is-selected' : ''} ${isTaken ? 'is-taken' : ''}`}
                              onClick={() => !isTaken && setBookTime(t)}
                            >
                              {t}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Contact info + summary */}
                <div className="col-lg-4">
                  <div className="dc-card p-4" style={{ position: 'sticky', top: '90px' }}>
                    <h6 className="dc-display fw-semibold mb-3">ข้อมูลติดต่อ</h6>
                    <label className="dc-label">ชื่อ-นามสกุล</label>
                    <input className="dc-input mb-3" placeholder="เช่น สมชาย ใจดี" value={bookName} onChange={(e) => setBookName(e.target.value)} />
                    <label className="dc-label">เบอร์โทรศัพท์</label>
                    <input className="dc-input mb-3" placeholder="08X-XXX-XXXX" value={bookPhone} onChange={(e) => setBookPhone(e.target.value)} />
                    <label className="dc-label">หมายเหตุ (ถ้ามี)</label>
                    <textarea className="dc-input mb-4" rows="3" placeholder="อาการเบื้องต้น หรือความต้องการเพิ่มเติม" value={bookNote} onChange={(e) => setBookNote(e.target.value)} />

                    <div className="dc-card-flat p-3 mb-4" style={{ fontSize: '.85rem' }}>
                      <div className="d-flex justify-content-between mb-1">
                        <span style={{ color: 'var(--text-muted)' }}>หมวดหมู่</span>
                        <span className="fw-semibold">{selectedCategory?.name || '—'}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-1">
                        <span style={{ color: 'var(--text-muted)' }}>ทันตแพทย์</span>
                        <span className="fw-semibold">{selectedDentist?.name || '—'}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span style={{ color: 'var(--text-muted)' }}>วัน/เวลา</span>
                        <span className="dc-mono fw-semibold">{bookDate || '—'} {bookTime || ''}</span>
                      </div>
                    </div>

                    <button className="dc-btn dc-btn-accent w-100 justify-content-center" onClick={handleSubmitBooking}>
                      ยืนยันการจองคิว
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* ============ PAGE: SUPPLIES ============ */}
      {page === 'supplies' && (
        <div className="container py-5">
          <div className="dc-card mb-2">
            <div className="p-4 d-flex justify-content-between align-items-center flex-wrap gap-3" style={{ borderBottom: '1px solid var(--border)' }}>
              <div>
                <div className="dc-eyebrow mb-1">การจัดการภายใน</div>
                <h4 className="dc-display fw-bold m-0">คลังอุปกรณ์ทันตกรรม</h4>
              </div>
              <input
                type="text"
                className="dc-input"
                style={{ maxWidth: '260px' }}
                placeholder="ค้นหาอุปกรณ์..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
              />
            </div>
            <div className="p-4">
              <div className="dc-card-flat p-3 mb-4">
                <h6 className="fw-semibold mb-3">เพิ่มอุปกรณ์ใหม่</h6>
                <div className="row g-2">
                  <div className="col-md-4">
                    <input className="dc-input" placeholder="ชื่ออุปกรณ์" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="col-md-3">
                    <input type="number" className="dc-input" placeholder="ราคา (฿)" value={price} onChange={(e) => setPrice(e.target.value)} />
                  </div>
                  <div className="col-md-3">
                    <input type="number" className="dc-input" placeholder="จำนวนคงเหลือ" value={stock} onChange={(e) => setStock(e.target.value)} />
                  </div>
                  <div className="col-md-2">
                    <button className="dc-btn dc-btn-primary w-100 justify-content-center" onClick={handleAddProduct}>+ เพิ่ม</button>
                  </div>
                </div>
              </div>

              <div className="table-responsive">
                <table className="dc-table w-100">
                  <thead>
                    <tr>
                      <th style={{ width: '80px' }}>ID</th>
                      <th>ชื่ออุปกรณ์</th>
                      <th>ราคา</th>
                      <th>คงเหลือ</th>
                      <th className="text-center" style={{ width: '120px' }}>จัดการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.length === 0 ? (
                      <tr><td colSpan="5" className="text-center py-4" style={{ color: 'var(--text-muted)' }}>ไม่พบรายการอุปกรณ์</td></tr>
                    ) : (
                      filteredProducts.map((prd) => (
                        <tr key={prd.id}>
                          <td className="dc-mono" style={{ color: 'var(--text-muted)' }}>#{prd.id}</td>
                          <td className="fw-semibold">{prd.name}</td>
                          <td className="dc-mono">฿{Number(prd.price).toLocaleString()}</td>
                          <td>
                            <span
                              className="dc-badge"
                              style={{
                                background: prd.stock < 10 ? 'var(--warning-soft)' : 'var(--success-soft)',
                                color: prd.stock < 10 ? 'var(--warning)' : 'var(--success)',
                              }}
                            >
                              {prd.stock} หน่วย
                            </span>
                          </td>
                          <td className="text-center">
                            <button className="dc-btn-outline-danger" onClick={() => handleDeleteProduct(prd.id)}>ลบ</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============ PAGE: CATEGORIES ============ */}
      {page === 'categories' && (
        <div className="container py-5">
          <div className="dc-card mb-2">
            <div className="p-4 d-flex justify-content-between align-items-center flex-wrap gap-3" style={{ borderBottom: '1px solid var(--border)' }}>
              <div>
                <div className="dc-eyebrow mb-1">การจัดการภายใน</div>
                <h4 className="dc-display fw-bold m-0">หมวดหมู่การรักษา</h4>
              </div>
              <input
                type="text"
                className="dc-input"
                style={{ maxWidth: '260px' }}
                placeholder="ค้นหาหมวดหมู่..."
                value={catSearch}
                onChange={(e) => setCatSearch(e.target.value)}
              />
            </div>
            <div className="p-4">
              <div className="dc-card-flat p-3 mb-4">
                <h6 className="fw-semibold mb-3">เพิ่มหมวดหมู่ใหม่</h6>
                <div className="row g-2">
                  <div className="col-md-4">
                    <input className="dc-input" placeholder="ชื่อหมวดหมู่" value={catName} onChange={(e) => setCatName(e.target.value)} />
                  </div>
                  <div className="col-md-6">
                    <input className="dc-input" placeholder="คำอธิบาย" value={catDesc} onChange={(e) => setCatDesc(e.target.value)} />
                  </div>
                  <div className="col-md-2">
                    <button className="dc-btn dc-btn-accent w-100 justify-content-center" onClick={handleAddCategory}>+ เพิ่ม</button>
                  </div>
                </div>
              </div>

              <div className="row g-3">
                {filteredCategories.length === 0 ? (
                  <div className="text-center py-4" style={{ color: 'var(--text-muted)' }}>ไม่พบหมวดหมู่การรักษา</div>
                ) : (
                  filteredCategories.map((cat) => (
                    <div className="col-md-4" key={cat.id}>
                      <div className="dc-card-flat p-3 h-100">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <span className="dc-mono" style={{ color: 'var(--text-muted)', fontSize: '.8rem' }}>#{cat.id}</span>
                          <button className="dc-btn-outline-danger" onClick={() => handleDeleteCategory(cat.id)}>ลบ</button>
                        </div>
                        <div style={{ fontSize: '1.4rem' }}>{cat.icon || '🦷'}</div>
                        <div className="fw-semibold mt-1" style={{ color: 'var(--primary)' }}>{cat.name}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '.85rem' }}>{cat.description || '-'}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============ PAGE: CONTACT ============ */}
      {page === 'contact' && (
        <div className="container py-5">
          <div className="text-center mb-5">
            <div className="dc-eyebrow mb-2">ติดต่อเรา</div>
            <h2 className="dc-display fw-bold" style={{ fontSize: '2rem' }}>แวะมาพบเราได้ทุกวัน</h2>
          </div>
          <div className="row g-4">
            <div className="col-lg-5">
              <div className="dc-card p-4 mb-3">
                <h6 className="dc-display fw-semibold mb-3">ข้อมูลคลินิก</h6>
                <div className="mb-3">
                  <div style={{ color: 'var(--text-muted)', fontSize: '.82rem' }}>ที่อยู่</div>
                  <div className="fw-semibold">123 ถนนสุขภาพดี แขวงยิ้มสวย เขตฟันขาว กรุงเทพฯ 10110</div>
                </div>
                <div className="mb-3">
                  <div style={{ color: 'var(--text-muted)', fontSize: '.82rem' }}>โทรศัพท์</div>
                  <div className="fw-semibold dc-mono">02-123-4567</div>
                </div>
                <div className="mb-3">
                  <div style={{ color: 'var(--text-muted)', fontSize: '.82rem' }}>เวลาทำการ</div>
                  <div className="fw-semibold">จันทร์ – เสาร์ 09:00 – 18:00 น.</div>
                </div>
                <div className="mb-0">
                  <div style={{ color: 'var(--text-muted)', fontSize: '.82rem' }}>อีเมล</div>
                  <div className="fw-semibold dc-mono">hello@pearldental.example</div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="dc-card p-4">
                <h6 className="dc-display fw-semibold mb-3">ส่งข้อความถึงเรา</h6>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="dc-label">ชื่อของคุณ</label>
                    <input className="dc-input" placeholder="ชื่อ-นามสกุล" />
                  </div>
                  <div className="col-md-6">
                    <label className="dc-label">เบอร์โทรกลับ</label>
                    <input className="dc-input" placeholder="08X-XXX-XXXX" />
                  </div>
                  <div className="col-12">
                    <label className="dc-label">ข้อความ</label>
                    <textarea className="dc-input" rows="5" placeholder="สอบถามหรือแจ้งความประสงค์..." />
                  </div>
                  <div className="col-12">
                    <button
                      className="dc-btn dc-btn-primary"
                      onClick={() => alert('ส่งข้อความเรียบร้อยแล้ว เจ้าหน้าที่จะติดต่อกลับโดยเร็ว')}
                    >
                      ส่งข้อความ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============ FOOTER ============ */}
      <footer className="dc-footer py-4 mt-5">
        <div className="container d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div className="d-flex align-items-center gap-2">
            <div className="dc-brand-mark" style={{ width: '32px', height: '32px', fontSize: '.9rem' }}>🦷</div>
            <span className="dc-display fw-semibold">ไข่มุก เดนทัล แคร์</span>
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '.85rem' }}>© {new Date().getFullYear()} Pearl Dental Care · ระบบคลินิกทันตกรรม</div>
        </div>
      </footer>
    </div>
  );
};

export default App;