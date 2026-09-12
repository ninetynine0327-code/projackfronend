import React from 'react';

const DentalManagement = () => {
  const dentists = [
    { id: 1, name: "ทพญ. พิมพ์ชนก วงศ์ทันตกรรม", specialty: "ทันตกรรมทั่วไป / ขูดหินปูน" },
    { id: 2, name: "ทพ. ธนกร ศัลยกิจ", specialty: "ศัลยศาสตร์ช่องปาก / ผ่าฟันคุด" }
  ];

  return (
    <div className="container py-5">
      <h4 className="dc-display fw-bold mb-4">รายชื่อทันตแพทย์ประจำคลินิก</h4>
      <div className="row g-3">
        {dentists.map(d => (
          <div className="col-md-6" key={d.id}>
            <div className="dc-card p-4">
              <h5 className="fw-bold mb-1" style={{ color: 'var(--primary)' }}>{d.name}</h5>
              <p className="mb-0" style={{ color: 'var(--text-muted)' }}>{d.specialty}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DentalManagement;