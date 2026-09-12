import React, { useState } from 'react';

const API_URL = 'http://localhost:4000/api';

const Booking = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [patientName, setPatientName] = useState(user?.full_name || '');
  const [patientPhone, setPatientPhone] = useState(user?.phone_number || '');
  const [treatment, setTreatment] = useState('ตรวจสุขภาพฟันและขูดหินปูน');
  const [dentistId, setDentistId] = useState(1);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [confirmation, setConfirmation] = useState(null);

  const timeSlots = ["09:00", "09:30", "10:00", "10:30", "11:00", "13:00", "13:30", "14:00", "14:30", "15:00", "16:00"];

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim() || !appointmentDate || !timeSlot) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    const payload = {
      user_id: user ? user.id : null,
      dentist_id: Number(dentistId),
      patientName: patientName.trim(),
      patientPhone: patientPhone.trim(),
      treatment: treatment,
      appointment_date: appointmentDate,
      time_slot: timeSlot,
      notes: treatment
    };

    try {
      const res = await fetch(`${API_URL}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (res.ok) {
        setConfirmation({
          code: `DC-${data.appointment?.id || Date.now().toString().slice(-4)}`,
          patientName,
          treatment,
          date: appointmentDate,
          time: timeSlot
        });
      } else {
        alert(data.message || 'เกิดข้อผิดพลาดในการจองคิว');
      }
    } catch (err) {
      alert('ไม่สามารถติดต่อเซิร์ฟเวอร์ Backend (พอร์ต 4000) ได้');
    }
  };

  return (
    <div className="container py-5">
      {confirmation ? (
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="dc-card p-5 text-center">
              <div style={{ fontSize: '3rem' }}>🎉</div>
              <h3 className="dc-display fw-bold mt-2">จองคิวนัดหมายสำเร็จ</h3>
              <div className="dc-card-flat p-3 my-4 text-start">
                <div><strong>รหัสนัดหมาย:</strong> <span className="dc-mono">{confirmation.code}</span></div>
                <div><strong>ชื่อคนไข้:</strong> {confirmation.patientName}</div>
                <div><strong>การรักษา:</strong> {confirmation.treatment}</div>
                <div><strong>วัน-เวลา:</strong> {confirmation.date} • {confirmation.time} น.</div>
              </div>
              <button className="dc-btn dc-btn-primary" onClick={() => setConfirmation(null)}>จองคิวใหม่อีกครั้ง</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="dc-card p-4">
              <h5 className="dc-display fw-bold mb-3">จองคิวนัดหมายทันตกรรม</h5>
              <form onSubmit={handleBookingSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="dc-label">ชื่อ - นามสกุล คนไข้</label>
                    <input className="dc-input" value={patientName} onChange={(e) => setPatientName(e.target.value)} required />
                  </div>
                  <div className="col-md-6">
                    <label className="dc-label">เบอร์โทรศัพท์ติดต่อ</label>
                    <input className="dc-input" value={patientPhone} onChange={(e) => setPatientPhone(e.target.value)} required />
                  </div>
                  <div className="col-md-6">
                    <label className="dc-label">เลือกการรักษา</label>
                    <select className="dc-input" value={treatment} onChange={(e) => setTreatment(e.target.value)}>
                      <option value="ตรวจสุขภาพฟันและขูดหินปูน">ตรวจสุขภาพฟันและขูดหินปูน</option>
                      <option value="อุดฟันและบูรณะฟัน">อุดฟันและบูรณะฟัน</option>
                      <option value="ถอนฟัน / ผ่าฟันคุด">ถอนฟัน / ผ่าฟันคุด</option>
                      <option value="ทันตกรรมจัดฟัน">ทันตกรรมจัดฟัน</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="dc-label">แพทย์ผู้รักษา</label>
                    <select className="dc-input" value={dentistId} onChange={(e) => setDentistId(e.target.value)}>
                      <option value="1">ทพญ. พิมพ์ชนก วงศ์ทันตกรรม</option>
                      <option value="2">ทพ. ธนกร ศัลยกิจ</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="dc-label">วันที่นัดหมาย</label>
                    <input type="date" className="dc-input" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} required />
                  </div>
                  <div className="col-md-6">
                    <label className="dc-label">เวลาที่สะดวก</label>
                    <select className="dc-input" value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} required>
                      <option value="">-- เลือกเวลา --</option>
                      {timeSlots.map(t => <option key={t} value={t}>{t} น.</option>)}
                    </select>
                  </div>
                  <div className="col-12 mt-4">
                    <button type="submit" className="dc-btn dc-btn-primary w-100 justify-content-center">
                      ยืนยันการจองคิวนัดหมาย
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;