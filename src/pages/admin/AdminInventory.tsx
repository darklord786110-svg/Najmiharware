import { useStore } from '../../StoreContext';

export default function AdminInventory() {
  const { state, dispatch, showToast } = useStore();

  const handleUpdateStock = (id: string, currentStock: number) => {
    const newStock = prompt('Update stock level:', currentStock.toString());
    if (newStock && !isNaN(parseInt(newStock, 10))) {
      const product = state.products.find(p => p.id === id);
      if (product) {
        dispatch({ type: 'UPDATE_PRODUCT', payload: { ...product, stock: parseInt(newStock, 10) } });
        showToast('Stock updated');
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span className="material-symbols-outlined" style={{ fontSize: 24, color: 'var(--primary)' }}>warehouse</span>
        <h1 className="text-headline-md" style={{ color: 'var(--primary)' }}>Inventory Levels</h1>
      </div>

      <div className="card" style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>SKU / Product</th>
              <th>Category</th>
              <th>Status</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {state.products.map(p => (
              <tr key={p.id}>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="text-label-sm" style={{ fontFamily: 'monospace', color: 'var(--outline)' }}>{p.variants[0].sku}</span>
                    <span style={{ fontWeight: 600 }}>{p.name}</span>
                  </div>
                </td>
                <td><span className="text-label-sm">{p.categoryTag}</span></td>
                <td>
                  <span className="text-label-sm" style={{ padding: '2px 6px', borderRadius: 4, background: p.stock <= p.lowStockThreshold ? 'var(--error-container)' : 'var(--pale-blue-grey)', color: p.stock <= p.lowStockThreshold ? 'var(--error)' : 'var(--primary)' }}>
                    {p.stock <= p.lowStockThreshold ? 'LOW STOCK' : 'IN STOCK'}
                  </span>
                </td>
                <td style={{ fontWeight: 700 }}>{p.stock}</td>
                <td>
                  <button className="btn btn-outline btn-sm" onClick={() => handleUpdateStock(p.id, p.stock)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
