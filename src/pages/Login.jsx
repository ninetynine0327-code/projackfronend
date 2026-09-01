import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [authRole, setAuthRole] = useState('customer'); // 'customer' | 'staff'
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const endpoint = authRole === 'customer'
      ? 'http://localhost:4000/api/auth/login/customer'
      : 'http://localhost:4000/api/auth/login/staff';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_number: phone.trim(), password })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'เบอร์โทรศัพท์หรือรหัสผ่านไม่ถูกต้อง');

      localStorage.setItem('user', JSON.stringify(data.user));
      navigate(authRole === 'staff' ? '/staff' : '/portal');
    } catch (err) {
      setError(err.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="dc-card p-4 p-md-5">
            {/* สลับบทบาท (คนไข้ / เจ้าหน้าที่) */}
            <div className="d-flex gap-2 mb-4 p-1 dc-card-flat">
              <button
                type="button"
                className={`dc-btn w-100 justify-content-center ${authRole === 'customer' ? 'dc-btn-primary' : 'dc-btn-ghost'}`}
                style={{ padding: '.45rem' }}
                onClick={() => { setAuthRole('customer'); setError(''); }}
              >
                คนไข้ / ผู้ใช้บริการ
              </button>
              <button
                type="button"
                className={`dc-btn w-100 justify-content-center ${authRole === 'staff' ? 'dc-btn-accent' : 'dc-btn-ghost'}`}
                style={{ padding: '.45rem' }}
                onClick={() => { setAuthRole('staff'); setError(''); }}
              >
                เจ้าหน้าที่คลินิก
              </button>
            </div>

            <div className="text-center mb-4">
              <h4 className="dc-display fw-bold mb-1">
                {authRole === 'staff' ? 'เข้าสู่ระบบเจ้าหน้าที่' : 'เข้าสู่ระบบคนไข้'}
              </h4>
              <p className="small mb-0" style={{ color: 'var(--text-muted)' }}>
                {authRole === 'staff' ? 'ระบบจัดการหลังบ้านและตารางนัดหมาย' : 'จัดการคิวนัดหมายและประวัติส่วนตัว'}
              </p>
            </div>

            {error && (
              <div className="p-3 mb-3 dc-card-flat" style={{ borderColor: 'var(--danger)', color: 'var(--danger)', fontSize: '.88rem' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="dc-label">เบอร์โทรศัพท์ / ชื่อผู้ใช้งาน</label>
                <input
                  type="text"
                  className="dc-input"
                  placeholder="08XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="dc-label">รหัสผ่าน</label>
                <input
                  type="password"
                  className="dc-input"
                  placeholder="กรอกรหัสผ่าน"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className={`dc-btn w-100 justify-content-center ${authRole === 'staff' ? 'dc-btn-accent' : 'dc-btn-primary'}`}
              >
                เข้าสู่ระบบ
              </button>
            </form>

            {authRole === 'customer' && (
              <div className="text-center mt-4" style={{ fontSize: '.88rem', color: 'var(--text-muted)' }}>
                ยังไม่มีบัญชีสมาชิก?{' '}
                <Link to="/register" className="fw-semibold text-decoration-none" style={{ color: 'var(--primary)' }}>
                  สมัครสมาชิกใหม่ที่นี่
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;