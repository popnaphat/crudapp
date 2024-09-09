'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const UpdateItem = ({ itemId }: { itemId: number }) => {
  const [updatedItem, setUpdatedItem] = useState({ title: '', amount: 0, quantity: 0 });
  const router = useRouter(); // ใช้ useRouter เพื่อทำการนำทาง
  const [loading, setLoading] = useState(true); // สถานะ loading

  // ดึงข้อมูล Item เมื่อ component ถูก mount
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:2024/items/${itemId}`);
        setUpdatedItem({
          title: response.data.title,
          amount: response.data.amount,
          quantity: response.data.quantity,
        });
        setLoading(false); // เปลี่ยนสถานะเมื่อโหลดข้อมูลเสร็จ
      } catch (error) {
        console.error('Error fetching item', error);
        setLoading(false); // เปลี่ยนสถานะเมื่อมี error
      }
    };

    fetchItem();
  }, [itemId]);

  const updateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:2024/items/${itemId}`, updatedItem);
      alert('Item updated successfully');
      router.push('/'); // นำทางกลับไปยังหน้าหลักเมื่อทำการอัปเดตสำเร็จ
    } catch (error) {
      console.error('Error updating item', error);
    }
  };

  // แสดงข้อความ loading ขณะดึงข้อมูล
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Update Item</h2>
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

export default UpdateItem;
