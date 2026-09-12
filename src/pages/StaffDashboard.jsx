import React, { useState, useEffect } from 'react';

const API_URL = 'https://f9cflrwv-4000.asse.devtunnels.ms/api';

const StaffDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  
  useEffect(() => {
    fetch(`${API_URL}/appointments`)
      .then(res => res.json())
      .then(data => setAppointments(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container py-5">
      <div className="dc-card p-4">
        <h5 className="dc-display fw-bold mb-4">จัดการคิวนัดหมาย (Staff)</h5>
        <table className="dc-table w-100">
          <thead>
            <tr>
              <th>คนไข้</th>
              <th>เบอร์โทร</th>
              <th>แพทย์</th>
              <th>วัน-เวลา</th>
              <th>สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(app => (
              <tr key={app.id}>
                <td>{app.user?.full_name || 'ทั่วไป'}</td>
                <td>{app.user?.phone_number || '-'}</td>
                <td>{app.dentist?.full_name}</td>
                <td>{new Date(app.appointment_date).toLocaleDateString('th-TH')}</td>
                <td>
                  <span className="dc-badge" style={{ background: app.status === 'COMPLETED' ? 'var(--success-soft)' : 'var(--warning-soft)', color: app.status === 'COMPLETED' ? 'var(--success)' : 'var(--warning)' }}>
                    {app.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffDashboard;