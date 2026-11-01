import React, { useState } from 'react';

function FoodOrder() {
  const [orders, setOrders] = useState([
    { id: 1, item: 'Burger', quantity: 2, price: 150 },
    { id: 2, item: 'Pizza', quantity: 1, price: 350 },
    { id: 3, item: 'Pasta', quantity: 3, price: 200 }
  ]);

  const [newOrder, setNewOrder] = useState({
    item: '',
    quantity: '',
    price: ''
  });

  const handleNewOrderChange = (event) => {
    const { name, value } = event.target;
    setNewOrder((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddOrder = () => {
    const { item, quantity, price } = newOrder;

    if (!item || !quantity || !price) {
      alert('Please fill in all fields');
      return;
    }

    const newId =
      orders.length > 0
        ? Math.max(...orders.map((order) => order.id)) + 1
        : 1;

    const newEntry = {
      id: newId,
      item,
      quantity,
      price
    };

    setOrders((prev) => [...prev, newEntry]);
    setNewOrder({ item: '', quantity: '', price: '' });
  };

  return (
    <div className="container my-4">
      <h1 className="text-primary">Food Order Management</h1>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.item}</td>
              <td>{order.quantity}</td>
              <td>{order.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-success">Add New Food Order</h2>

      <div className="mb-2">
        <input
          type="text"
          name="item"
          className="form-control mb-2"
          placeholder="Food Item"
          value={newOrder.item}
          onChange={handleNewOrderChange}
        />
        <input
          type="number"
          name="quantity"
          className="form-control mb-2"
          placeholder="Quantity"
          min="1"
          value={newOrder.quantity}
          onChange={handleNewOrderChange}
        />
        <input
          type="number"
          name="price"
          className="form-control mb-2"
          placeholder="Price ($)"
          step="0.01"
          min="0"
          value={newOrder.price}
          onChange={handleNewOrderChange}
        />
      </div>

      <button
        type="button"
        className="btn btn-success w-100"
        onClick={handleAddOrder}
      >
        Add Order
      </button>
    </div>
  );
}

export default FoodOrder;