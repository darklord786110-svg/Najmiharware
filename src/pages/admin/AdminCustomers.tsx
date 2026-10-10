import { useStore } from '../../StoreContext';

export default function AdminCustomers() {
  const { state } = useStore();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span className="material-symbols-outlined" style={{ fontSize: 24, color: 'var(--primary)' }}>people</span>
        <h1 className="text-headline-md" style={{ color: 'var(--primary)' }}>Customers Directory</h1>
      </div>

      <div className="card" style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Type</th>
              <th>Orders</th>
              <th>Total Spent</th>
            </tr>
          </thead>
          <tbody>
            {state.customers.map(c => (
              <tr key={c.id}>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: 600 }}>{c.name}</span>
                    {c.company && <span className="text-label-sm" style={{ color: 'var(--on-surface-variant)' }}>{c.company}</span>}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="text-body-sm">{c.phone}</span>
                    <span className="text-label-sm" style={{ color: 'var(--outline)' }}>{c.email}</span>
                  </div>
                </td>
                <td><span className="text-label-sm" style={{ textTransform: 'uppercase' }}>{c.type}</span></td>
                <td>{c.totalOrders}</td>
                <td style={{ fontWeight: 700, color: 'var(--primary)' }}>{c.totalSpent.toFixed(3)} KWD</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
