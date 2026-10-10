import { useStore } from '../../StoreContext';
import { getProduct } from '../../store';

export default function AdminRfqs() {
  const { state, dispatch, showToast } = useStore();

  const handleQuote = (id: string, estimatedTotal: number) => {
    const defaultQuote = estimatedTotal * 0.9; // 10% discount for quote
    const quote = prompt(`Enter Quoted Total in KWD (Estimated Retail: ${estimatedTotal.toFixed(3)}):`, defaultQuote.toFixed(3));
    if (quote && !isNaN(parseFloat(quote))) {
      dispatch({ type: 'UPDATE_RFQ_STATUS', payload: { id, status: 'quoted', quotedTotal: parseFloat(quote) } });
      showToast(`Sent quote for ${id}`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span className="material-symbols-outlined" style={{ fontSize: 24, color: 'var(--on-tertiary-container)' }}>request_quote</span>
        <h1 className="text-headline-md" style={{ color: 'var(--primary)' }}>Wholesale RFQs</h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {state.rfqSubmissions.map(rfq => (
          <div key={rfq.id} className="card" style={{ padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="text-label-sm" style={{ fontFamily: 'monospace', color: 'var(--on-surface-variant)' }}>{rfq.id}</span>
                  <span className="text-label-sm" style={{ 
                    padding: '2px 8px', borderRadius: 4, 
                    background: rfq.status === 'quoted' ? 'var(--secondary-container)' : 'var(--surface-container-high)',
                    color: rfq.status === 'quoted' ? 'var(--on-secondary-container)' : 'var(--on-surface-variant)',
                    textTransform: 'uppercase'
                  }}>
                    {rfq.status}
                  </span>
                </div>
                <h3 className="text-body-lg" style={{ color: 'var(--primary)', fontWeight: 700, marginTop: 4 }}>{rfq.companyName}</h3>
                <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>Contact: {rfq.contactName} • {rfq.contactPhone}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="text-body-sm" style={{ display: 'block', color: 'var(--outline)' }}>{new Date(rfq.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div style={{ marginTop: 12, padding: 12, background: 'var(--surface-container-low)', borderRadius: 8 }}>
              {rfq.items.map((item, idx) => {
                const product = getProduct(state, item.productId);
                return (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span className="text-body-sm">{item.quantity}x {product?.name}</span>
                  </div>
                );
              })}
              {rfq.notes && (
                <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--outline-variant)' }}>
                  <span className="text-label-sm" style={{ color: 'var(--on-surface-variant)' }}>Notes:</span>
                  <p className="text-body-sm">{rfq.notes}</p>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
              <div>
                <span className="text-label-sm" style={{ color: 'var(--on-surface-variant)' }}>Est. Retail Value: {rfq.estimatedTotal.toFixed(3)} KWD</span>
                {rfq.quotedTotal && (
                  <div style={{ color: 'var(--on-tertiary-container)', fontWeight: 700 }}>Quoted: {rfq.quotedTotal.toFixed(3)} KWD</div>
                )}
              </div>
              {rfq.status === 'pending' && (
                <button className="btn btn-signal" onClick={() => handleQuote(rfq.id, rfq.estimatedTotal)}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>edit_document</span> Draft Quote
                </button>
              )}
            </div>
          </div>
        ))}
        {state.rfqSubmissions.length === 0 && (
          <p style={{ color: 'var(--on-surface-variant)' }}>No RFQs yet.</p>
        )}
      </div>
    </div>
  );
}
