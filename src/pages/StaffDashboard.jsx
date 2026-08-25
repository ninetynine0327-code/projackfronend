import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const StaffLogin = () => {
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: fullName, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'เข้าสู่ระบบไม่สำเร็จ');

      if (data.user && data.user.role === 'PATIENT') {
        alert('บัญชีนี้ไม่มีสิทธิ์เข้าถึงระบบพนักงาน');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/staff/dashboard');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-sm p-4 border-0 rounded-3" style={{ width: '380px' }}>
        <h4 className="fw-bold text-center mb-1 text-dark">Staff Portal</h4>
        <p className="text-secondary small text-center mb-4">สำหรับเจ้าหน้าที่คลินิกเท่านั้น</p>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label small fw-semibold">ชื่อเจ้าหน้าที่</label>
            <input
              type="text"
              className="form-control"
              placeholder="กรอกชื่อ-นามสกุล"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label small fw-semibold">รหัสผ่าน</label>
            <input
              type="password"
              className="form-control"
              placeholder="กรอกรหัสผ่าน"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 fw-semibold mb-3">
            เข้าสู่ระบบจัดการ
          </button>
        </form>
        <div className="text-center">
          <Link to="/" className="small text-decoration-none text-muted">← กลับหน้าสำหรับคนไข้</Link>
        </div>
      </div>
    </div>
  );
};

export default StaffLogin;