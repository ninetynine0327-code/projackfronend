import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน');
      return;
    }

    try {
      const res = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName.trim(),
          phone_number: phone.trim(),
          password: password
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'การสมัครสมาชิกไม่สำเร็จ');

      setSuccess('สมัครสมาชิกสำเร็จ กำลังนำทางไปหน้าเข้าสู่ระบบ...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="dc-card p-4 p-md-5">
            <div className="text-center mb-4">
              <div className="dc-brand-mark mx-auto mb-2" style={{ color: 'var(--on-primary)' }}>🦷</div>
              <h4 className="dc-display fw-bold mb-1">สมัครสมาชิกคนไข้ใหม่</h4>
              <p className="small mb-0" style={{ color: 'var(--text-muted)' }}>
                ลงทะเบียนเพื่อจัดการคิวนัดหมายและดูประวัติการรักษา
              </p>
            </div>

            {error && (
              <div className="p-3 mb-3 dc-card-flat" style={{ borderColor: 'var(--danger)', color: 'var(--danger)', fontSize: '.88rem' }}>
                {error}
              </div>
            )}
            {success && (
              <div className="p-3 mb-3 dc-card-flat" style={{ borderColor: 'var(--success)', color: 'var(--success)', fontSize: '.88rem' }}>
                {success}
              </div>
            )}

            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label className="dc-label">ชื่อ - นามสกุล</label>
                <input
                  type="text"
                  className="dc-input"
                  placeholder="เช่น สมชาย ใจดี"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="dc-label">เบอร์โทรศัพท์ (ใช้เป็น Username)</label>
                <input
                  type="tel"
                  className="dc-input"
                  placeholder="08XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="dc-label">รหัสผ่าน</label>
                <input
                  type="password"
                  className="dc-input"
                  placeholder="กำหนดรหัสผ่าน"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="dc-label">ยืนยันรหัสผ่าน</label>
                <input
                  type="password"
                  className="dc-input"
                  placeholder="กรอกรหัสผ่านอีกครั้ง"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="dc-btn dc-btn-primary w-100 justify-content-center">
                ยืนยันการสมัครสมาชิก
              </button>
            </form>

            <div className="text-center mt-4" style={{ fontSize: '.88rem', color: 'var(--text-muted)' }}>
              มีบัญชีผู้ใช้งานแล้วใช่หรือไม่?{' '}
              <Link to="/login" className="fw-semibold text-decoration-none" style={{ color: 'var(--primary)' }}>
                เข้าสู่ระบบที่นี่
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;