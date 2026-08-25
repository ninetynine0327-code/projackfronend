import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          phone_number: phone,
          password,
          role: 'PATIENT',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'สมัครสมาชิกไม่สำเร็จ');

      alert('สมัครสมาชิกสำเร็จ');
      navigate('/login');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <div className="card p-4 shadow-sm">
        <h3 className="text-center mb-3">สมัครสมาชิก</h3>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">ชื่อ - นามสกุล</label>
            <input
              type="text"
              className="form-control"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">เบอร์โทรศัพท์</label>
            <input
              type="text"
              className="form-control"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">รหัสผ่าน</label>
            <input
              type="password"
              className="form-control"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 mb-3">
            ยืนยันการสมัคร
          </button>
        </form>
        <div className="text-center">
          <Link to="/login">มีบัญชีแล้ว? เข้าสู่ระบบ</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;