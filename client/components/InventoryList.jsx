import InventoryHeader from './InventoryHeader';
import InventoryItem from './InventoryItem';

function InventoryList({ items, isAdmin, onDelete }) {
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
            {isAdmin && <th className="p-4 text-left w-[100px]">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id} className={`border-b ${urgencyColors[item.urgency]}`}>
              <td className="p-4 truncate">{item.name}</td>
              <td className="p-4">{item.quantity}</td>
              <td className="p-4">{item.category}</td>
              <td className="p-4 truncate">{item.description || '-'}</td>
              <td className="p-4">{item.urgency}</td>
              {isAdmin && (
                <td className="p-4">
                  <button 
                    onClick={() => onDelete(item.id)} 
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
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