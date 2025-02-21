import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import InventoryList from './InventoryList';
import InventoryFilter from './InventoryFilter';

function AdminDashboard() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
      const response = await fetch(`${API_BASE_URL}/inventory`);
      if (!response.ok) throw new Error('Failed to fetch inventory');
      const data = await response.json();
      setInventory(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/inventory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newItem)
      });

      if (!response.ok) throw new Error('Failed to create item');
      
      setNewItem({
        name: '',
        quantity: '',
        category: 'food',
        urgency: 'low',
        description: ''
      });
      fetchInventory();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/inventory/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete item');
      fetchInventory();
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <form onSubmit={handleSubmit} className="add-item-form">
        <h2>Add New Item</h2>
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
          onChange={(e) => setNewItem({...newItem, quantity: parseInt(e.target.value)})}
          required
        />
        <select
          value={newItem.category}
          onChange={(e) => setNewItem({...newItem, category: e.target.value})}
        >
          <option value="food">Food</option>
          <option value="hygiene">Hygiene</option>
          <option value="medical">Medical</option>
          <option value="clothing">Clothing</option>
          <option value="other">Other</option>
        </select>
        <select
          value={newItem.urgency}
          onChange={(e) => setNewItem({...newItem, urgency: e.target.value})}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <textarea
          placeholder="Description"
          value={newItem.description}
          onChange={(e) => setNewItem({...newItem, description: e.target.value})}
        />
        <button type="submit">Add Item</button>
      </form>

      <div className="inventory-section">
        <h2>Current Inventory</h2>
        <InventoryList 
          items={inventory} 
          isAdmin={true} 
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default AdminDashboard; 