import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = 'https://f9cflrwv-4000.asse.devtunnels.ms/api';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${API_URL}/auth/login/customer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_number: phone.trim(), password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'เบอร์โทรหรือรหัสผ่านไม่ถูกต้อง');

      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/portal');
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="dc-card p-4 p-md-5">
            <h4 className="dc-display fw-bold mb-1 text-center">เข้าสู่ระบบคนไข้</h4>
            {error && <div className="p-3 mb-3 dc-card-flat text-danger">⚠️ {error}</div>}
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="dc-label">เบอร์โทรศัพท์</label>
                <input type="tel" className="dc-input" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>
              <div className="mb-4">
                <label className="dc-label">รหัสผ่าน</label>
                <input type="password" className="dc-input" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button type="submit" className="dc-btn dc-btn-primary w-100 justify-content-center">เข้าสู่ระบบ</button>
            </form>
            <div className="text-center mt-4" style={{ fontSize: '.88rem' }}>
              ยังไม่มีบัญชีสมาชิก? <Link to="/register" style={{ color: 'var(--primary)' }}>สมัครสมาชิกใหม่</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;