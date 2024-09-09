'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface Item {
  id: number;
  title: string;
  amount: number;
  quantity: number;
  status: string;
  owner_id: number;
}

const Items = ({ onAdd, onUpdate }: { onAdd: () => void; onUpdate: (id: number) => void }) => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:2024/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items', error);
    }
  };

  const deleteItem = async (id: number) => {
    try {
      await axios.delete(`http://localhost:2024/items/${id}`);
      alert(`Item ${id} deleted successfully`);
      setItems(items.filter((item) => item.id !== id)); // ลบ item จาก state
    } catch (error) {
      console.error('Error deleting item', error);
    }
  };

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      await axios.patch(`http://localhost:2024/items/${id}`, { status: newStatus });
      alert(`Item ${id} ${newStatus.toLowerCase()} successfully`);
      setItems(items.map((item) => (item.id === id ? { ...item, status: newStatus } : item))); // อัปเดตสถานะใน state
    } catch (error) {
      console.error(`Error updating item status to ${newStatus}`, error);
    }
  };

  return (
    <div>
      <h1>Items</h1>
      <button onClick={onAdd}>Add New Item</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Amount</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.amount}</td>
              <td>{item.quantity}</td>
              <td>{item.status}</td>
              <td>
                <button onClick={() => onUpdate(item.id)}>Update</button>
                
                <select
                  value={item.status} // แสดงสถานะปัจจุบัน
                  onChange={(e) => updateStatus(item.id, e.target.value)}
                >
                  <option value="PENDING">Pending</option> {/* เพิ่มสถานะ Pending */}
                  <option value="APPROVED">Approve</option>
                  <option value="REJECTED">Reject</option>
                </select>
                
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Items;
