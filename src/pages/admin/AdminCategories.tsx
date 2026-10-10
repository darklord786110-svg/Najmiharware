import { useStore } from '../../StoreContext';

export default function AdminCategories() {
  const { state, showToast } = useStore();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 24, color: 'var(--primary)' }}>category</span>
          <h1 className="text-headline-md" style={{ color: 'var(--primary)' }}>Categories</h1>
        </div>
        <button className="btn btn-primary" onClick={() => showToast('Feature disabled in prototype')}>Add Category</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {state.categories.map(cat => (
          <div key={cat.id} className="card" style={{ padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 8, background: 'var(--pale-blue-grey)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                <span className="material-symbols-outlined">{cat.icon}</span>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="text-headline-sm" style={{ fontSize: 16 }}>{cat.name}</span>
                  <span className="text-label-sm" style={{ padding: '2px 6px', borderRadius: 4, background: cat.isActive ? '#e6f4ea' : 'var(--surface-container-high)', color: cat.isActive ? '#1e7e34' : 'var(--on-surface-variant)' }}>
                    {cat.isActive ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </div>
                <span className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>{cat.description}</span>
              </div>
            </div>
            <button className="btn btn-outline btn-sm" onClick={() => showToast('Feature disabled')}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}
