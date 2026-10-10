import { useStore } from '../../StoreContext';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const { state, dispatch } = useStore();
  
  const pendingRetailOrders = state.retailOrders.filter(o => o.status === 'pending' || o.status === 'processing');
  const pendingRfqs = state.rfqSubmissions.filter(r => r.status === 'pending');
  
  const retailSalesToday = 17.750; // Mocked KPI from Stitch
  const activeRfqTotal = 450.000; // Mocked KPI

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* KPI Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        <div className="kpi-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="text-label-sm" style={{ color: 'var(--on-surface-variant)', textTransform: 'uppercase' }}>Retail Sales</span>
            <div style={{ width: 24, height: 24, borderRadius: 4, background: 'var(--pale-blue-grey)', color: 'var(--primary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>point_of_sale</span>
            </div>
          </div>
          <div style={{ marginTop: 8 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span className="text-price-display" style={{ color: 'var(--primary)' }}>{retailSalesToday.toFixed(3)}</span>
              <span className="text-price-unit" style={{ color: 'var(--on-surface-variant)', fontWeight: 700 }}>KWD</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 13, color: 'var(--on-tertiary-container)' }}>trending_up</span>
              <span className="text-label-sm" style={{ fontSize: 11, color: 'var(--on-surface-variant)', fontWeight: 500 }}>3 orders today</span>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="text-label-sm" style={{ color: 'var(--on-surface-variant)', textTransform: 'uppercase' }}>Active RFQs</span>
            <div style={{ width: 24, height: 24, borderRadius: 4, background: 'var(--secondary-fixed)', color: 'var(--on-secondary-fixed)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>request_quote</span>
            </div>
          </div>
          <div style={{ marginTop: 8 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span className="text-price-display" style={{ color: 'var(--primary)' }}>{pendingRfqs.length}</span>
              <span className="text-label-md" style={{ color: 'var(--on-surface-variant)' }}>Pending</span>
            </div>
            <div style={{ marginTop: 4 }}>
              <span className="text-label-sm" style={{ fontSize: 11, color: 'var(--on-surface-variant)', fontWeight: 500 }}>Est. ~{activeRfqTotal.toFixed(3)} KWD</span>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="text-label-sm" style={{ color: 'var(--on-surface-variant)', textTransform: 'uppercase' }}>Stock Alerts</span>
            <div style={{ width: 24, height: 24, borderRadius: 4, background: 'var(--error-container)', color: 'var(--on-error-container)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>inventory_2</span>
            </div>
          </div>
          <div style={{ marginTop: 8 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span className="text-price-display" style={{ color: 'var(--error)' }}>1</span>
              <span className="text-label-md" style={{ color: 'var(--error)' }}>SKU Low</span>
            </div>
            <div style={{ marginTop: 4 }}>
              <span className="text-label-sm" style={{ fontSize: 11, color: 'var(--on-surface-variant)' }}>Cotton Sash 10mm</span>
            </div>
          </div>
        </div>
      </div>

      {/* Urgent Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--on-tertiary-container)' }}>priority_high</span>
            <h2 className="text-headline-sm" style={{ color: 'var(--primary)', fontWeight: 700 }}>Urgent Actions Needed</h2>
          </div>
          <span className="text-label-sm" style={{ padding: '2px 8px', borderRadius: 4, background: 'var(--surface-container-high)', color: 'var(--on-surface-variant)' }}>
            {(pendingRetailOrders.length > 0 ? 1 : 0) + (pendingRfqs.length > 0 ? 1 : 0)} Required
          </span>
        </div>

        {pendingRfqs.length > 0 && (
          <div className="card" style={{ padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="text-label-sm" style={{ padding: '2px 8px', borderRadius: 4, background: 'var(--signal-orange-dim)', color: 'var(--on-tertiary-container)', textTransform: 'uppercase' }}>High Priority RFQ</span>
                  <span className="text-label-sm" style={{ fontFamily: 'monospace', color: 'var(--on-surface-variant)' }}>{pendingRfqs[0].id}</span>
                </div>
                <h3 className="text-body-lg" style={{ color: 'var(--primary)', fontWeight: 700, marginTop: 8 }}>{pendingRfqs[0].companyName}</h3>
                <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>{pendingRfqs[0].items.length} items requested</p>
              </div>
            </div>
            <div style={{ background: 'var(--pale-blue-grey)', padding: '6px 12px', borderRadius: 4, display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
              <span className="text-label-sm" style={{ color: 'var(--charcoal-slate)' }}>Status: Awaiting Quote Offer</span>
              <span className="text-label-sm" style={{ color: 'var(--charcoal-slate)' }}>Subtotal: ~{pendingRfqs[0].estimatedTotal.toFixed(3)} KWD</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12 }}>
              <Link to="/admin/rfqs" className="btn btn-primary">
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>send</span> Send Proforma
              </Link>
            </div>
          </div>
        )}

        {pendingRetailOrders.length > 0 && (
          <div className="card" style={{ padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="text-label-sm" style={{ padding: '2px 8px', borderRadius: 4, background: 'var(--pale-blue-grey)', color: 'var(--charcoal-slate)', textTransform: 'uppercase' }}>Retail Dispatch</span>
                  <span className="text-label-sm" style={{ fontFamily: 'monospace', color: 'var(--on-surface-variant)' }}>{pendingRetailOrders[0].id}</span>
                </div>
                <h3 className="text-body-lg" style={{ color: 'var(--primary)', fontWeight: 700, marginTop: 8 }}>{pendingRetailOrders[0].customerName}</h3>
                <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>{pendingRetailOrders[0].items.length} Items • {pendingRetailOrders[0].deliveryMethod}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="text-headline-sm" style={{ color: 'var(--primary)', fontWeight: 700 }}>{pendingRetailOrders[0].total.toFixed(3)}</span>
                <span className="text-price-unit" style={{ color: 'var(--on-surface-variant)', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>KWD</span>
              </div>
            </div>
            <div style={{ background: 'rgba(249,223,180,0.4)', padding: '6px 12px', borderRadius: 4, display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
              <span className="text-label-sm" style={{ color: 'var(--secondary)' }}>Ready for Packing</span>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', marginTop: 12 }} onClick={() => {
              dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { id: pendingRetailOrders[0].id, status: 'dispatched' } });
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>local_shipping</span> Mark Dispatched to Driver
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
