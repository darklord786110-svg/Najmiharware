import { Link } from 'react-router-dom';
import { useStore } from '../../StoreContext';
import { getProduct, getVariant } from '../../store';

export default function OrderConfirmation() {
  const { state } = useStore();
  // Using the latest order if 'latest' is passed as param, else find by id
  const order = state.retailOrders[0]; 

  if (!order) return <div style={{ padding: 24 }}>No order found.</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px var(--margin-mobile)' }}>
      <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#e6f4ea', color: '#1e7e34', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
        <span className="material-symbols-outlined" style={{ fontSize: 32 }}>check_circle</span>
      </div>
      <h1 className="text-headline-lg-mobile" style={{ color: 'var(--primary)', fontWeight: 700, textAlign: 'center' }}>Order Confirmed!</h1>
      <p className="text-body-md" style={{ color: 'var(--on-surface-variant)', marginTop: 8, textAlign: 'center' }}>
        Thank you for your demo order.
      </p>
      
      <div className="card" style={{ width: '100%', padding: 20, marginTop: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--surface-container)', paddingBottom: 12, marginBottom: 12 }}>
          <span className="text-label-sm" style={{ color: 'var(--outline)' }}>ORDER ID</span>
          <span className="text-label-md" style={{ fontWeight: 700 }}>{order.id}</span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {order.items.map((item, idx) => {
            const product = getProduct(state, item.productId);
            const variant = product ? getVariant(product, item.variantId) : null;
            return (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-body-sm">{item.quantity}x {product?.name}</span>
                <span className="text-label-md">{(variant ? variant.retailPrice * item.quantity : 0).toFixed(3)} KWD</span>
              </div>
            );
          })}
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--surface-container)', paddingTop: 12, marginTop: 12 }}>
          <span className="text-headline-sm">Total Paid</span>
          <span className="text-headline-sm" style={{ color: 'var(--primary)' }}>{order.total.toFixed(3)} KWD</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, width: '100%', marginTop: 24 }}>
        <Link to="/shop" className="btn btn-outline" style={{ flex: 1 }}>Continue Shopping</Link>
        <Link to="/account" className="btn btn-primary" style={{ flex: 1 }}>View Orders</Link>
      </div>
    </div>
  );
}
