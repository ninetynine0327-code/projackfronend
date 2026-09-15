import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = 'https://f9cflrwv-4000.asse.devtunnels.ms/api';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');

    if (!/^\d{10}$/.test(phone)) {
      setError('กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 ตัวเลข');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: fullName.trim(), phone_number: phone.trim(), password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'สมัครสมาชิกไม่สำเร็จ');

      setSuccess('สมัครสมาชิกสำเร็จ กำลังไปหน้าเข้าสู่ระบบ...');
      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="dc-card p-4 p-md-5">
            <h4 className="dc-display fw-bold mb-1 text-center">สมัครสมาชิก</h4>
            {error && <div className="p-3 mb-3 dc-card-flat text-danger">⚠️ {error}</div>}
            {success && <div className="p-3 mb-3 dc-card-flat text-success">✅ {success}</div>}
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label className="dc-label">ชื่อ - นามสกุล</label>
                <input className="dc-input" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="dc-label">เบอร์โทรศัพท์</label>
                <input
                  type="tel"
                  className="dc-input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  inputMode="numeric"
                  maxLength={10}
                  pattern="[0-9]{10}"
                  title="กรุณากรอกเบอร์โทรศัพท์ 10 ตัวเลข"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="dc-label">รหัสผ่าน</label>
                <input type="password" className="dc-input" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button type="submit" className="dc-btn dc-btn-primary w-100 justify-content-center">ยืนยันสมัครสมาชิก</button>
            </form>
            <div className="text-center mt-4" style={{ fontSize: '.88rem' }}>
              มีบัญชีแล้ว? <Link to="/login" style={{ color: 'var(--primary)' }}>เข้าสู่ระบบ</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;