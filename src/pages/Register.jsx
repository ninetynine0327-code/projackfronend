import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:4000/api';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName.trim(),
          phone_number: phone.trim(),
          password: password
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'สมัครสมาชิกไม่สำเร็จ');

      setSuccess('สมัครสมาชิกสำเร็จ กำลังไปหน้าเข้าสู่ระบบ...');
      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      setError(err.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="dc-card p-4 p-md-5">
            <h4 className="dc-display fw-bold mb-1 text-center">สมัครสมาชิกคนไข้ใหม่</h4>
            <p className="small text-center mb-4" style={{ color: 'var(--text-muted)' }}>ลงทะเบียนเพื่อดูประวัติและจัดการคิวตรวจ</p>

            {error && <div className="p-3 mb-3 dc-card-flat" style={{ borderColor: 'var(--danger)', color: 'var(--danger)', fontSize: '.88rem' }}>⚠️ {error}</div>}
            {success && <div className="p-3 mb-3 dc-card-flat" style={{ borderColor: 'var(--success)', color: 'var(--success)', fontSize: '.88rem' }}>✅ {success}</div>}

            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label className="dc-label">ชื่อ - นามสกุล</label>
                <input className="dc-input" placeholder="สมชาย ใจดี" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="dc-label">เบอร์โทรศัพท์ (Username)</label>
                <input type="tel" className="dc-input" placeholder="08XXXXXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>
              <div className="mb-4">
                <label className="dc-label">รหัสผ่าน</label>
                <input type="password" className="dc-input" placeholder="กำหนดรหัสผ่าน" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button type="submit" className="dc-btn dc-btn-primary w-100 justify-content-center">
                ยืนยันการสมัครสมาชิก
              </button>
            </form>

            <div className="text-center mt-4" style={{ fontSize: '.88rem' }}>
              มีบัญชีแล้วใช่หรือไม่? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600' }}>เข้าสู่ระบบที่นี่</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;