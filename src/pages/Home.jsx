import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import heroImg from '../assets/hero.png';

const Home = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [dentists] = useState([
    { id: 1, full_name: 'ทพ. สมศักดิ์ จัดฟันดี', specialization: 'ทันตกรรมจัดฟัน (Orthodontics)' },
    { id: 2, full_name: 'ทพญ. รักษ์ดี สดใส', specialization: 'ทันตกรรมทั่วไป (General Dentistry)' },
    { id: 3, full_name: 'ทพ. วรเมธ รากฟันแท้', specialization: 'ทันตกรรมรากเทียม (Implantology)' },
  ]);

  const [bookingData, setBookingData] = useState({
    dentist_id: '',
    appointment_date: '',
    time_slot: '09:00',
    notes: '',
  });

  const navigate = useNavigate();

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert('กรุณาเข้าสู่ระบบก่อนทำการจองคิว');
      navigate('/login');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 1,
          ...bookingData,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'ไม่สามารถทำการจองได้');

      alert('จองคิวนัดหมายสำเร็จเรียบร้อย');
      setBookingData({ dentist_id: '', appointment_date: '', time_slot: '09:00', notes: '' });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {/* Navbar ทางการ */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
        <div className="container">
          <Link className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2" to="/">
            🦷 PROMAX DENTAL CLINIC
          </Link>
          <div className="d-flex align-items-center gap-2">
            {token ? (
              <>
                <Link to="/dashboard" className="btn btn-light btn-sm fw-semibold text-primary">
                  จัดการข้อมูลคนไข้
                </Link>
                <button onClick={handleLogout} className="btn btn-outline-light btn-sm">
                  ออกจากระบบ
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-light btn-sm">
                  เข้าสู่ระบบ
                </Link>
                <Link to="/register" className="btn btn-light btn-sm fw-semibold text-primary">
                  สมัครสมาชิก
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section พร้อมรูปภาพ hero.png */}
      <section className="bg-white border-bottom py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="badge bg-primary-subtle text-primary mb-3 px-3 py-2 rounded-pill fw-bold">
                PROMAX ORAL HEALTH CARE
              </span>
              <h1 className="display-5 fw-bold text-dark mb-3">
                ดูแลทุกรอยยิ้มด้วยความใส่ใจและมาตรฐานสากล
              </h1>
              <p className="lead text-secondary mb-4">
                บริการรักษาทันตกรรมครบวงจร ตรวจสุขภาพช่องปาก ขูดหินปูน อุดฟัน จัดฟัน และรากฟันเทียม โดยทีมทันตแพทย์เฉพาะทาง พร้อมระบบนัดหมายล่วงหน้าแบบออนไลน์
              </p>
              <div className="d-flex gap-3">
                <a href="#booking-form" className="btn btn-primary btn-lg px-4 shadow-sm fw-semibold">
                  จองคิวออนไลน์
                </a>
                <a href="#services" className="btn btn-outline-secondary btn-lg px-4">
                  ดูบริการทั้งหมด
                </a>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <img
                src={heroImg}
                alt="Promax Dental Clinic"
                className="img-fluid rounded-4 shadow-sm"
                style={{ maxHeight: '420px', objectFit: 'cover' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* จุดเด่น / สถิติสั้นๆ */}
      <section className="bg-primary text-white py-4">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-md-4">
              <h3 className="fw-bold mb-1">100%</h3>
              <p className="mb-0 text-white-50">อุปกรณ์ปลอดเชื้อตามมาตรฐานสากล</p>
            </div>
            <div className="col-md-4">
              <h3 className="fw-bold mb-1">แพทย์เฉพาะทาง</h3>
              <p className="mb-0 text-white-50">ครอบคลุมทุกสาขาทันตกรรม</p>
            </div>
            <div className="col-md-4">
              <h3 className="fw-bold mb-1">จองคิวง่าย</h3>
              <p className="mb-0 text-white-50">เลือกเวลาและแพทย์ได้ทันที</p>
            </div>
          </div>
        </div>
      </section>

      {/* การบริการ (Services) */}
      <section id="services" className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-dark">บริการทันตกรรมของเรา</h2>
          <p className="text-muted">ครบครันทุกการดูแลรักษา เพื่อสุขภาพฟันที่ดีที่สุดของคุณ</p>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm p-4 text-center">
              <div className="fs-1 text-primary mb-3">🦷</div>
              <h5 className="fw-bold">ทันตกรรมทั่วไป & ป้องกัน</h5>
              <p className="text-muted small">
                ตรวจสุขภาพฟัน ขูดหินปูน อุดฟัน เคลือบฟลูออไรด์ ถอนฟัน และรักษาโรคเหงือก
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm p-4 text-center">
              <div className="fs-1 text-primary mb-3">✨</div>
              <h5 className="fw-bold">ทันตกรรมเพื่อความงาม & จัดฟัน</h5>
              <p className="text-muted small">
                จัดฟันโลหะ จัดฟันใส Damon, ฟอกสีฟันระบบ Cool Light และทำวีเนียร์
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm p-4 text-center">
              <div className="fs-1 text-primary mb-3">🩺</div>
              <h5 className="fw-bold">ศัลยกรรมช่องปาก & รากเทียม</h5>
              <p className="text-muted small">
                ผ่าฟันคุด รักษารากฟัน และฝังรากฟันเทียมด้วยเทคโนโลยีแม่นยำสูง
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ฟอร์มจองคิวออนไลน์ */}
      <section id="booking-form" className="py-5 bg-white border-top border-bottom">
        <div className="container" style={{ maxWidth: '680px' }}>
          <div className="card border-0 shadow-sm p-4 p-md-5">
            <div className="text-center mb-4">
              <h3 className="fw-bold text-dark">แบบฟอร์มนัดหมายออนไลน์</h3>
              <p className="text-muted">เลือกแพทย์และเวลานัดที่สะดวกเพื่อเข้ารับการตรวจ</p>
            </div>

            <form onSubmit={handleBookingSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">เลือกทันตแพทย์</label>
                <select
                  className="form-select"
                  required
                  value={bookingData.dentist_id}
                  onChange={(e) => setBookingData({ ...bookingData, dentist_id: e.target.value })}
                >
                  <option value="">-- เลือกแพทย์ผู้ตรวจ --</option>
                  {dentists.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.full_name} ({d.specialization})
                    </option>
                  ))}
                </select>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">วันที่ต้องการนัด</label>
                  <input
                    type="date"
                    className="form-control"
                    required
                    value={bookingData.appointment_date}
                    onChange={(e) => setBookingData({ ...bookingData, appointment_date: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">ช่วงเวลา</label>
                  <select
                    className="form-select"
                    value={bookingData.time_slot}
                    onChange={(e) => setBookingData({ ...bookingData, time_slot: e.target.value })}
                  >
                    <option value="09:00">09:00 - 10:00 น.</option>
                    <option value="10:30">10:30 - 11:30 น.</option>
                    <option value="13:00">13:00 - 14:00 น.</option>
                    <option value="14:30">14:30 - 15:30 น.</option>
                    <option value="16:00">16:00 - 17:00 น.</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">อาการเบื้องต้น / บริการที่ต้องการ</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="เช่น ปวดฟัน, ตรวจเช็กสุขภาพฟันประจำปี, ปรึกษาจัดฟัน"
                  value={bookingData.notes}
                  onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold shadow-sm">
                ยืนยันการจองคิวนัดหมาย
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer ทางการ */}
      <footer className="bg-dark text-white py-4 mt-auto">
        <div className="container">
          <div className="row g-3 text-center text-md-start">
            <div className="col-md-6">
              <h5 className="fw-bold mb-1">PROMAX DENTAL CLINIC</h5>
              <p className="text-secondary small mb-0">
                เปิดบริการ: จันทร์ - อาทิตย์ เวลา 09:00 - 19:00 น. | ติดต่อ: 02-123-4567
              </p>
            </div>
            <div className="col-md-6 text-md-end text-secondary small">
              © 2026 Promax Dental Clinic. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;