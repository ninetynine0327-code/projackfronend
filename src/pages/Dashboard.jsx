import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:4000/api';

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0 });

  useEffect(() => {
    fetch(`${API_URL}/appointments`)
      .then(res => res.json())
      .then(data => {
        setStats({
          total: data.length,
          pending: data.filter(a => a.status === 'PENDING').length,
          completed: data.filter(a => a.status === 'COMPLETED').length
        });
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container py-5">
      <h4 className="dc-display fw-bold mb-4">ภาพรวมสถิติคิวนัดหมาย</h4>
      <div className="row g-3">
        <div className="col-md-4">
          <div className="dc-card p-4 text-center">
            <span style={{ color: 'var(--text-muted)' }}>คิวนัดหมายทั้งหมด</span>
            <h2 className="fw-bold mt-2 mb-0" style={{ color: 'var(--primary)' }}>{stats.total}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="dc-card p-4 text-center">
            <span style={{ color: 'var(--text-muted)' }}>รอดำเนินการ</span>
            <h2 className="fw-bold mt-2 mb-0" style={{ color: 'var(--warning)' }}>{stats.pending}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="dc-card p-4 text-center">
            <span style={{ color: 'var(--text-muted)' }}>ตรวจเสร็จสิ้น</span>
            <h2 className="fw-bold mt-2 mb-0" style={{ color: 'var(--success)' }}>{stats.completed}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;