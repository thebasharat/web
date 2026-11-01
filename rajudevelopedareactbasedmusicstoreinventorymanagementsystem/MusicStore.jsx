import React, { useState } from 'react';

function MusicStore() {
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Acoustic Guitar', quantity: 10, price: 150 },
    { id: 2, name: 'Electric Keyboard', quantity: 5, price: 300 },
    { id: 3, name: 'Drum Set', quantity: 3, price: 500 }
  ]);

  const [newItem, setNewItem] = useState({
    name: '',
    quantity: '',
    price: ''
  });

  const handleNewItemChange = (event) => {
    const { name, value } = event.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddItem = () => {
    const { name, quantity, price } = newItem;

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
      price: parseFloat(price)
    };

    setInventory((prev) => [...prev, newEntry]);
    setNewItem({ name: '', quantity: '', price: '' });
  };

  return (
    <div className="container my-4">
      <div className="bg-dark text-white text-center p-3 rounded mb-4">
        <h1 className="fw-bold m-0">Music Store Inventory</h1>
      </div>

      <div className="card h-100 shadow-sm mb-4">
        <table className="table table-bordered table-hover shadow-sm mb-0">
          <thead className="table-warning">
            <tr>
              <th>ID</th>
              <th>Instrument / Album</th>
              <th>Quantity</th>
              <th>Price ($)</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td>
                  <span className="badge text-dark">{item.id}</span>
                </td>
                <td className="fw-bold">{item.name}</td>
                <td>{item.quantity}</td>
                <td className="text-success">${item.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="fw-bold text-info text-center mb-3">Add New Instrument</h2>

      <div className="row g-2 align-items-center">
        <div className="col-md-3">
          <input
            type="text"
            name="name"
            className="form-control border-info"
            placeholder="Instrument / Album Name"
            value={newItem.name}
            onChange={handleNewItemChange}
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            name="quantity"
            className="form-control border-info"
            placeholder="Quantity"
            min="0"
            value={newItem.quantity}
            onChange={handleNewItemChange}
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            name="price"
            className="form-control border-info"
            placeholder="Price ($)"
            step="0.01"
            min="0"
            value={newItem.price}
            onChange={handleNewItemChange}
          />
        </div>
        <div className="col-md-3">
          <button
            type="button"
            className="btn btn-warning w-100 fw-bold"
            onClick={handleAddItem}
          >
            Add Item
          </button>
        </div>
      </div>

      <p className="text-muted text-center mt-3">
        Prices shown in USD, formatted to two decimal places.
      </p>
    </div>
  );
}

export default MusicStore;