import { useStore } from '../../StoreContext';

export default function AdminProducts() {
  const { state, dispatch, showToast } = useStore();

  const handlePriceUpdate = (productId: string, variantId: string, oldPrice: number) => {
    const newPrice = prompt(`Update Retail Price (Current: ${oldPrice.toFixed(3)} KWD):`, oldPrice.toFixed(3));
    if (newPrice && !isNaN(parseFloat(newPrice))) {
      const product = state.products.find(p => p.id === productId);
      if (product) {
        const updatedProduct = {
          ...product,
          variants: product.variants.map(v => 
            v.id === variantId ? { ...v, retailPrice: parseFloat(newPrice) } : v
          )
        };
        dispatch({ type: 'UPDATE_PRODUCT', payload: updatedProduct });
        showToast('Price updated');
      }
    }
  };

  const handleToggleVisibility = (productId: string) => {
    dispatch({ type: 'TOGGLE_PRODUCT_ACTIVE', payload: productId });
    showToast('Visibility toggled');
  };

  const handleImageUpdate = (productId: string) => {
    const newImage = prompt(`Enter new main image URL (e.g. /images/products/rope_photo_001.png):`);
    if (newImage) {
      const product = state.products.find(p => p.id === productId);
      if (product) {
        const updatedProduct = {
          ...product,
          images: [newImage, ...product.images.slice(1)]
        };
        dispatch({ type: 'UPDATE_PRODUCT', payload: updatedProduct });
        showToast('Main image updated');
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 24, color: 'var(--primary)' }}>inventory_2</span>
          <h1 className="text-headline-md" style={{ color: 'var(--primary)' }}>Products & Prices</h1>
        </div>
        <button className="btn btn-primary" onClick={() => showToast('Feature disabled in prototype')}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span> Add Product
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {state.products.map(product => (
          <div key={product.id} className="card" style={{ padding: 16 }}>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ width: 64, height: 64, borderRadius: 8, background: 'var(--surface-container-low)', padding: 4, flexShrink: 0, position: 'relative' }}>
                {product.images[0] && <img src={product.images[0]} style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt="" />}
                <button 
                  onClick={() => handleImageUpdate(product.id)}
                  style={{ position: 'absolute', bottom: -12, left: '50%', transform: 'translateX(-50%)', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 4, padding: '2px 8px', fontSize: 10, cursor: 'pointer' }}>
                  Edit Img
                </button>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span className="text-label-sm" style={{ fontFamily: 'monospace', color: 'var(--on-surface-variant)' }}>{product.variants[0].sku}</span>
                    <h3 className="text-body-lg" style={{ color: 'var(--primary)', fontWeight: 700, lineHeight: 1.2 }}>{product.name}</h3>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {product.brand === 'STAR ROPE' && (
                      <span className="badge" style={{ background: 'var(--tertiary)', color: '#fff' }}>OWN BRAND</span>
                    )}
                    {product.origin && (
                      <span className="badge" style={{ background: 'var(--surface-dim)', color: 'var(--on-surface-variant)' }}>{product.origin}</span>
                    )}
                    <span className="text-label-sm" style={{ 
                      padding: '2px 6px', borderRadius: 4, 
                      background: product.stock <= product.lowStockThreshold ? 'var(--error-container)' : 'var(--pale-blue-grey)',
                      color: product.stock <= product.lowStockThreshold ? 'var(--error)' : 'var(--charcoal-slate)'
                    }}>
                      {product.stock} in stock
                    </span>
                  </div>
                </div>
                
                {product.manufacturer && (
                  <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)', marginTop: 4 }}>
                    Mfr: {product.manufacturer} {product.countryOfOrigin ? `(${product.countryOfOrigin})` : ''}
                  </p>
                )}
                
                <div style={{ background: 'var(--surface-container-low)', padding: 12, borderRadius: 8, marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span className="text-label-sm" style={{ color: 'var(--on-surface-variant)', textTransform: 'uppercase' }}>Retail:</span>
                    <span className="text-price-display" style={{ fontSize: 18, color: 'var(--primary)' }}>{product.variants[0].retailPrice.toFixed(3)} KWD</span>
                    <button 
                      className="text-label-sm" 
                      style={{ color: 'var(--primary-container)', textDecoration: 'underline' }}
                      onClick={() => handlePriceUpdate(product.id, product.variants[0].id, product.variants[0].retailPrice)}
                    >
                      Edit
                    </button>
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                    <span className="text-label-sm" style={{ color: 'var(--on-surface-variant)' }}>Storefront</span>
                    <div className={`toggle-switch ${product.isActive ? 'active' : ''}`} onClick={() => handleToggleVisibility(product.id)}></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
