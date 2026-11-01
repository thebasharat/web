import React, { useState } from 'react';

function Bookstore() {
  const [inventory, setInventory] = useState([
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', stock: 12, price: 10.5 },
    { id: 2, title: '1984', author: 'George Orwell', stock: 8, price: 9.0 },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', stock: 15, price: 12.0 }
  ]);

  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    stock: '',
    price: ''
  });

  const handleNewBookChange = (event) => {
    const { name, value } = event.target;
    setNewBook((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddBook = () => {
    const { title, author, stock, price } = newBook;

    if (!title || !author || !stock || !price) {
      alert('Please fill in all fields');
      return;
    }

    const newId =
      inventory.length > 0
        ? Math.max(...inventory.map((book) => book.id)) + 1
        : 1;

    const newEntry = {
      id: newId,
      title,
      author,
      stock,
      price: parseFloat(price)
    };

    setInventory((prev) => [...prev, newEntry]);
    setNewBook({ title: '', author: '', stock: '', price: '' });
  };

  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold text-primary">Bookstore Inventory</h1>
        <p className="text-muted">Manage your book collection with ease</p>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h2 className="fw-bold mb-3">Available Books</h2>

          {inventory.map((book) => (
            <div key={book.id} className="d-flex justify-content-between align-items-center border-bottom py-2">
              <div>
                <span className="badge bg-info me-2">{book.id}</span>
                <span className="fw-bold">{book.title}</span>
                <span className="text-muted"> by {book.author}</span>
              </div>
              <div>
                <span className="me-3">Stock: {book.stock}</span>
                <span className="text-success fw-bold">${book.price.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="fw-bold mb-3">Add a New Book</h2>

          <div className="row g-2 mb-3">
            <div className="col-md-6">
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="Book Title"
                value={newBook.title}
                onChange={handleNewBookChange}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                name="author"
                className="form-control"
                placeholder="Author"
                value={newBook.author}
                onChange={handleNewBookChange}
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                name="stock"
                className="form-control"
                placeholder="Stock"
                min="0"
                value={newBook.stock}
                onChange={handleNewBookChange}
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                name="price"
                className="form-control"
                placeholder="Price ($)"
                step="0.01"
                min="0"
                value={newBook.price}
                onChange={handleNewBookChange}
              />
            </div>
          </div>

          <button
            type="button"
            className="btn btn-success w-100"
            onClick={handleAddBook}
          >
            Add Book
          </button>
        </div>
      </div>
    </div>
  );
}

export default Bookstore;