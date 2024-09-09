'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

const AddItemPage = () => {
  const router = useRouter();
  const [newItem, setNewItem] = useState({ title: '', amount: 0, quantity: 0 });

  const addItem = async (e: React.FormEvent) => {
    console.log(newItem)
    e.preventDefault();
    try {
      await axios.post('http://localhost:2024/items', newItem);
      alert('Item added successfully');
      router.push('/items'); // กลับไปหน้าหลักเมื่อเพิ่มรายการเสร็จ
    } catch (error) {
      console.error('Error adding item', error);
    }
  };

  return (
    <div>
      <h1>Add New Item</h1>
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

export default AddItemPage;
