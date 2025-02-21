import { useState, useEffect } from 'react';
import InventoryList from './InventoryList';
import InventoryFilter from './InventoryFilter';

function PublicInventory() {
  const [inventory, setInventory] = useState([]);
  const [filters, setFilters] = useState({
    category: 'all',
    urgency: 'all'
  });

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await fetch('/api/inventory');
      const data = await response.json();
      setInventory(data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  return (
    <div className="public-inventory">
      <h1>Available Supplies</h1>
      <InventoryFilter filters={filters} setFilters={setFilters} />
      <InventoryList inventory={inventory} filters={filters} />
    </div>
  );
}

export default PublicInventory; 