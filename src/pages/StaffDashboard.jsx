import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:4000/api';

const StaffDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [filterStatus, setFilterStatus] = useState('ALL');

  const fetchAppointments = async () => {
    try {
      const res = await fetch(`${API_URL}/appointments`);
      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_URL}/appointments/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) fetchAppointments();
    } catch (err) {
      console.error('Update status error:', err);
    }
  };

  const filteredAppointments = appointments.filter((item) => {
    if (filterStatus === 'ALL') return true;
    return item.status === filterStatus;
  });

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>ตารางคิวนัดหมาย</h2>
        <div className="btn-group">
          <button className={`btn btn-sm ${filterStatus === 'ALL' ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setFilterStatus('ALL')}>ทั้งหมด</button>
          <button className={`btn btn-sm ${filterStatus === 'PENDING' ? 'btn-warning' : 'btn-outline-secondary'}`} onClick={() => setFilterStatus('PENDING')}>รอดำเนินการ</button>
          <button className={`btn btn-sm ${filterStatus === 'COMPLETED' ? 'btn-success' : 'btn-outline-secondary'}`} onClick={() => setFilterStatus('COMPLETED')}>เสร็จสิ้น</button>
          <button className={`btn btn-sm ${filterStatus === 'CANCELLED' ? 'btn-danger' : 'btn-outline-secondary'}`} onClick={() => setFilterStatus('CANCELLED')}>ยกเลิก</button>
        </div>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Id</th>
            <th>ชื่อคนไข้</th>
            <th>เบอร์ติดต่อ</th>
            <th>การรักษา</th>
            <th>วัน-เวลานัด</th>
            <th>สถานะ</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">ไม่มีข้อมูลนัดหมาย</td>
            </tr>
          ) : (
            filteredAppointments.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.patientName}</td>
                <td>{item.patientPhone}</td>
                <td>{item.treatment}</td>
                <td>{new Date(item.appointmentDate).toLocaleString()}</td>
                <td>{item.status}</td>
                <td>
                  {item.status === 'PENDING' && (
                    <>
                      <button className="btn btn-success btn-sm me-2" onClick={() => handleUpdateStatus(item.id, 'COMPLETED')}>
                        เสร็จสิ้น
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleUpdateStatus(item.id, 'CANCELLED')}>
                        ยกเลิก
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StaffDashboard;