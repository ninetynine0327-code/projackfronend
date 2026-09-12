import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://f9cflrwv-4000.asse.devtunnels.ms/api';

const StaffLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${API_URL}/auth/login/staff`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_number: username.trim(), password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'ข้อมูลเข้าสู่ระบบไม่ถูกต้อง');

      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/staff');
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="dc-card p-4 p-md-5">
            <h4 className="dc-display fw-bold mb-4 text-center">ระบบเจ้าหน้าที่</h4>
            {error && <div className="p-3 mb-3 dc-card-flat text-danger">⚠️ {error}</div>}
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="dc-label">ชื่อผู้ใช้งาน</label>
                <input className="dc-input" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>
              <div className="mb-4">
                <label className="dc-label">รหัสผ่าน</label>
                <input type="password" className="dc-input" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button type="submit" className="dc-btn dc-btn-primary w-100 justify-content-center" style={{ background: 'var(--accent)' }}>เข้าสู่ระบบ</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffLogin;