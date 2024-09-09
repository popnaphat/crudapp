'use client';  // ทำให้ไฟล์นี้เป็น Client Component

import Items from '../../components/Items'; // นำเข้า Items component

const ItemsPage = () => {
  const handleAdd = () => {
    // นำทางไปยังหน้า /additem
    window.location.href = '/additem';
  };

  const handleUpdate = (id: number) => {
    // นำทางไปยังหน้า /updateitem/{id}
    window.location.href = `/updateitem/${id}`;
  };

  return (
    <div>
      <Items onAdd={handleAdd} onUpdate={handleUpdate} /> {/* เรียกใช้ component Items */}
    </div>
  );
};

export default ItemsPage;
