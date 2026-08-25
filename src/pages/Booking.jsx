import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Booking = () => {
  const [dentists, setDentists] = useState([]);
  const [formData, setFormData] = useState({
    dentist_id: '',
    appointment_date: '',
    time_slot: '09:00',
    notes: '',
  });
  const navigate = useNavigate();

  // ดึงข้อมูลแพทย์เพื่อใส่ใน Dropdown
  useEffect(() => {
    // กำหนด Mock Data หรือดึงจาก GET /api/dentists
    setDentists([
      { id: 1, full_name: 'ทพ. สมศักดิ์ จัดฟันดี', specialization: 'จัดฟัน (Orthodontics)' },
      { id: 2, full_name: 'ทพญ. รักษ์ดี สดใส', specialization: 'ทันตกรรมทั่วไป (General)' },
    ]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('กรุณาเข้าสู่ระบบก่อนจองคิว');
      navigate('/login');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 1, // หรือส่ง id ของ user ที่ล็อกอินอยู่
          ...formData,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'จองคิวไม่สำเร็จ');

      alert('จองคิวสำเร็จ!');
      navigate('/dashboard');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <div className="card p-4 shadow-sm">
        <h3 className="text-center mb-3">จองคิวตรวจฟันออนไลน์</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">เลือกทันตแพทย์</label>
            <select
              className="form-select"
              required
              value={formData.dentist_id}
              onChange={(e) => setFormData({ ...formData, dentist_id: e.target.value })}
            >
              <option value="">-- เลือกแพทย์ --</option>
              {dentists.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.full_name} ({d.specialization})
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">วันที่นัดหมาย</label>
            <input
              type="date"
              className="form-control"
              required
              value={formData.appointment_date}
              onChange={(e) => setFormData({ ...formData, appointment_date: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">ช่วงเวลา</label>
            <select
              className="form-select"
              value={formData.time_slot}
              onChange={(e) => setFormData({ ...formData, time_slot: e.target.value })}
            >
              <option value="09:00">09:00 - 10:00</option>
              <option value="10:30">10:30 - 11:30</option>
              <option value="13:00">13:00 - 14:00</option>
              <option value="14:30">14:30 - 15:30</option>
              <option value="16:00">16:00 - 17:00</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">อาการเบื้องต้น / หมายเหตุ</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="เช่น ตรวจสุขภาพฟัน, ปวดฟันกราม, ขูดหินปูน"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            ยืนยันการจองคิว
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;