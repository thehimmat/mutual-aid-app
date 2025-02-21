function InventoryItem({ item, isAdmin, onDelete }) {
  const urgencyColors = {
    high: 'bg-red-100',
    medium: 'bg-yellow-100',
    low: 'bg-green-100'
  };

  return (
    <div className={`${urgencyColors[item.urgency]} p-4 flex items-center justify-between gap-4 overflow-hidden border-b`}>
      <div className="w-[150px] truncate shrink-0 font-medium">{item.name}</div>

      <div className="flex flex-1 items-center gap-4 min-w-0">
        <div className="w-[100px] shrink-0">{item.quantity}</div>
        <div className="w-[100px] shrink-0">{item.category}</div>
        <div className="flex-1 truncate min-w-0">
          {item.description || '-'}
        </div>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <div className="w-[100px] whitespace-nowrap">{item.urgency}</div>
        {isAdmin && (
          <div className="w-[80px]">
            <button 
              onClick={() => onDelete(item.id)} 
              className="delete-btn"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default InventoryItem; 