function InventoryHeader({ isAdmin }) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 font-semibold text-gray-700 border-b">
      <div className="w-[150px] shrink-0">Name</div>

      <div className="flex flex-1 items-center gap-4 min-w-0">
        <div className="w-[100px] shrink-0">Quantity</div>
        <div className="w-[100px] shrink-0">Category</div>
        <div className="flex-1">Description</div>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <div className="w-[100px]">Urgency</div>
        {isAdmin && <div className="w-[80px]">Actions</div>}
      </div>
    </div>
  );
}

export default InventoryHeader; 