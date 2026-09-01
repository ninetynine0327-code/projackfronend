import React, { useState } from 'react';

const DentalManagement = () => {
  const [dentists] = useState([
    { id: 1, name: 'ทพ. สมชาย รักฟัน', specialty: 'ทันตกรรมทั่วไป' },
    { id: 2, name: 'ทพญ. สุดา ใจดี', specialty: 'จัดฟัน' },
    { id: 3, name: 'ทพ. วิชัย สดใส', specialty: 'รักษารากฟัน' }
  ]);

  return (
    <div>
      <h2>รายชื่อทันตแพทย์</h2>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Id</th>
            <th>ชื่อ</th>
            <th>ความเชี่ยวชาญ</th>
          </tr>
        </thead>
        <tbody>
          {dentists.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.id}</td>
              <td>{doc.name}</td>
              <td>{doc.specialty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DentalManagement;