import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StaffLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('isStaffAuth', 'true');
      navigate('/staff');
    } else {
      alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <h4 className="fw-bold text-center text-primary mb-4">เข้าสู่ระบบเจ้าหน้าที่</h4>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label small fw-semibold">ชื่อผู้ใช้งาน</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="form-label small fw-semibold">รหัสผ่าน</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="admin123"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 py-2 rounded-3 fw-bold">
                เข้าสู่ระบบ
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffLogin;