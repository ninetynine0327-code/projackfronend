import React, { useState, useEffect } from 'react';

const API_URL = 'https://f9cflrwv-4000.asse.devtunnels.ms/api';

const PatientPortal = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [phone, setPhone] = useState(user?.phone_number || '');
  const [appointments, setAppointments] = useState([]);
  const [searched, setSearched] = useState(!!user);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!phone.trim()) return;

    try {
      const res = await fetch(`${API_URL}/appointments`);
      if (res.ok) {
        const data = await res.json();
        setAppointments(data.filter(a => a.user?.phone_number === phone.trim()));
        setSearched(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) handleSearch();
  }, []);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="dc-card p-4 mb-4">
            <h5 className="dc-display fw-bold mb-3">ตรวจสอบคิวนัดหมายของคุณ</h5>
            <form onSubmit={handleSearch} className="d-flex gap-2">
              <input type="tel" className="dc-input" placeholder="กรอกเบอร์โทรศัพท์" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              <button type="submit" className="dc-btn dc-btn-primary px-4">ค้นหา</button>
            </form>
          </div>
          {searched && (
            <div className="dc-card p-4">
              <h6 className="dc-display fw-bold mb-3">ผลการค้นหา</h6>
              {appointments.length === 0 ? (
                <p className="text-center py-4 text-muted">ไม่พบคิวนัดหมาย</p>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {appointments.map(app => (
                    <div key={app.id} className="dc-card-flat p-3 d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fw-bold">{app.notes}</div>
                        <small className="text-muted">วันนัด: {new Date(app.appointment_date).toLocaleDateString('th-TH')} เวลา {new Date(app.time_slot).toLocaleTimeString('th-TH', {hour: '2-digit', minute:'2-digit'})} น.</small>
                      </div>
                      <span className="dc-badge" style={{ background: app.status === 'COMPLETED' ? 'var(--success-soft)' : 'var(--warning-soft)', color: app.status === 'COMPLETED' ? 'var(--success)' : 'var(--warning)' }}>
                        {app.status === 'COMPLETED' ? 'ตรวจแล้ว' : 'รอดำเนินการ'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientPortal;