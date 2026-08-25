import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('PATIENT');
  const navigate = useNavigate();

  const loadUsers = () => {
    fetch('http://localhost:3000/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(Array.isArray(data) ? data : []))
      .catch((err) => console.error('Fetch error:', err));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    loadUsers();
  }, [navigate]);

  const handleAdd = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        full_name: fullName,
        phone_number: phone,
        password: password || '123456',
        role,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message && data.message.includes('สำเร็จ')) {
          loadUsers();
          setFullName('');
          setPhone('');
          setPassword('');
        } else {
          alert(data.message || 'บันทึกข้อมูลไม่สำเร็จ');
        }
      })
      .catch((err) => console.error('Add error:', err));
  };

  const handleDelete = (id) => {
    if (!window.confirm('ยืนยันการลบรายการนี้?')) return;
    fetch(`http://localhost:3000/api/users/${id}`, { method: 'DELETE' })
      .then(() => loadUsers())
      .catch((err) => console.error('Delete error:', err));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>ระบบจัดการคลินิกทันตกรรม</h2>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          ออกจากระบบ
        </button>
      </div>

      <div className="card p-3 mb-4 shadow-sm">
        <h5>เพิ่มข้อมูลผู้ใช้งาน / คนไข้</h5>
        <form onSubmit={handleAdd}>
          <div className="row g-2">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="ชื่อ - นามสกุล"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="เบอร์โทรศัพท์"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <input
                type="password"
                className="form-control"
                placeholder="รหัสผ่าน (เว้นว่าง = 123456)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="PATIENT">PATIENT</option>
                <option value="STAFF">STAFF</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-success w-100">
                เพิ่มข้อมูล
              </button>
            </div>
          </div>
        </form>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>ชื่อ - นามสกุล</th>
            <th>เบอร์โทรศัพท์</th>
            <th>สิทธิ์</th>
            <th>วันที่ลงทะเบียน</th>
            <th className="text-center">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.full_name}</td>
              <td>{item.phone_number}</td>
              <td>{item.role}</td>
              <td>{new Date(item.created_at).toLocaleDateString('th-TH')}</td>
              <td className="text-center">
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;