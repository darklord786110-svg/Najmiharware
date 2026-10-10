import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../StoreContext';
import { getProduct, getVariant } from '../../store';

export default function CartPage() {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();
  const { cart } = state;

  const handleUpdateQty = (productId: string, variantId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_CART_QTY', payload: { productId, variantId, quantity } });
  };

  const handleRemove = (productId: string, variantId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId, variantId } });
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleMoveToRfq = () => {
    cart.forEach(item => {
      dispatch({ type: 'ADD_TO_RFQ', payload: { ...item, notes: '' } });
    });
    dispatch({ type: 'CLEAR_CART' });
    navigate('/rfq-basket');
  };

  const subtotal = cart.reduce((acc, item) => {
    const product = getProduct(state, item.productId);
    const variant = product ? getVariant(product, item.variantId) : null;
    return acc + (variant ? variant.retailPrice * item.quantity : 0);
  }, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <section style={{ padding: 'var(--space-md) var(--margin-mobile)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 className="text-headline-lg-mobile" style={{ color: 'var(--primary)', fontWeight: 700 }}>
          Shopping Cart <span style={{ color: 'var(--secondary)' }}>({cart.length} items)</span>
        </h1>
      </section>

      <section style={{ padding: '0 var(--margin-mobile)', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {cart.length === 0 ? (
          <div className="card" style={{ padding: 32, textAlign: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--outline)' }}>production_quantity_limits</span>
            <h3 className="text-headline-sm" style={{ marginTop: 12 }}>Your cart is empty</h3>
            <Link to="/shop" className="btn btn-primary" style={{ marginTop: 16 }}>Browse Catalog</Link>
          </div>
        ) : (
          <>
            {cart.map(item => {
              const product = getProduct(state, item.productId);
              const variant = product ? getVariant(product, item.variantId) : null;
              if (!product || !variant) return null;
              
              return (
                <div key={`${item.productId}-${item.variantId}`} className="card" style={{ padding: 14 }}>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <div style={{ width: 80, height: 80, borderRadius: 8, background: 'var(--surface-container)', padding: 4 }}>
                      {product.images[0] && <img src={product.images[0]} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4 }} alt="" />}
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span className="text-headline-sm" style={{ fontSize: 15, lineHeight: 1.2 }}>{product.name}</span>
                          <button onClick={() => handleRemove(item.productId, item.variantId)} style={{ color: 'var(--outline)', padding: 4 }}>
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>delete_outline</span>
                          </button>
                        </div>
                        <span className="text-label-sm" style={{ color: 'var(--outline)' }}>{variant.diameter} • {variant.length}{variant.color ? ` • ${variant.color}` : ''}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                        <div style={{ display: 'flex', alignItems: 'center', background: 'var(--surface-container-low)', borderRadius: 6 }}>
                          <button onClick={() => handleUpdateQty(item.productId, item.variantId, item.quantity - 1)} style={{ padding: '4px 8px' }}><span className="material-symbols-outlined" style={{ fontSize: 16 }}>remove</span></button>
                          <span className="text-label-md" style={{ minWidth: 20, textAlign: 'center' }}>{item.quantity}</span>
                          <button onClick={() => handleUpdateQty(item.productId, item.variantId, item.quantity + 1)} style={{ padding: '4px 8px' }}><span className="material-symbols-outlined" style={{ fontSize: 16 }}>add</span></button>
                        </div>
                        <span className="text-label-md" style={{ fontWeight: 700 }}>{(variant.retailPrice * item.quantity).toFixed(3)} KWD</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="card" style={{ padding: 16, background: 'var(--primary-container)', color: 'var(--pure-white)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--on-tertiary-container)' }}>engineering</span>
                <span className="text-label-md">Ordering 20+ rolls?</span>
              </div>
              <p className="text-body-sm" style={{ color: 'var(--on-primary-container)', marginTop: 4 }}>Move items to RFQ basket for wholesale pricing.</p>
              <button className="btn btn-signal" style={{ width: '100%', marginTop: 12 }} onClick={handleMoveToRfq}>
                Move to Wholesale RFQ
              </button>
            </div>

            <div className="card" style={{ padding: 16 }}>
              <h3 className="text-headline-sm" style={{ fontSize: 17, marginBottom: 12 }}>Order Summary</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }} className="text-body-md">
                <span>Items Subtotal</span>
                <span style={{ fontWeight: 700 }}>{subtotal.toFixed(3)} KWD</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderTop: '1px solid var(--surface-container)', borderBottom: '1px solid var(--surface-container)' }} className="text-headline-sm">
                <span>Estimated Total</span>
                <span style={{ color: 'var(--primary)' }}>{subtotal.toFixed(3)} KWD</span>
              </div>
              <button className="btn btn-primary" style={{ width: '100%', marginTop: 16, padding: '12px' }} onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
