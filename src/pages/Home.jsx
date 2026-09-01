import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="p-4 bg-light rounded-3 mb-4">
      <h1>คลินิกทันตกรรม</h1>
      <p>บริการตรวจรักษาฟัน จองคิวนัดหมายออนไลน์</p>
      <Link to="/booking" className="btn btn-primary me-2">จองคิว</Link>
      <Link to="/portal" className="btn btn-secondary">ตรวจสอบคิว</Link>
    </div>
  );
};

export default Home;