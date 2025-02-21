import InventoryItem from './InventoryItem';

function InventoryList({ inventory, filters }) {
  // Filter inventory based on selected filters
  const filteredInventory = inventory.filter(item => {
    const categoryMatch = filters.category === 'all' || item.category === filters.category;
    const urgencyMatch = filters.urgency === 'all' || item.urgency === filters.urgency;
    return categoryMatch && urgencyMatch;
  });

  return (
    <div className="inventory-list">
      {filteredInventory.length === 0 ? (
        <p>No items found matching the selected filters.</p>
      ) : (
        <div className="inventory-grid">
          {filteredInventory.map(item => (
            <InventoryItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default InventoryList; 