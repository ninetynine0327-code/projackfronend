import React, { useState } from 'react';

const API_URL = 'http://localhost:4000/api';

const PatientPortal = () => {
  const [phone, setPhone] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
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

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="dc-card p-4 mb-4">
            <h5 className="dc-display fw-bold mb-3">ตรวจสอบคิวนัดหมายของคุณ</h5>
            <form onSubmit={handleSearch} className="d-flex gap-2">
              <input
                type="tel"
                className="dc-input"
                placeholder="กรอกเบอร์โทรศัพท์ที่ใช้ตอนจองคิว"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <button type="submit" className="dc-btn dc-btn-primary px-4">ค้นหา</button>
            </form>
          </div>

          {searched && (
            <div className="dc-card p-4">
              <h6 className="dc-display fw-bold mb-3">ผลการค้นหา</h6>
              {appointments.length === 0 ? (
                <p className="text-center py-4" style={{ color: 'var(--text-muted)' }}>ไม่พบคิวนัดหมายสำหรับเบอร์โทรนี้</p>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {appointments.map(app => (
                    <div key={app.id} className="dc-card-flat p-3 d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fw-bold">{app.notes || 'ตรวจสุขภาพฟัน'}</div>
                        <small style={{ color: 'var(--text-muted)' }}>
                          วันนัด: {new Date(app.appointment_date).toLocaleDateString('th-TH')}
                        </small>
                      </div>
                      <span className="dc-badge" style={{
                        background: app.status === 'COMPLETED' ? 'var(--success-soft)' : 'var(--warning-soft)',
                        color: app.status === 'COMPLETED' ? 'var(--success)' : 'var(--warning)'
                      }}>
                        {app.status === 'COMPLETED' ? 'ตรวจเสร็จสิ้น' : 'รอดำเนินการ'}
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