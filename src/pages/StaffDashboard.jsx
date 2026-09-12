import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:4000/api';

const StaffDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [filterStatus, setFilterStatus] = useState('ALL');

  const fetchAppointments = async () => {
    try {
      const res = await fetch(`${API_URL}/appointments`);
      if (res.ok) {
        const data = await res.json();
        setAppointments(data);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter(item => {
    if (filterStatus === 'ALL') return true;
    return item.status === filterStatus;
  });

  return (
    <div className="container py-5">
      <div className="dc-card p-4">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <div>
            <h5 className="dc-display fw-bold mb-0">ตารางคิวนัดหมายคนไข้</h5>
            <small style={{ color: 'var(--text-muted)' }}>จัดการคิวตรวจทันตแพทย์ทั้งหมด</small>
          </div>
          <div className="d-flex gap-1">
            {['ALL', 'PENDING', 'COMPLETED'].map(st => (
              <button
                key={st}
                className="dc-btn dc-btn-ghost"
                style={{
                  padding: '.35rem .9rem',
                  fontSize: '.82rem',
                  background: filterStatus === st ? 'var(--primary)' : 'var(--surface)',
                  color: filterStatus === st ? 'var(--on-primary)' : 'var(--text)'
                }}
                onClick={() => setFilterStatus(st)}
              >
                {st === 'ALL' ? 'ทั้งหมด' : st === 'PENDING' ? 'รอดำเนินการ' : 'ตรวจเสร็จสิ้น'}
              </button>
            ))}
          </div>
        </div>

        <div className="table-responsive">
          <table className="dc-table w-100">
            <thead>
              <tr>
                <th>ชื่อคนไข้</th>
                <th>เบอร์ติดต่อ</th>
                <th>รายการรักษา</th>
                <th>วัน-เวลานัด</th>
                <th>สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4" style={{ color: 'var(--text-muted)' }}>
                    ไม่พบรายการนัดหมาย
                  </td>
                </tr>
              ) : (
                filteredAppointments.map(app => (
                  <tr key={app.id}>
                    <td className="fw-semibold">{app.user?.full_name || 'คนไข้ทั่วไป'}</td>
                    <td>{app.user?.phone_number || '-'}</td>
                    <td>{app.notes || 'ตรวจสุขภาพฟัน'}</td>
                    <td>{new Date(app.appointment_date).toLocaleDateString('th-TH')}</td>
                    <td>
                      <span
                        className="dc-badge"
                        style={{
                          background: app.status === 'COMPLETED' ? 'var(--success-soft)' : 'var(--warning-soft)',
                          color: app.status === 'COMPLETED' ? 'var(--success)' : 'var(--warning)'
                        }}
                      >
                        {app.status === 'COMPLETED' ? 'ตรวจเสร็จสิ้น' : 'รอดำเนินการ'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;