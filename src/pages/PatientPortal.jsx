import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../assets/hero.png';

const PatientPortal = () => {
  const [categories] = useState([
    { id: 1, name: 'ศัลยศาสตร์ช่องปาก', description: 'ถอนฟัน ผ่าฟันคุด และศัลยกรรมเหงือก' },
    { id: 2, name: 'ทันตกรรมหัตถการ', description: 'อุดฟัน ขูดหินปูน และทำความสะอาดคราบลึก' },
    { id: 3, name: 'ทันตกรรมจัดฟัน', description: 'จัดฟันโลหะ จัดฟันใส Damon' },
  ]);

  const [booking, setBooking] = useState({
    patient_name: '',
    phone: '',
    category: 'ทันตกรรมหัตถการ',
    date: '',
    time: '09:00',
    notes: '',
  });

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    alert(`ส่งคำขอนัดหมายเรียบร้อยแล้ว!\nคนไข้: ${booking.patient_name}\nบริการ: ${booking.category}`);
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Navbar สำหรับลูกค้า */}
      <nav className="navbar px-4 text-white shadow-sm" style={{ backgroundColor: '#0284c7' }}>
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <span className="navbar-brand text-white fw-semibold fs-5">
            🦷 คลินิกทันตกรรม (สำหรับคนไข้)
          </span>
          <Link to="/staff/login" className="btn btn-light btn-sm text-primary fw-semibold">
            🔒 เข้าสู่ระบบพนักงาน
          </Link>
        </div>
      </nav>

      <div className="container py-4" style={{ maxWidth: '900px' }}>
        {/* Banner */}
        <div className="card border-0 shadow-sm rounded-3 p-4 mb-4 bg-white">
          <div className="row align-items-center">
            <div className="col-md-7">
              <span className="badge rounded-pill px-3 py-2 mb-2" style={{ backgroundColor: '#e0f2fe', color: '#0284c7' }}>
                Online Appointment
              </span>
              <h3 className="fw-bold text-dark mb-2">ยินดีต้อนรับสู่ระบบนัดหมาย</h3>
              <p className="text-secondary small mb-3">
                ตรวจสุขภาพช่องปากและนัดคิวล่วงหน้าได้สะดวกรวดเร็ว
              </p>
              <a href="#booking" className="btn text-white px-4" style={{ backgroundColor: '#0284c7' }}>
                จองคิวตรวจทันที
              </a>
            </div>
            <div className="col-md-5 text-center mt-3 mt-md-0">
              <img
                src={heroImg}
                alt="Clinic Hero"
                className="img-fluid rounded-3"
                style={{ maxHeight: '160px', objectFit: 'cover' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          </div>
        </div>

        {/* หมวดหมู่บริการ */}
        <div className="card border-0 shadow-sm rounded-3 p-4 mb-4 bg-white">
          <h5 className="fw-bold mb-3" style={{ color: '#0284c7' }}>หมวดหมู่การรักษา</h5>
          <div className="row g-3">
            {categories.map((c) => (
              <div key={c.id} className="col-md-4">
                <div className="p-3 rounded-3 h-100 bg-light border">
                  <h6 className="fw-bold text-dark mb-1">{c.name}</h6>
                  <p className="text-secondary small mb-0">{c.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ฟอร์มจองคิว */}
        <div id="booking" className="card border-0 shadow-sm rounded-3 p-4 bg-white">
          <h5 className="fw-bold mb-3" style={{ color: '#0284c7' }}>แบบฟอร์มนัดหมายออนไลน์</h5>
          <form onSubmit={handleBookingSubmit}>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label small fw-semibold text-secondary">ชื่อ - นามสกุล</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={booking.patient_name}
                  onChange={(e) => setBooking({ ...booking, patient_name: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-semibold text-secondary">เบอร์โทรศัพท์</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={booking.phone}
                  onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                />
              </div>
            </div>
            <div className="row g-3 mb-3">
              <div className="col-md-4">
                <label className="form-label small fw-semibold text-secondary">บริการ</label>
                <select
                  className="form-select"
                  value={booking.category}
                  onChange={(e) => setBooking({ ...booking, category: e.target.value })}
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label small fw-semibold text-secondary">วันที่</label>
                <input
                  type="date"
                  className="form-control"
                  required
                  value={booking.date}
                  onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label small fw-semibold text-secondary">เวลา</label>
                <select
                  className="form-select"
                  value={booking.time}
                  onChange={(e) => setBooking({ ...booking, time: e.target.value })}
                >
                  <option value="09:00">09:00 น.</option>
                  <option value="11:00">11:00 น.</option>
                  <option value="14:00">14:00 น.</option>
                  <option value="16:00">16:00 น.</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn w-100 text-white fw-semibold" style={{ backgroundColor: '#0284c7' }}>
              ส่งข้อมูลการจอง
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientPortal;