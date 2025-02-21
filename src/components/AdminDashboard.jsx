import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: '',
    category: 'food',
    urgency: 'low',
    description: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchInventory();
  }, [navigate]);

  const fetchInventory = async () => {
    try {
      const response = await fetch('/api/inventory');
      const data = await response.json();
      setInventory(data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newItem)
      });

      if (response.ok) {
        setNewItem({
          name: '',
          quantity: '',
          category: 'food',
          urgency: 'low',
          description: ''
        });
        fetchInventory();
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/inventory/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        fetchInventory();
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      
      <form onSubmit={handleSubmit} className="add-item-form">
        <h3>Add New Item</h3>
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({...newItem, name: e.target.value})}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
          required
        />
        <select
          value={newItem.category}
          onChange={(e) => setNewItem({...newItem, category: e.target.value})}
        >
          <option value="food">Food</option>
          <option value="medical">Medical</option>
          <option value="clothing">Clothing</option>
        </select>
        <select
          value={newItem.urgency}
          onChange={(e) => setNewItem({...newItem, urgency: e.target.value})}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <textarea
          placeholder="Description"
          value={newItem.description}
          onChange={(e) => setNewItem({...newItem, description: e.target.value})}
        />
        <button type="submit">Add Item</button>
      </form>

      <div className="inventory-list admin">
        <h3>Current Inventory</h3>
        {inventory.map(item => (
          <div key={item.id} className="inventory-item admin">
            <h4>{item.name}</h4>
            <p>Quantity: {item.quantity}</p>
            <p>Category: {item.category}</p>
            <p>Urgency: {item.urgency}</p>
            <button onClick={() => handleDelete(item.id)} className="delete-btn">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard; 