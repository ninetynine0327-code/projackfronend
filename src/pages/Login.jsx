import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
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

      localStorage.setItem('token', data.token);
      alert('เข้าสู่ระบบสำเร็จ');
      navigate('/dashboard');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <div className="card p-4 shadow-sm">
        <h3 className="text-center mb-3">เข้าสู่ระบบ (Dental Clinic)</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">ชื่อ - นามสกุล</label>
            <input
              type="text"
              className="form-control"
              placeholder="กรอกชื่อ-นามสกุลที่ลงทะเบียน"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">รหัสผ่าน</label>
            <input
              type="password"
              className="form-control"
              placeholder="กรอกรหัสผ่าน"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">
            เข้าสู่ระบบ
          </button>
        </form>
        <div className="text-center">
          <Link to="/register">ยังไม่มีบัญชี? สมัครสมาชิก</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;