import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const StaffLogin = () => {
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: fullName.trim(), password }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'เข้าสู่ระบบไม่สำเร็จ');

      // ตรวจสอบสิทธิ์ Staff หรือ ADMIN
      if (data.user && data.user.role === 'PATIENT') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        alert('บัญชีนี้ไม่มีสิทธิ์เข้าถึงระบบพนักงาน (เฉพาะ STAFF หรือ ADMIN เท่านั้น)');
        setLoading(false);
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/staff/dashboard');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-sm p-4 border-0 rounded-3" style={{ width: '380px' }}>
        <div className="text-center mb-3">
          <span className="fs-1">🔒</span>
          <h4 className="fw-bold text-dark mt-2 mb-1">Staff Portal</h4>
          <p className="text-secondary small mb-0">เข้าสู่ระบบจัดการคลินิกทันตกรรม</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label small fw-semibold text-secondary">ชื่อเจ้าหน้าที่</label>
            <input
              type="text"
              className="form-control"
              placeholder="กรอกชื่อ - นามสกุล"
              required
              disabled={loading}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label small fw-semibold text-secondary">รหัสผ่าน</label>
            <input
              type="password"
              className="form-control"
              placeholder="กรอกรหัสผ่าน"
              required
              disabled={loading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-100 fw-semibold mb-3 py-2"
            disabled={loading}
          >
            {loading ? 'กำลังตรวจสอบ...' : 'เข้าสู่ระบบจัดการ'}
          </button>
        </form>

        <div className="text-center border-top pt-3">
          <Link to="/" className="small text-decoration-none text-muted">
            ← กลับสู่หน้าสำหรับคนไข้
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StaffLogin;