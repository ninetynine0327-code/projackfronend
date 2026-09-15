import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const categories = [
    { id: 1, name: "ศัลยศาสตร์ช่องปาก", description: "ถอนฟัน ผ่าฟันคุด และผ่าตัดช่องปาก", icon: "🦷" },
    { id: 2, name: "ทันตกรรมหัตถการ", description: "อุดฟัน ขูดหินปูน และทำความสะอาดฟัน", icon: "🪥" },
    { id: 3, name: "ทันตกรรมจัดฟัน", description: "เครื่องมือจัดฟันและปรับโครงสร้างขากรรไกร", icon: "✨" }
  ];

  return (
    <div className="container py-5">
      <div className="dc-card p-5 mb-5 text-center">
        <div className="mb-2" style={{ color: 'var(--accent-strong)', fontWeight: '700', fontSize: '.85rem' }}>คลินิกทันตกรรมครบวงจร</div>
        <h1 className="dc-display fw-bold mb-3" style={{ fontSize: '2.5rem' }}>ยิ้มอย่างมั่นใจ ดูแลฟันโดยแพทย์ผู้เชี่ยวชาญ</h1>
        <p className="mx-auto mb-4" style={{ color: 'var(--text-muted)', maxWidth: '600px' }}>
          บริการตรวจสุขภาพช่องปาก อุดฟัwน ขูดหินปูน ผ่าฟันคุด และจัดฟัน พร้อมระบบนัดหมายออนไลน์
        </p>
        <div className="d-flex justify-content-center gap-3">
          <Link to="/booking" className="dc-btn dc-btn-primary">จองคิวนัดหมาย →</Link>
          <Link to="/portal" className="dc-btn dc-btn-ghost">ตรวจสอบคิวตรวจ</Link>
        </div>
      </div>
      <div className="row g-4">
        {categories.map((cat) => (
          <div className="col-md-4" key={cat.id}>
            <div className="dc-card p-4 h-100">
              <div style={{ fontSize: '2.5rem' }} className="mb-2">{cat.icon}</div>
              <h5 className="dc-display fw-semibold mb-2">{cat.name}</h5>
              <p style={{ color: 'var(--text-muted)', fontSize: '.92rem' }}>{cat.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;