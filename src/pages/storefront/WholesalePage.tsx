import { Link } from 'react-router-dom';

export default function WholesalePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <section style={{ padding: 'var(--space-md) var(--margin-mobile)', background: 'var(--primary-container)', color: 'var(--pure-white)' }}>
        <span className="material-symbols-outlined" style={{ fontSize: 32, color: 'var(--on-tertiary-container)' }}>corporate_fare</span>
        <h1 className="text-headline-lg-mobile" style={{ fontWeight: 700, marginTop: 8 }}>Contractor & Wholesale B2B</h1>
        <p className="text-body-md" style={{ color: 'var(--surface-container-high)', marginTop: 8 }}>
          Request bulk commercial pricing and fast contractor supply quotes from our Shuwaikh warehouse.
        </p>
      </section>

      <section style={{ padding: '24px var(--margin-mobile)' }}>
        <div className="card" style={{ padding: 20 }}>
          <h2 className="text-headline-sm" style={{ color: 'var(--primary)' }}>3-Step Wholesale Process</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--primary)', color: 'var(--pure-white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>1</div>
              <div>
                <h3 className="text-label-md" style={{ fontWeight: 700 }}>Select Ropes & Diameters</h3>
                <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>Add items from the catalog directly to your Quote Basket.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--primary)', color: 'var(--pure-white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>2</div>
              <div>
                <h3 className="text-label-md" style={{ fontWeight: 700 }}>Specify Quantities</h3>
                <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>Order in cartons, full spools, or master coils.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--on-tertiary-container)', color: 'var(--pure-white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>3</div>
              <div>
                <h3 className="text-label-md" style={{ fontWeight: 700 }}>Receive Najmi Direct Quote</h3>
                <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>Get a commercial proforma invoice within hours.</p>
              </div>
            </div>
          </div>
        </div>

        <Link to="/shop" className="btn btn-signal" style={{ width: '100%', padding: '16px', marginTop: 24 }}>
          Browse Catalog to Add Quotes
        </Link>
      </section>
    </div>
  );
}
