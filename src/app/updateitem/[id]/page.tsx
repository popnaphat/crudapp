'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

const UpdateItemPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [updatedItem, setUpdatedItem] = useState({ title: '', amount: 0, quantity: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:2024/items/${id}`);
        setUpdatedItem({
          title: response.data.title,
          amount: response.data.amount,
          quantity: response.data.quantity,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching item', error);
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const updateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:2024/items/${id}`, updatedItem);
      alert('Item updated successfully');
      router.push('/items'); // กลับไปหน้าหลักหลังจากอัปเดตเสร็จ
    } catch (error) {
      console.error('Error updating item', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Update Item</h1>
      <form onSubmit={updateItem}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={updatedItem.title}
            onChange={(e) => setUpdatedItem({ ...updatedItem, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Amount</label>
          <input
            type="number"
            value={updatedItem.amount}
            onChange={(e) => setUpdatedItem({ ...updatedItem, amount: +e.target.value })}
            required
          />
        </div>
        <div>
          <label>Quantity</label>
          <input
            type="number"
            value={updatedItem.quantity}
            onChange={(e) => setUpdatedItem({ ...updatedItem, quantity: +e.target.value })}
            required
          />
        </div>
        <button type="submit">Update Item</button>
      </form>
    </div>
  );
};

export default UpdateItemPage;
