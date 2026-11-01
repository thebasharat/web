import React, { useState } from 'react';

function MedicalShop() {
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Paracetamol', quantity: 100, price: 2.5 },
    { id: 2, name: 'Aspirin', quantity: 60, price: 3.0 },
    { id: 3, name: 'Band-Aid', quantity: 200, price: 0.5 }
  ]);

  const [newMedicine, setNewMedicine] = useState({
    name: '',
    quantity: '',
    price: ''
  });

  const handleNewMedicineChange = (event) => {
    const { name, value } = event.target;
    setNewMedicine((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddMedicine = () => {
    const { name, quantity, price } = newMedicine;

    if (!name || !quantity || !price) {
      alert('Please fill in all fields');
      return;
    }

    const newId =
      inventory.length > 0
        ? Math.max(...inventory.map((item) => item.id)) + 1
        : 1;

    const newEntry = {
      id: newId,
      name,
      quantity,
      price
    };

    setInventory((prev) => [...prev, newEntry]);
    setNewMedicine({ name: '', quantity: '', price: '' });
  };

  return (
    <div className="container my-4">
      <h1 className="text-primary">Medical Shop Inventory</h1>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-success">Add New Medicine</h2>

      <div className="mb-2">
        <input
          type="text"
          name="name"
          className="form-control mb-2"
          placeholder="Name"
          value={newMedicine.name}
          onChange={handleNewMedicineChange}
        />
        <input
          type="number"
          name="quantity"
          className="form-control mb-2"
          placeholder="Quantity"
          min="0"
          value={newMedicine.quantity}
          onChange={handleNewMedicineChange}
        />
        <input
          type="number"
          name="price"
          className="form-control mb-2"
          placeholder="Price"
          step="0.01"
          min="0"
          value={newMedicine.price}
          onChange={handleNewMedicineChange}
        />
      </div>

      <button
        type="button"
        className="btn btn-success w-100"
        onClick={handleAddMedicine}
      >
        Add Medicine
      </button>
    </div>
  );
}

export default MedicalShop;