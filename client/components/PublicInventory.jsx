import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import InventoryList from './InventoryList';
import InventoryFilter from './InventoryFilter';

function PublicInventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: 'all',
    urgency: 'all'
  });

  useEffect(() => {
    fetchInventory();
  }, []);

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

  const filteredInventory = inventory.filter(item => {
    if (filters.category !== 'all' && item.category !== filters.category) return false;
    if (filters.urgency !== 'all' && item.urgency !== filters.urgency) return false;
    return true;
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="public-inventory">
      <h1>Available Supplies</h1>
      <InventoryFilter filters={filters} setFilters={setFilters} />
      <InventoryList items={filteredInventory} />
    </div>
  );
}

export default PublicInventory; 