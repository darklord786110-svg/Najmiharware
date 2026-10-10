import { useStore } from '../../StoreContext';

export default function AccountPage() {
  const { state } = useStore();
  const { retailOrders, rfqSubmissions } = state;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <section style={{ padding: 'var(--space-md) var(--margin-mobile)', background: 'var(--primary-container)', color: 'var(--pure-white)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--charcoal-slate)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 24 }}>person</span>
          </div>
          <div>
            <h1 className="text-headline-sm" style={{ fontWeight: 700 }}>Demo User</h1>
            <p className="text-body-sm" style={{ color: 'var(--on-primary-container)' }}>demo@example.com</p>
          </div>
        </div>
      </section>

      <section style={{ padding: '24px var(--margin-mobile)' }}>
        <h2 className="text-headline-sm" style={{ color: 'var(--primary)', marginBottom: 16 }}>Recent Retail Orders</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {retailOrders.length === 0 ? (
            <p className="text-body-sm" style={{ color: 'var(--outline)' }}>No orders yet.</p>
          ) : (
            retailOrders.map(order => (
              <div key={order.id} className="card" style={{ padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span className="text-label-md" style={{ fontWeight: 700 }}>{order.id}</span>
                  <span className="text-label-sm" style={{ 
                    padding: '2px 8px', borderRadius: 4, 
                    background: order.status === 'delivered' ? '#e6f4ea' : 'var(--surface-container-high)',
                    color: order.status === 'delivered' ? '#1e7e34' : 'var(--on-surface-variant)',
                    textTransform: 'uppercase'
                  }}>
                    {order.status}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>{new Date(order.createdAt).toLocaleDateString()}</span>
                  <span className="text-label-md" style={{ color: 'var(--primary)', fontWeight: 700 }}>{order.total.toFixed(3)} KWD</span>
                </div>
              </div>
            ))
          )}
        </div>

        <h2 className="text-headline-sm" style={{ color: 'var(--primary)', marginBottom: 16, marginTop: 32 }}>Wholesale Quotes</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {rfqSubmissions.length === 0 ? (
            <p className="text-body-sm" style={{ color: 'var(--outline)' }}>No quote requests yet.</p>
          ) : (
            rfqSubmissions.map(rfq => (
              <div key={rfq.id} className="card" style={{ padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span className="text-label-md" style={{ fontWeight: 700 }}>{rfq.id}</span>
                  <span className="text-label-sm" style={{ 
                    padding: '2px 8px', borderRadius: 4, 
                    background: rfq.status === 'quoted' ? 'var(--secondary-container)' : 'var(--surface-container-high)',
                    color: rfq.status === 'quoted' ? 'var(--on-secondary-container)' : 'var(--on-surface-variant)',
                    textTransform: 'uppercase'
                  }}>
                    {rfq.status}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>{new Date(rfq.createdAt).toLocaleDateString()}</span>
                  {rfq.quotedTotal ? (
                    <span className="text-label-md" style={{ color: 'var(--on-tertiary-container)', fontWeight: 700 }}>{rfq.quotedTotal.toFixed(3)} KWD</span>
                  ) : (
                    <span className="text-label-sm" style={{ color: 'var(--outline)' }}>Pending Quote</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
