import InventoryHeader from './InventoryHeader';
import InventoryItem from './InventoryItem';
import { useState } from 'react';
import { API_BASE_URL } from '../config';

function InventoryList({ items: initialItems, isAdmin, onDelete }) {
  const [items, setItems] = useState(initialItems);

  const handleUpdate = async (updatedItem) => {
    try {
      const response = await fetch(`${API_BASE_URL}/inventory/${updatedItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });

      if (!response.ok) {
        throw new Error('Failed to update item');
      }

      // Update local state
      setItems(items.map(item => 
        item.id === updatedItem.id ? updatedItem : item
      ));
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Failed to update item');
    }
  };

  return (
    <div className="w-full max-w-[1200px] bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full table-fixed">
        <thead>
          <tr className="border-b">
            <th className="p-4 text-left w-[200px]">Name</th>
            <th className="p-4 text-left w-[100px]">Quantity</th>
            <th className="p-4 text-left w-[150px]">Category</th>
            <th className="p-4 text-left">Description</th>
            <th className="p-4 text-left w-[100px]">Urgency</th>
            {isAdmin && <th className="p-4 text-left w-[180px]">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <InventoryItem
              key={item.id}
              item={item}
              isAdmin={isAdmin}
              onDelete={onDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

const urgencyColors = {
  high: 'bg-red-100',
  medium: 'bg-yellow-100',
  low: 'bg-green-100'
};

export default InventoryList; 