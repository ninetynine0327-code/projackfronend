import React, { useState } from 'react';

const API_URL = 'http://localhost:4000/api';

const PatientPortal = () => {
  const [phone, setPhone] = useState('');
  const [myBookings, setMyBookings] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/appointments`);
      const data = await res.json();
      setMyBookings(data.filter((item) => item.patientPhone === phone.trim()));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>ตรวจสอบคิวนัดหมาย</h2>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group">
          <input
            type="tel"
            className="form-control"
            placeholder="เบอร์โทรศัพท์"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button className="btn btn-primary" type="submit">ค้นหา</button>
        </div>
      </form>

      <ul className="list-group">
        {myBookings.map((item) => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{item.treatment}</strong> - {item.patientName}
              <br />
              <small>{new Date(item.appointmentDate).toLocaleString()}</small>
            </div>
            <span className="badge bg-secondary">{item.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientPortal;