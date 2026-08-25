import React, { useState } from 'react';

const DentalManagement = () => {
  // --- States for Supplies ---
  const [supplies, setSupplies] = useState([
    { id: 1, name: 'ยาชาเฉพาะที่ (Lidocaine)', price: 450, stock: 25 },
    { id: 2, name: 'ไหมขัดฟันทางการแพทย์ (Dental Floss)', price: 85, stock: 5 },
    { id: 3, name: 'ชุดกระจกส่องปากและสำลี (Dental Kit)', price: 120, stock: 18 },
  ]);
  const [supplySearch, setSupplySearch] = useState('');
  const [newSupplyName, setNewSupplyName] = useState('');
  const [newSupplyPrice, setNewSupplyPrice] = useState('');
  const [newSupplyStock, setNewSupplyStock] = useState('');

  // --- States for Categories ---
  const [categories, setCategories] = useState([
    { id: 1, name: 'ศัลยศาสตร์ช่องปาก', description: 'ถอนฟัน ผ่าฟันคุด และงานศัลยกรรม' },
    { id: 2, name: 'ทันตกรรมหัตถการ', description: 'อุดฟัน ขูดหินปูน และทำความสะอาด' },
    { id: 3, name: 'ทันตกรรมจัดฟัน', description: 'เครื่องมือจัดฟันและอุปกรณ์ปรับโครงสร้าง' },
  ]);
  const [categorySearch, setCategorySearch] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDesc, setNewCategoryDesc] = useState('');

  // --- Supplies Handlers ---
  const handleAddSupply = (e) => {
    e.preventDefault();
    if (!newSupplyName || !newSupplyPrice || !newSupplyStock) return;
    const newItem = {
      id: supplies.length > 0 ? Math.max(...supplies.map((s) => s.id)) + 1 : 1,
      name: newSupplyName,
      price: Number(newSupplyPrice),
      stock: Number(newSupplyStock),
    };
    setSupplies([...supplies, newItem]);
    setNewSupplyName('');
    setNewSupplyPrice('');
    setNewSupplyStock('');
  };

  const handleRemoveSupply = (id) => {
    setSupplies(supplies.filter((item) => item.id !== id));
  };

  // --- Categories Handlers ---
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategoryName || !newCategoryDesc) return;
    const newItem = {
      id: categories.length > 0 ? Math.max(...categories.map((c) => c.id)) + 1 : 1,
      name: newCategoryName,
      description: newCategoryDesc,
    };
    setCategories([...categories, newItem]);
    setNewCategoryName('');
    setNewCategoryDesc('');
  };

  const handleRemoveCategory = (id) => {
    setCategories(categories.filter((item) => item.id !== id));
  };

  // --- Filtered Data ---
  const filteredSupplies = supplies.filter((s) =>
    s.name.toLowerCase().includes(supplySearch.toLowerCase())
  );
  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(categorySearch.toLowerCase())
  );

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f0f4f8' }}>
      {/* Top Navbar */}
      <nav
        className="navbar px-4 text-white shadow-sm"
        style={{ backgroundColor: '#0284c7' }}
      >
        <span className="navbar-brand mb-0 h1 text-white d-flex align-items-center gap-2 fw-semibold fs-5">
          🦷 Dental Care Management
        </span>
      </nav>

      <div className="container py-4" style={{ maxWidth: '1000px' }}>
        {/* ================= SECTION 1: DENTAL SUPPLIES ================= */}
        <div className="card border-0 shadow-sm rounded-3 p-4 mb-4 bg-white">
          {/* Header & Search */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold m-0" style={{ color: '#0284c7' }}>
              💊 Dental Supplies (อุปกรณ์ทันตกรรม)
            </h5>
            <div style={{ maxWidth: '200px' }}>
              <input
                type="text"
                className="form-control form-control-sm bg-light border-0"
                placeholder="🔍 ค้นหาอุปกรณ์..."
                value={supplySearch}
                onChange={(e) => setSupplySearch(e.target.value)}
              />
            </div>
          </div>

          {/* Add Supply Form */}
          <div
            className="p-3 rounded-3 mb-4"
            style={{ backgroundColor: '#f0f9ff', border: '1px solid #e0f2fe' }}
          >
            <div className="small fw-semibold text-secondary mb-2">Add New Supply</div>
            <form onSubmit={handleAddSupply} className="row g-2">
              <div className="col-md-5">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Item Name (เช่น ยาชา, ไหมขัดฟัน)"
                  required
                  value={newSupplyName}
                  onChange={(e) => setNewSupplyName(e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control form-control-sm"
                  placeholder="Price (฿)"
                  required
                  value={newSupplyPrice}
                  onChange={(e) => setNewSupplyPrice(e.target.value)}
                />
              </div>
              <div className="col-md-2">
                <input
                  type="number"
                  className="form-control form-control-sm"
                  placeholder="Stock Quantity"
                  required
                  value={newSupplyStock}
                  onChange={(e) => setNewSupplyStock(e.target.value)}
                />
              </div>
              <div className="col-md-2">
                <button
                  type="submit"
                  className="btn btn-sm w-100 text-white fw-medium"
                  style={{ backgroundColor: '#06b6d4', borderColor: '#06b6d4' }}
                >
                  + Add Item
                </button>
              </div>
            </form>
          </div>

          {/* Supplies Table */}
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr className="text-secondary small border-bottom">
                  <th style={{ width: '8%' }}>ID</th>
                  <th style={{ width: '45%' }}>Item Name</th>
                  <th style={{ width: '15%' }}>Price</th>
                  <th style={{ width: '17%' }}>In Stock</th>
                  <th style={{ width: '15%' }} className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredSupplies.map((item) => (
                  <tr key={item.id} className="border-bottom">
                    <td className="text-muted fw-bold small">#{item.id}</td>
                    <td className="fw-semibold text-dark">{item.name}</td>
                    <td className="text-secondary fw-semibold">฿{item.price}</td>
                    <td>
                      <span
                        className="badge rounded-pill fw-normal px-2 py-1"
                        style={{
                          backgroundColor: item.stock <= 5 ? '#fef08a' : '#dcfce7',
                          color: item.stock <= 5 ? '#854d0e' : '#15803d',
                          fontSize: '11px',
                        }}
                      >
                        {item.stock} units
                      </span>
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-outline-danger btn-sm rounded-pill px-3 py-0"
                        style={{ fontSize: '12px' }}
                        onClick={() => handleRemoveSupply(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= SECTION 2: TREATMENT CATEGORIES ================= */}
        <div className="card border-0 shadow-sm rounded-3 p-4 bg-white">
          {/* Header & Search */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold m-0" style={{ color: '#0284c7' }}>
              🏷️ Treatment Categories (หมวดหมู่การรักษา)
            </h5>
            <div style={{ maxWidth: '200px' }}>
              <input
                type="text"
                className="form-control form-control-sm bg-light border-0"
                placeholder="🔍 ค้นหาหมวดหมู่..."
                value={categorySearch}
                onChange={(e) => setCategorySearch(e.target.value)}
              />
            </div>
          </div>

          {/* Add Category Form */}
          <div
            className="p-3 rounded-3 mb-4"
            style={{ backgroundColor: '#f0fdf4', border: '1px solid #dcfce7' }}
          >
            <div className="small fw-semibold text-secondary mb-2">Add Category</div>
            <form onSubmit={handleAddCategory} className="row g-2">
              <div className="col-md-5">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Category Name (เช่น จัดฟัน, ทำฟันเด็ก)"
                  required
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
              </div>
              <div className="col-md-5">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Description"
                  required
                  value={newCategoryDesc}
                  onChange={(e) => setNewCategoryDesc(e.target.value)}
                />
              </div>
              <div className="col-md-2">
                <button
                  type="submit"
                  className="btn btn-sm w-100 text-white fw-medium"
                  style={{ backgroundColor: '#059669', borderColor: '#059669' }}
                >
                  + Add Category
                </button>
              </div>
            </form>
          </div>

          {/* Categories Table */}
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr className="text-secondary small border-bottom">
                  <th style={{ width: '8%' }}>ID</th>
                  <th style={{ width: '32%' }}>Category</th>
                  <th style={{ width: '45%' }}>Description</th>
                  <th style={{ width: '15%' }} className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((item) => (
                  <tr key={item.id} className="border-bottom">
                    <td className="text-muted fw-bold small">#{item.id}</td>
                    <td className="fw-semibold text-primary">{item.name}</td>
                    <td className="text-secondary small">{item.description}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-outline-danger btn-sm rounded-pill px-3 py-0"
                        style={{ fontSize: '12px' }}
                        onClick={() => handleRemoveCategory(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DentalManagement;