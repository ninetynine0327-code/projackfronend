import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PatientPortal from './pages/PatientPortal';
import StaffLogin from './pages/StaffLogin';
import StaffDashboard from './pages/StaffDashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* หน้าหลักสำหรับลูกค้า/คนไข้ */}
        <Route path="/" element={<PatientPortal />} />

        {/* หน้าระบบสำหรับพนักงาน */}
        <Route path="/staff/login" element={<StaffLogin />} />
        <Route path="/staff/dashboard" element={<StaffDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;