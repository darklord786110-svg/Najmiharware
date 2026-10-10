import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../StoreContext';

export default function RopeFinder() {
  const { state } = useStore();
  const [app, setApp] = useState('');
  const [mat, setMat] = useState('');
  const [dia, setDia] = useState('');
  const [len, setLen] = useState('');
  const [col, setCol] = useState('');

  const allApps = Array.from(new Set(state.products.flatMap(p => p.tags)));
  const allMats = Array.from(new Set(state.products.map(p => p.material)));
  const allDias = Array.from(new Set(state.products.flatMap(p => p.variants.map(v => v.diameter))));
  const allLens = Array.from(new Set(state.products.flatMap(p => p.variants.map(v => v.length))));
  const allCols = Array.from(new Set(state.products.flatMap(p => p.variants.map(v => v.color)))).filter(Boolean);

  const matchingProducts = useMemo(() => {
    // Return empty array if no filters selected to avoid showing all 144
    if (!app && !mat && !dia && !len && !col) return [];

    return state.products.filter(p => {
      if (app && !p.tags.includes(app)) return false;
      if (mat && p.material !== mat) return false;
      
      const hasVariant = p.variants.some(v => {
        if (dia && v.diameter !== dia) return false;
        if (len && v.length !== len) return false;
        if (col && v.color !== col) return false;
        return true;
      });

      return hasVariant;
    });
  }, [state.products, app, mat, dia, len, col]);

  const hasSearched = app || mat || dia || len || col;

  return (
    <div style={{ background: 'var(--surface-bright)', borderRadius: 12, padding: 32, display: 'flex', flexDirection: 'column', gap: 24, textAlign: 'left', color: 'var(--on-surface)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
        
        <div>
          <label className="text-label-sm" style={{ display: 'block', marginBottom: 8, fontWeight: 700 }}>Application</label>
          <select className="input" value={app} onChange={e => setApp(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid var(--outline-variant)' }}>
            <option value="">Any</option>
            {allApps.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>

        <div>
          <label className="text-label-sm" style={{ display: 'block', marginBottom: 8, fontWeight: 700 }}>Material</label>
          <select className="input" value={mat} onChange={e => setMat(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid var(--outline-variant)' }}>
            <option value="">Any</option>
            {allMats.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        <div>
          <label className="text-label-sm" style={{ display: 'block', marginBottom: 8, fontWeight: 700 }}>Diameter</label>
          <select className="input" value={dia} onChange={e => setDia(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid var(--outline-variant)' }}>
            <option value="">Any</option>
            {allDias.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        <div>
          <label className="text-label-sm" style={{ display: 'block', marginBottom: 8, fontWeight: 700 }}>Length</label>
          <select className="input" value={len} onChange={e => setLen(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid var(--outline-variant)' }}>
            <option value="">Any</option>
            {allLens.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>

        <div>
          <label className="text-label-sm" style={{ display: 'block', marginBottom: 8, fontWeight: 700 }}>Color</label>
          <select className="input" value={col} onChange={e => setCol(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid var(--outline-variant)' }}>
            <option value="">Any</option>
            {allCols.map(c => <option key={c as string} value={c as string}>{c as string}</option>)}
          </select>
        </div>

      </div>

      {hasSearched && (
        <div style={{ marginTop: 24, padding: 24, background: 'var(--surface-container-low)', borderRadius: 8 }}>
          <h3 className="text-headline-sm" style={{ marginBottom: 16 }}>Results ({matchingProducts.length})</h3>
          
          {matchingProducts.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
              {matchingProducts.slice(0, 4).map(p => (
                <Link key={p.id} to={`/product/${p.id}`} className="card" style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 8, textDecoration: 'none' }}>
                  <span className="text-label-sm" style={{ color: 'var(--primary)' }}>{p.name}</span>
                  <span className="text-label-sm" style={{ color: 'var(--on-surface-variant)' }}>{p.variants[0].retailPrice.toFixed(3)} KWD</span>
                </Link>
              ))}
              {matchingProducts.length > 4 && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Link to="/shop" className="text-label-md" style={{ color: 'var(--tertiary)' }}>+{matchingProducts.length - 4} more in Shop</Link>
                </div>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <p className="text-body-md" style={{ marginBottom: 16 }}>No matching products exist for these exact specifications.</p>
              <Link to="/wholesale" className="btn btn-outline">Request Custom Quote</Link>
            </div>
          )}
        </div>
      )}

      {!hasSearched && (
         <div style={{ textAlign: 'center', marginTop: 16 }}>
             <button className="btn btn-primary" onClick={() => setApp(allApps[0] || '')}>Try an Example</button>
         </div>
      )}

    </div>
  );
}
