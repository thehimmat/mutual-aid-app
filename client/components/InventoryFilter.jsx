function InventoryFilter({ filters, setFilters }) {
  return (
    <div className="inventory-filters">
      <select
        value={filters.category}
        onChange={(e) => setFilters({...filters, category: e.target.value})}
      >
        <option value="all">All Categories</option>
        <option value="food">Food</option>
        <option value="hygiene">Hygiene</option>
        <option value="medical">Medical</option>
        <option value="clothing">Clothing</option>
        <option value="other">Other</option>
        {/* Add more categories as needed */}
      </select>

      <select
        value={filters.urgency}
        onChange={(e) => setFilters({...filters, urgency: e.target.value})}
      >
        <option value="all">All Urgency Levels</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </div>
  );
}

export default InventoryFilter; 