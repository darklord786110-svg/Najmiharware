import { useParams } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import { useStore } from '../../StoreContext';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { state, dispatch, showToast } = useStore();
  const product = state.products.find(p => p.id === id);
  const [qty, setQty] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (product && product.variants.length > 0) {
      setSelectedVariantId(product.variants[0].id);
    }
  }, [product]);

  const variant = useMemo(() => {
    return product?.variants.find(v => v.id === selectedVariantId) || product?.variants[0];
  }, [product, selectedVariantId]);

  const allDiameters = useMemo(() => Array.from(new Set(product?.variants.map(v => v.diameter) || [])), [product]);
  const allLengths = useMemo(() => Array.from(new Set(product?.variants.map(v => v.length) || [])), [product]);
  const allColors = useMemo(() => Array.from(new Set(product?.variants.map(v => v.color) || [])).filter(Boolean), [product]);

  if (!product || !variant) return <div style={{ padding: 24, textAlign: 'center', marginTop: 100 }}>Product not found</div>;

  const handleVariantChange = (type: 'diameter' | 'length' | 'color', val: string) => {
    const d = type === 'diameter' ? val : variant.diameter;
    const l = type === 'length' ? val : variant.length;
    const c = type === 'color' ? val : variant.color;

    // Find exact match
    let match = product.variants.find(v => v.diameter === d && v.length === l && v.color === c);
    
    // If not found, fallback to matching at least the changed type
    if (!match) {
      match = product.variants.find(v => v[type] === val);
    }
    
    if (match) setSelectedVariantId(match.id);
  };

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: { productId: product.id, variantId: variant.id, quantity: qty } });
    showToast(`Added ${qty} ${variant.unit}(s) to Cart`);
  };

  const handleAddToRfq = () => {
    dispatch({ type: 'ADD_TO_RFQ', payload: { productId: product.id, variantId: variant.id, quantity: qty, notes: '' } });
    showToast('Added to RFQ Basket', 'price_check');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="container-app" style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 48, padding: '40px var(--margin-mobile)' }}>
        
        {/* Product Image Gallery */}
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Main Image */}
          <div style={{ background: '#fff', borderRadius: 12, aspectRatio: '1/1', padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', overflow: 'hidden', position: 'relative' }}>
            <span style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(255,255,255,0.9)', padding: '4px 8px', borderRadius: 4, fontSize: '0.7rem', color: 'var(--outline)', fontWeight: 600 }}>REPRESENTATIVE PHOTO</span>
            {product.images[0] ? (
              <img src={product.images[selectedImageIndex] || product.images[0]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain', transition: 'transform 0.3s ease', cursor: 'zoom-in' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.2)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
            ) : (
              <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--outline)' }}>image</span>
            )}
          </div>
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}>
              {product.images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setSelectedImageIndex(idx)}
                  style={{ 
                    flex: '0 0 80px', 
                    height: 80, 
                    border: idx === selectedImageIndex ? '2px solid var(--primary)' : '1px solid var(--outline-variant)',
                    borderRadius: 8, 
                    background: '#fff', 
                    padding: 4,
                    cursor: 'pointer',
                    transition: 'border-color 0.2s ease'
                  }}>
                  <img src={img} alt={`${product.name} thumbnail ${idx+1}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {product.brand === 'STAR ROPE' && <span className="badge" style={{ background: 'var(--tertiary)', color: '#fff' }}>STAR ROPE</span>}
            <span className="badge" style={{ background: 'var(--surface-dim)', color: 'var(--on-surface-variant)' }}>{product.categoryTag}</span>
          </div>

          <h1 className="text-headline-lg-mobile" style={{ color: 'var(--primary)', fontWeight: 800 }}>
            {product.name}
          </h1>
          <span className="text-label-sm" style={{ color: 'var(--outline)', textTransform: 'uppercase', marginTop: 8 }}>SKU: {variant.sku}</span>

          <div style={{ marginTop: 24, paddingBottom: 24, borderBottom: '1px solid var(--outline-variant)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span className="text-display-sm" style={{ color: 'var(--primary)', fontWeight: 700 }}>{variant.retailPrice.toFixed(3)}</span>
              <span className="text-label-lg" style={{ color: 'var(--primary)' }}>KWD</span>
              <span className="text-body-md" style={{ color: 'var(--on-surface-variant)' }}>/ {variant.unit}</span>
            </div>
            {variant.stock !== undefined && (
              <p className="text-label-sm" style={{ color: variant.stock > 0 ? 'var(--primary)' : 'var(--error)', marginTop: 8 }}>
                {variant.stock > 0 ? `${variant.stock} in stock` : 'Out of stock'}
              </p>
            )}
          </div>

          {/* Variants */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 24 }}>
            
            {/* Diameter */}
            {allDiameters.length > 1 && (
              <div>
                <span className="text-label-sm" style={{ fontWeight: 700, marginBottom: 8, display: 'block' }}>Diameter</span>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {allDiameters.map(d => (
                    <button key={d} className={`btn ${variant.diameter === d ? 'btn-primary' : 'btn-outline'}`} style={{ padding: '6px 12px', minWidth: 60 }} onClick={() => handleVariantChange('diameter', d)}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Length */}
            {allLengths.length > 1 && (
              <div>
                <span className="text-label-sm" style={{ fontWeight: 700, marginBottom: 8, display: 'block' }}>Roll Length</span>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {allLengths.map(l => (
                    <button key={l} className={`btn ${variant.length === l ? 'btn-primary' : 'btn-outline'}`} style={{ padding: '6px 12px' }} onClick={() => handleVariantChange('length', l)}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color */}
            {allColors.length > 0 && (
              <div>
                <span className="text-label-sm" style={{ fontWeight: 700, marginBottom: 8, display: 'block' }}>Color</span>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {allColors.map(c => (
                    <button key={c as string} className={`btn ${variant.color === c ? 'btn-primary' : 'btn-outline'}`} style={{ padding: '6px 12px' }} onClick={() => handleVariantChange('color', c as string)}>
                      {c as string}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Action Bar */}
          <div style={{ marginTop: 40, display: 'flex', gap: 16, background: 'var(--surface-bright)', padding: 24, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', background: 'var(--surface-container)', borderRadius: 8, padding: 4 }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
                <span className="material-symbols-outlined">remove</span>
              </button>
              <span className="text-headline-sm" style={{ width: 40, textAlign: 'center' }}>{qty}</span>
              <button onClick={() => setQty(qty + 1)} style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
                <span className="material-symbols-outlined">add</span>
              </button>
            </div>
            
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleAddToCart} disabled={variant.stock === 0}>
              <span className="material-symbols-outlined">shopping_bag</span> Add to Cart | {(variant.retailPrice * qty).toFixed(3)}
            </button>
            
            <button className="btn btn-outline" style={{ padding: '0 16px', color: 'var(--tertiary)', borderColor: 'var(--tertiary)' }} onClick={handleAddToRfq} title="Request Wholesale Quote">
              <span className="material-symbols-outlined">request_quote</span>
            </button>
          </div>

          {/* Details */}
          <div style={{ marginTop: 48 }}>
            <h2 className="text-headline-sm" style={{ color: 'var(--primary)', marginBottom: 16 }}>Product Specifications</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <span className="text-label-sm" style={{ color: 'var(--outline)' }}>Material</span>
                <p className="text-body-md" style={{ fontWeight: 600 }}>{product.material}</p>
              </div>
              <div>
                <span className="text-label-sm" style={{ color: 'var(--outline)' }}>Total Length Required</span>
                <p className="text-body-md" style={{ fontWeight: 600 }}>{qty * parseInt(variant.length || '0')} yards</p>
              </div>
            </div>
            
            <div style={{ marginTop: 24, padding: 24, background: 'var(--surface-container-low)', borderRadius: 8 }}>
               <p className="text-body-md" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.6 }}>{product.description}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
