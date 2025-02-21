import React, { useState } from 'react';

function InventoryItem({ item, isAdmin, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState({ ...item });

  const urgencyColors = {
    high: 'bg-red-100',
    medium: 'bg-yellow-100',
    low: 'bg-green-100'
  };

  const handleEdit = async () => {
    try {
      await onUpdate(editedItem);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Failed to update item');
    }
  };

  if (isEditing && isAdmin) {
    return (
      <tr className="border-b">
        <td className="p-4">
          <input
            type="text"
            value={editedItem.name}
            onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}
            className="w-full p-1 border rounded"
          />
        </td>
        <td className="p-4">
          <input
            type="number"
            value={editedItem.quantity}
            onChange={(e) => setEditedItem({ ...editedItem, quantity: parseInt(e.target.value) })}
            className="w-full p-1 border rounded"
          />
        </td>
        <td className="p-4">
          <input
            type="text"
            value={editedItem.category}
            onChange={(e) => setEditedItem({ ...editedItem, category: e.target.value })}
            className="w-full p-1 border rounded"
          />
        </td>
        <td className="p-4">
          <input
            type="text"
            value={editedItem.description || ''}
            onChange={(e) => setEditedItem({ ...editedItem, description: e.target.value })}
            className="w-full p-1 border rounded"
          />
        </td>
        <td className="p-4">
          <select
            value={editedItem.urgency}
            onChange={(e) => setEditedItem({ ...editedItem, urgency: e.target.value })}
            className="w-full p-1 border rounded"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </td>
        <td className="p-4">
          <div className="flex gap-2">
            <button onClick={handleEdit} className="bg-green-500 text-white px-2 py-1 rounded">Save</button>
            <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-2 py-1 rounded">Cancel</button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr className={`border-b ${urgencyColors[item.urgency]}`}>
      <td className="p-4 truncate">{item.name}</td>
      <td className="p-4">{item.quantity}</td>
      <td className="p-4">{item.category}</td>
      <td className="p-4 truncate">{item.description || '-'}</td>
      <td className="p-4">{item.urgency}</td>
      {isAdmin && (
        <td className="p-4">
          <div className="flex gap-2">
            <button 
              onClick={() => setIsEditing(true)} 
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button 
              onClick={() => onDelete(item.id)} 
              className="delete-btn"
            >
              Delete
            </button>
          </div>
        </td>
      )}
    </tr>
  );
}

export default InventoryItem; 