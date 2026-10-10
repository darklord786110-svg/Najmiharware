import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../StoreContext';
import { getProduct, getVariant } from '../../store';

export default function RfqBasketPage() {
  const { state, dispatch, showToast } = useStore();
  const navigate = useNavigate();
  const { rfqBasket } = state;
  const [formData, setFormData] = useState({
    company: 'Al-Ahmad Contracting',
    name: 'Mohamed',
    phone: '+965 22345678',
    email: 'procurement@alahmad.com',
    notes: 'Need delivery to site ASAP.'
  });

  const handleRemove = (productId: string, variantId: string) => {
    dispatch({ type: 'REMOVE_FROM_RFQ', payload: { productId, variantId } });
  };

  const estTotal = rfqBasket.reduce((acc, item) => {
    const p = getProduct(state, item.productId);
    const v = p ? getVariant(p, item.variantId) : null;
    return acc + (v ? v.retailPrice * item.quantity : 0);
  }, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rfqBasket.length === 0) return;
    
    showToast('Submitting RFQ...', 'hourglass_top');
    setTimeout(() => {
      dispatch({
        type: 'SUBMIT_RFQ',
        payload: {
          items: rfqBasket,
          companyName: formData.company,
          contactName: formData.name,
          contactPhone: formData.phone,
          contactEmail: formData.email,
          notes: formData.notes,
          status: 'pending',
          estimatedTotal: estTotal,
          quotedTotal: null
        }
      });
      showToast('Quote Request Submitted', 'done_all');
      navigate('/account');
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <section style={{ padding: 'var(--space-md) var(--margin-mobile)' }}>
        <h1 className="text-headline-lg-mobile" style={{ color: 'var(--primary)', fontWeight: 700 }}>
          Wholesale RFQ Basket
        </h1>
        <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>Request bulk pricing for your items.</p>
      </section>

      <section style={{ padding: '0 var(--margin-mobile)', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {rfqBasket.length === 0 ? (
          <div className="card" style={{ padding: 32, textAlign: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--outline)' }}>request_quote</span>
            <h3 className="text-headline-sm" style={{ marginTop: 12 }}>RFQ Basket is empty</h3>
            <Link to="/wholesale" className="btn btn-primary" style={{ marginTop: 16 }}>Learn About Wholesale</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {rfqBasket.map(item => {
              const product = getProduct(state, item.productId);
              const variant = product ? getVariant(product, item.variantId) : null;
              if (!product || !variant) return null;
              return (
                <div key={`${item.productId}-${item.variantId}`} className="card" style={{ padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="text-headline-sm" style={{ fontSize: 16 }}>{product.name}</span>
                    <button type="button" onClick={() => handleRemove(item.productId, item.variantId)} style={{ color: 'var(--outline)' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 18 }}>delete_outline</span>
                    </button>
                  </div>
                  <span className="text-label-sm" style={{ color: 'var(--outline)', display: 'block', marginTop: 4 }}>
                    {variant.diameter} • {variant.length}{variant.color ? ` • ${variant.color}` : ''}
                  </span>
                  <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span className="text-label-sm" style={{ background: 'var(--surface-container)', padding: '2px 8px', borderRadius: 4 }}>
                      Req Qty: {item.quantity}
                    </span>
                    <span className="text-label-sm" style={{ color: 'var(--outline)' }}>Est. {(variant.retailPrice * item.quantity).toFixed(3)} KWD</span>
                  </div>
                </div>
              );
            })}

            <div className="card" style={{ padding: 16 }}>
              <h3 className="text-headline-sm" style={{ marginBottom: 16 }}>Company Details</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input type="text" className="input" placeholder="Company Name" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} required />
                <input type="text" className="input" placeholder="Contact Person" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                <input type="tel" className="input" placeholder="Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
                <input type="email" className="input" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
                <textarea className="input" placeholder="Project details or delivery requirements..." rows={3} style={{ height: 'auto', paddingTop: 8 }} value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})}></textarea>
              </div>
            </div>

            <button type="submit" className="btn btn-signal" style={{ padding: '16px', fontWeight: 700 }}>
              Submit Request for Quotation
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
