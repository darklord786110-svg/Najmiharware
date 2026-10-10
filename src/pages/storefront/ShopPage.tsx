import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useStore } from '../../StoreContext';
import { useState, useMemo, useEffect } from 'react';

export default function ShopPage() {
  const { state, dispatch, showToast } = useStore();
  const { category } = useParams<{ category: string }>();
  const [searchParams] = useSearchParams();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [materialFilter, setMaterialFilter] = useState('');
  const [colorFilter, setColorFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState(searchParams.get('brand') || '');
  const [constructionFilter, setConstructionFilter] = useState(searchParams.get('construction') || '');
  const [applicationFilter, setApplicationFilter] = useState(searchParams.get('application') || '');

  useEffect(() => {
    if (searchParams.get('brand')) setBrandFilter(searchParams.get('brand')!);
    if (searchParams.get('material')) setMaterialFilter(searchParams.get('material')!);
    if (searchParams.get('construction')) setConstructionFilter(searchParams.get('construction')!);
    if (searchParams.get('application')) setApplicationFilter(searchParams.get('application')!);
  }, [searchParams]);

  const activeCategory = category ? state.categories.find(c => c.id === category) : null;

  const filteredProducts = useMemo(() => {
    return state.products.filter(p => {
      if (!p.isActive) return false;
      if (category && p.category !== category) return false;
      if (materialFilter && p.material.toLowerCase() !== materialFilter.toLowerCase()) return false;
      if (brandFilter && p.brand?.toLowerCase() !== brandFilter.toLowerCase()) return false;
      if (constructionFilter && !p.description.toLowerCase().includes(constructionFilter.toLowerCase()) && !p.name.toLowerCase().includes(constructionFilter.toLowerCase())) return false;
      if (applicationFilter && (!p.tags || !p.tags.some(t => t.toLowerCase().includes(applicationFilter.toLowerCase())))) return false;
      if (availabilityFilter === 'in-stock' && p.stock <= 0) return false;

      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        if (!p.name.toLowerCase().includes(term) && !p.material.toLowerCase().includes(term) && !p.brand?.toLowerCase().includes(term)) {
           // check if any variant sku matches
           const hasSkuMatch = p.variants.some(v => v.sku.toLowerCase().includes(term) || v.diameter.includes(term));
           if (!hasSkuMatch) return false;
        }
      }

      if (colorFilter) {
        const hasColor = p.variants.some(v => v.color?.toLowerCase() === colorFilter.toLowerCase());
        if (!hasColor) return false;
      }

      return true;
    });
  }, [state.products, category, searchTerm, materialFilter, colorFilter, availabilityFilter, brandFilter, constructionFilter, applicationFilter]);

  const materials = Array.from(new Set(state.products.map(p => p.material)));
  const colors = Array.from(new Set(state.products.flatMap(p => p.variants.map(v => v.color)))).filter(Boolean);

  const clearFilters = () => {
    setSearchTerm('');
    setMaterialFilter('');
    setColorFilter('');
    setAvailabilityFilter('');
  };

  const handleAddToCart = (e: React.MouseEvent, productId: string, variantId: string) => {
    e.preventDefault();
    dispatch({ type: 'ADD_TO_CART', payload: { productId, variantId, quantity: 1 } });
    showToast('Added to Cart');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <section style={{ padding: '40px var(--margin-mobile)', background: 'var(--primary)', color: '#fff', textAlign: 'center' }}>
        <h1 className="text-display-xl-mobile" style={{ fontWeight: 800 }}>
          {activeCategory ? activeCategory.name : 'All Rope & Cordage'}
        </h1>
        <p className="text-body-lg" style={{ color: 'var(--on-primary-container)', marginTop: 8, maxWidth: 600, margin: '8px auto 0' }}>
          {activeCategory ? activeCategory.description : 'Browse our complete inventory of industrial and retail ropes.'}
        </p>
      </section>

      <div className="container-app" style={{ maxWidth: 1440, margin: '0 auto', display: 'flex', flexDirection: 'row', gap: 32, padding: '40px var(--margin-mobile)' }}>
        
        {/* Desktop Sidebar Filters */}
        <aside className="hide-mobile" style={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div>
            <h3 className="text-headline-sm" style={{ marginBottom: 16 }}>Search</h3>
            <input 
              type="text" 
              placeholder="Search SKUs, names, materials..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid var(--outline-variant)', fontSize: 16 }}
            />
          </div>

          <div>
            <h3 className="text-headline-sm" style={{ marginBottom: 16 }}>Material</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input type="radio" name="material" checked={materialFilter === ''} onChange={() => setMaterialFilter('')} /> All Materials
              </label>
              {materials.map(mat => (
                <label key={mat} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input type="radio" name="material" checked={materialFilter === mat} onChange={() => setMaterialFilter(mat)} /> {mat}
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-headline-sm" style={{ marginBottom: 16 }}>Color</h3>
            <select 
              value={colorFilter} 
              onChange={e => setColorFilter(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid var(--outline-variant)', fontSize: 16 }}
            >
              <option value="">All Colors</option>
              {colors.map(c => <option key={c as string} value={c as string}>{c as string}</option>)}
            </select>
          </div>

          <div>
             <h3 className="text-headline-sm" style={{ marginBottom: 16 }}>Availability</h3>
             <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input type="radio" name="availability" checked={availabilityFilter === ''} onChange={() => setAvailabilityFilter('')} /> Show All
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginTop: 8 }}>
                <input type="radio" name="availability" checked={availabilityFilter === 'in-stock'} onChange={() => setAvailabilityFilter('in-stock')} /> In Stock Only
              </label>
          </div>

          <button className="btn btn-outline" onClick={clearFilters}>Clear Filters</button>
        </aside>

        {/* Mobile search bar (shows only on mobile) */}
        <div className="hide-desktop" style={{ width: '100%' }}>
            <input 
              type="text" 
              placeholder="Search catalogue..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid var(--outline-variant)', fontSize: 16, marginBottom: 24 }}
            />
        </div>

        {/* Product Grid */}
        <section style={{ flexGrow: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <span className="text-body-md" style={{ color: 'var(--on-surface-variant)' }}>Showing {filteredProducts.length} products</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
            {filteredProducts.map(product => {
              const defaultVariant = product.variants[0];
              return (
                <div key={product.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <Link to={`/product/${product.id}`} style={{ display: 'block', padding: 24, background: '#fff', position: 'relative' }}>
                    {product.brand === 'STAR ROPE' && (
                      <span className="badge" style={{ position: 'absolute', top: 16, left: 16, background: 'var(--primary)', color: 'var(--secondary)' }}>STAR ROPE</span>
                    )}
                    {product.images[0] ? (
                      <img src={product.images[0]} alt={product.name} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'contain' }} />
                    ) : (
                      <div style={{ width: '100%', aspectRatio: '1/1', background: 'var(--surface-container-low)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--outline)' }}>image</span>
                      </div>
                    )}
                  </Link>
                  <div style={{ padding: 24, display: 'flex', flexDirection: 'column', flexGrow: 1, borderTop: '1px solid var(--outline-variant)' }}>
                    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <h3 className="text-label-md truncate-2" style={{ marginBottom: 8, height: 36 }}>{product.name}</h3>
                    </Link>
                    
                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 16, paddingTop: 16 }}>
                      <span className="text-headline-sm" style={{ color: 'var(--primary)' }}>{defaultVariant.retailPrice.toFixed(3)}</span>
                      <span className="text-label-sm">KWD</span>
                      <span className="text-label-sm" style={{ color: 'var(--on-surface-variant)' }}>/ {defaultVariant.unit} (from)</span>
                    </div>

                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn btn-primary" style={{ flexGrow: 1 }} onClick={(e) => handleAddToCart(e, product.id, defaultVariant.id)}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredProducts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--on-surface-variant)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 64, color: 'var(--outline-variant)' }}>search_off</span>
              <p className="text-headline-sm" style={{ marginTop: 16 }}>No products match your search.</p>
              <button className="btn btn-outline" style={{ marginTop: 24 }} onClick={clearFilters}>Clear Filters</button>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
