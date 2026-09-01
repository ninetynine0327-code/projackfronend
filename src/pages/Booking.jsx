import React, { useState } from 'react';

const API_URL = 'http://localhost:4000/api';

const Booking = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientPhone: '',
    dentistId: '1',
    treatment: '',
    appointmentDate: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dentistId: Number(formData.dentistId),
          patientName: formData.patientName.trim(),
          patientPhone: formData.patientPhone.trim(),
          treatment: formData.treatment,
          appointmentDate: new Date(formData.appointmentDate).toISOString()
        })
      });

      if (response.ok) {
        alert('จองคิวสำเร็จ');
        setFormData({
          patientName: '',
          patientPhone: '',
          dentistId: '1',
          treatment: '',
          appointmentDate: ''
        });
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'การจองคิวไม่สำเร็จ');
      }
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
    }
  };

  return (
    <div>
      <h2>นัดหมายตรวจทันตกรรม</h2>
      <div className="card p-3 mb-4">
        <form onSubmit={handleBookingSubmit}>
          <div className="mb-3">
            <label className="form-label">ชื่อ-นามสกุล คนไข้</label>
            <input
              type="text"
              name="patientName"
              className="form-control"
              value={formData.patientName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">เบอร์โทรศัพท์</label>
            <input
              type="tel"
              name="patientPhone"
              className="form-control"
              value={formData.patientPhone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">เลือกการรักษา</label>
            <select
              name="treatment"
              className="form-select"
              value={formData.treatment}
              onChange={handleChange}
              required
            >
              <option value="">-- เลือกการรักษา --</option>
              <option value="ตรวจสุขภาพฟันและขูดหินปูน">ตรวจสุขภาพฟันและขูดหินปูน</option>
              <option value="อุดฟัน">อุดฟัน</option>
              <option value="ถอนฟัน / ผ่าฟันคุด">ถอนฟัน / ผ่าฟันคุด</option>
              <option value="รักษารากฟัน">รักษารากฟัน</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">วันและเวลานัดหมาย</label>
            <input
              type="datetime-local"
              name="appointmentDate"
              className="form-control"
              value={formData.appointmentDate}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            ยืนยันการจองคิว
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;