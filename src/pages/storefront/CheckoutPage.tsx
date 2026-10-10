import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../StoreContext';

export default function CheckoutPage() {
  const { state, dispatch, showToast } = useStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: 'Tariq Al-Mansoor',
    email: 'tariq@email.com',
    phone: '+965 98765432',
    address: 'Dasma, Block 3, St 5',
    method: 'delivery' as 'delivery' | 'pickup'
  });

  const subtotal = state.cart.reduce((acc, item) => {
    const p = state.products.find(p => p.id === item.productId);
    const v = p?.variants.find(v => v.id === item.variantId);
    return acc + (v ? v.retailPrice * item.quantity : 0);
  }, 0);

  const delivery = formData.method === 'delivery' ? 1.500 : 0;
  const total = subtotal + delivery;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.cart.length === 0) return;
    
    // Simulate order placement
    showToast('Processing order...', 'hourglass_top');
    setTimeout(() => {
      dispatch({
        type: 'CREATE_ORDER',
        payload: {
          items: state.cart,
          subtotal,
          delivery,
          discount: 0,
          total,
          status: 'pending',
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          deliveryAddress: formData.address,
          deliveryMethod: formData.method,
          paymentMethod: 'KNET (Demo)',
          notes: ''
        }
      });
      // In a real app we'd get the ID back, for demo we just route to latest order
      navigate('/order-confirmation/latest');
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <section style={{ padding: 'var(--space-md) var(--margin-mobile)' }}>
        <h1 className="text-headline-lg-mobile" style={{ color: 'var(--primary)', fontWeight: 700 }}>Checkout</h1>
        <div style={{ background: 'var(--signal-orange-dim)', padding: 12, borderRadius: 8, marginTop: 12, display: 'flex', gap: 8 }}>
          <span className="material-symbols-outlined" style={{ color: 'var(--on-tertiary-container)' }}>info</span>
          <span className="text-body-sm">Demo Prototype: No actual payments will be processed.</span>
        </div>
      </section>

      <section style={{ padding: '0 var(--margin-mobile)', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card" style={{ padding: 16 }}>
            <h3 className="text-headline-sm" style={{ marginBottom: 16 }}>Contact Info</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input type="text" className="input" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
              <input type="tel" className="input" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
              <input type="email" className="input" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
            </div>
          </div>

          <div className="card" style={{ padding: 16 }}>
            <h3 className="text-headline-sm" style={{ marginBottom: 16 }}>Delivery Method</h3>
            <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
              <button type="button" className={`btn ${formData.method === 'delivery' ? 'btn-primary' : 'btn-outline'}`} style={{ flex: 1 }} onClick={() => setFormData({...formData, method: 'delivery'})}>
                Delivery
              </button>
              <button type="button" className={`btn ${formData.method === 'pickup' ? 'btn-primary' : 'btn-outline'}`} style={{ flex: 1 }} onClick={() => setFormData({...formData, method: 'pickup'})}>
                Pickup
              </button>
            </div>
            {formData.method === 'delivery' && (
              <textarea className="input" placeholder="Delivery Address" rows={3} style={{ height: 'auto', paddingTop: 8 }} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} required></textarea>
            )}
          </div>

          <div className="card" style={{ padding: 16 }}>
            <h3 className="text-headline-sm" style={{ marginBottom: 12 }}>Payment</h3>
            <div style={{ padding: 12, border: '1px solid var(--primary)', borderRadius: 8, background: 'var(--surface-container-low)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="radio" checked readOnly />
              <span className="text-label-md">KNET (Demo Gateway)</span>
            </div>
          </div>

          <div className="card" style={{ padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }} className="text-body-md">
              <span>Items</span>
              <span>{subtotal.toFixed(3)} KWD</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }} className="text-body-md">
              <span>Delivery</span>
              <span>{delivery.toFixed(3)} KWD</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid var(--surface-container)' }} className="text-headline-sm">
              <span>Total</span>
              <span style={{ color: 'var(--primary)' }}>{total.toFixed(3)} KWD</span>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 24, padding: '16px' }} disabled={state.cart.length === 0}>
              Pay {total.toFixed(3)} KWD
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
