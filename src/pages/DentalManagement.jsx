import React, { useState, useEffect } from 'react';

const API_URL = `https://f9cflrwv-4000.asse.devtunnels.ms/api`;

const DentalManagement = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const isStaff = user?.role === 'staff' || user?.role === 'admin';

  const [dentists, setDentists] = useState([]);
  const [schedules, setSchedules] = useState([]);
  
  // State สำหรับฟอร์มเพิ่มหมอ
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');

  // State สำหรับฟอร์มเพิ่มตารางเวร
  const [scheduleDentist, setScheduleDentist] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');

  const fetchData = async () => {
    try {
      const resDentists = await fetch(`${API_URL}/dentists`);
      if (resDentists.ok) {
        const d = await resDentists.json();
        setDentists(d);
        if (d.length > 0 && !scheduleDentist) setScheduleDentist(d[0].id);
      }
      
      const resSchedules = await fetch(`${API_URL}/schedules`);
      if (resSchedules.ok) setSchedules(await resSchedules.json());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleAddDentist = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      const res = await fetch(`${API_URL}/dentists`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: name, specialization: specialty })
      });
      if (res.ok) {
        setName(''); setSpecialty('');
        fetchData();
      }
    } catch (err) { alert("ไม่สามารถเพิ่มข้อมูลได้"); }
  };

  const handleAddSchedule = async (e) => {
    e.preventDefault();
    if (!scheduleDentist || !scheduleDate) return;
    try {
      const res = await fetch(`${API_URL}/schedules`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dentist_id: scheduleDentist,
          work_date: scheduleDate,
          start_time: startTime,
          end_time: endTime
        })
      });
      if (res.ok) {
        setScheduleDate('');
        fetchData();
      } else {
        const data = await res.json();
        alert(data.message || "เกิดข้อผิดพลาด");
      }
    } catch (err) { alert("ไม่สามารถเพิ่มตารางเวรได้"); }
  };

  return (
    <div className="container py-5">
      <h4 className="dc-display fw-bold mb-4">รายชื่อและตารางทันตแพทย์</h4>
      
      {/* ส่วนจัดการรายชื่อแพทย์ */}
      {isStaff && (
        <div className="dc-card p-4 mb-4">
          <h6 className="fw-bold mb-3">เพิ่มทันตแพทย์ใหม่</h6>
          <form onSubmit={handleAddDentist} className="row g-2 align-items-end">
            <div className="col-md-5">
              <label className="dc-label">ชื่อ - นามสกุล</label>
              <input className="dc-input" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="col-md-5">
              <label className="dc-label">ความเชี่ยวชาญ</label>
              <input className="dc-input" value={specialty} onChange={(e) => setSpecialty(e.target.value)} placeholder="เช่น ทันตกรรมจัดฟัน" />
            </div>
            <div className="col-md-2">
              <button type="submit" className="dc-btn dc-btn-primary w-100">เพิ่มรายชื่อ</button>
            </div>
          </form>
        </div>
      )}

      {/* ส่วนจัดการตารางเวลาออกตรวจ */}
      {isStaff && (
        <div className="dc-card p-4 mb-4" style={{ backgroundColor: 'var(--surface)' }}>
          <h6 className="fw-bold mb-3">ตั้งค่าเวลาออกตรวจ (เฉพาะเจ้าหน้าที่)</h6>
          <form onSubmit={handleAddSchedule} className="row g-2 align-items-end">
            <div className="col-md-3">
              <label className="dc-label">แพทย์</label>
              <select className="dc-input" value={scheduleDentist} onChange={(e) => setScheduleDentist(e.target.value)} required>
                {dentists.map(d => <option key={d.id} value={d.id}>{d.full_name}</option>)}
              </select>
            </div>
            <div className="col-md-3">
              <label className="dc-label">วันที่เข้าเวร</label>
              <input type="date" className="dc-input" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} required />
            </div>
            <div className="col-md-2">
              <label className="dc-label">เวลาเริ่ม</label>
              <input type="time" className="dc-input" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
            </div>
            <div className="col-md-2">
              <label className="dc-label">เวลาเลิก</label>
              <input type="time" className="dc-input" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
            </div>
            <div className="col-md-2">
              <button type="submit" className="dc-btn dc-btn-primary w-100" style={{ backgroundColor: 'var(--accent)' }}>บันทึกเวร</button>
            </div>
          </form>
        </div>
      )}

      {/* แสดงตารางคิวงานที่ตั้งค่าไว้ */}
      <h5 className="dc-display fw-bold mb-3 mt-5">ตารางเวรแพทย์ที่บันทึกไว้</h5>
      <div className="dc-card p-4">
        {schedules.length === 0 ? (
          <p className="text-muted mb-0">ยังไม่มีการตั้งค่าตารางเวร</p>
        ) : (
          <table className="dc-table w-100">
            <thead>
              <tr>
                <th>วันที่</th>
                <th>แพทย์ผู้รักษา</th>
                <th>เวลาออกตรวจ</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map(s => (
                <tr key={s.id}>
                  <td className="fw-bold">{new Date(s.work_date).toLocaleDateString('th-TH')}</td>
                  <td>{s.dentist?.full_name}</td>
                  <td>{s.start_time} - {s.end_time} น.</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DentalManagement;