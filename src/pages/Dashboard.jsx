import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:4000/api';

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0, cancelled: 0 });

  useEffect(() => {
    fetch(`${API_URL}/appointments`)
      .then((res) => res.json())
      .then((data) => {
        setStats({
          total: data.length,
          pending: data.filter((a) => a.status === 'PENDING').length,
          completed: data.filter((a) => a.status === 'COMPLETED').length,
          cancelled: data.filter((a) => a.status === 'CANCELLED').length
        });
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>สถิติการนัดหมาย</h2>
      <div className="row g-2">
        <div className="col"><div className="card p-3 text-center bg-light">ทั้งหมด: {stats.total}</div></div>
        <div className="col"><div className="card p-3 text-center bg-warning">รอดำเนินการ: {stats.pending}</div></div>
        <div className="col"><div className="card p-3 text-center bg-success text-white">เสร็จสิ้น: {stats.completed}</div></div>
        <div className="col"><div className="card p-3 text-center bg-danger text-white">ยกเลิก: {stats.cancelled}</div></div>
      </div>
    </div>
  );
};

export default Dashboard;