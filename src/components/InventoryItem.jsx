function InventoryItem({ item }) {
  const urgencyColors = {
    high: 'bg-red-100',
    medium: 'bg-yellow-100',
    low: 'bg-green-100'
  };

  return (
    <div className={`inventory-item ${urgencyColors[item.urgency]} p-4 rounded-lg shadow`}>
      <h3 className="text-xl font-semibold">{item.name}</h3>
      <div className="item-details">
        <p className="text-gray-600">Quantity: {item.quantity}</p>
        <p className="text-gray-600">Category: {item.category}</p>
        <p className={`urgency-badge ${item.urgency}`}>
          Urgency: {item.urgency}
        </p>
        {item.description && (
          <p className="text-gray-700 mt-2">{item.description}</p>
        )}
      </div>
    </div>
  );
}

export default InventoryItem; 