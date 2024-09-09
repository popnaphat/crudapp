'use client';

import { useState } from 'react';
import axios from 'axios';

const AddItem = () => {
  const [newItem, setNewItem] = useState({ title: '', amount: 0, quantity: 0 });

  const addItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:2024/items', newItem);
      alert('Item added successfully');
      setNewItem({ title: '', amount: 0, quantity: 0 });
    } catch (error) {
      console.error('Error adding item', error);
    }
  };

  return (
    <div>
      <h2>Add New Item</h2>
      <form onSubmit={addItem}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Amount</label>
          <input
            type="number"
            value={newItem.amount}
            onChange={(e) => setNewItem({ ...newItem, amount: +e.target.value })}
            required
          />
        </div>
        <div>
          <label>Quantity</label>
          <input
            type="number"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: +e.target.value })}
            required
          />
        </div>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItem;
