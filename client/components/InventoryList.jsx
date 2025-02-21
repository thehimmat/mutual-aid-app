import InventoryItem from './InventoryItem';

function InventoryList({ items }) {
  return (
    <div className="inventory-list">
      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item.id} className={`urgency-${item.urgency}`}>
              <h3>{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Category: {item.category}</p>
              <p>Urgency: {item.urgency}</p>
              {item.description && <p>{item.description}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default InventoryList; 