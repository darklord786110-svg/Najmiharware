import { useStore } from '../../StoreContext';
import { getProduct } from '../../store';

export default function AdminOrders() {
  const { state, dispatch, showToast } = useStore();
  
  const updateStatus = (id: string, status: any) => {
    dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { id, status } });
    showToast(`Order ${id} marked as ${status}`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span className="material-symbols-outlined" style={{ fontSize: 24, color: 'var(--primary)' }}>receipt_long</span>
        <h1 className="text-headline-md" style={{ color: 'var(--primary)' }}>Retail Orders</h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {state.retailOrders.map(order => (
          <div key={order.id} className="card" style={{ padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="text-label-sm" style={{ fontFamily: 'monospace', color: 'var(--on-surface-variant)' }}>{order.id}</span>
                  <span className="text-label-sm" style={{ 
                    padding: '2px 8px', borderRadius: 4, 
                    background: order.status === 'delivered' ? '#e6f4ea' : 'var(--surface-container-high)',
                    color: order.status === 'delivered' ? '#1e7e34' : 'var(--on-surface-variant)',
                    textTransform: 'uppercase'
                  }}>
                    {order.status}
                  </span>
                </div>
                <h3 className="text-body-lg" style={{ color: 'var(--primary)', fontWeight: 700, marginTop: 4 }}>{order.customerName}</h3>
                <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>{order.deliveryMethod} • {order.paymentMethod}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="text-headline-sm" style={{ color: 'var(--primary)' }}>{order.total.toFixed(3)} KWD</span>
                <span className="text-body-sm" style={{ display: 'block', color: 'var(--outline)' }}>{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div style={{ marginTop: 12, padding: 12, background: 'var(--surface-container-low)', borderRadius: 8 }}>
              {order.items.map((item, idx) => {
                const product = getProduct(state, item.productId);
                return (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span className="text-body-sm">{item.quantity}x {product?.name}</span>
                  </div>
                );
              })}
            </div>

            {order.status !== 'delivered' && order.status !== 'cancelled' && (
              <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                {order.status === 'pending' && <button className="btn btn-outline" style={{ flex: 1, padding: 8 }} onClick={() => updateStatus(order.id, 'processing')}>Mark Processing</button>}
                {(order.status === 'pending' || order.status === 'processing') && <button className="btn btn-primary" style={{ flex: 1, padding: 8 }} onClick={() => updateStatus(order.id, 'dispatched')}>Mark Dispatched</button>}
                {order.status === 'dispatched' && <button className="btn btn-signal" style={{ flex: 1, padding: 8 }} onClick={() => updateStatus(order.id, 'delivered')}>Confirm Delivered</button>}
              </div>
            )}
          </div>
        ))}
        {state.retailOrders.length === 0 && (
          <p style={{ color: 'var(--on-surface-variant)' }}>No retail orders yet.</p>
        )}
      </div>
    </div>
  );
}
