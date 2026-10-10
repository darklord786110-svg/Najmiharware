import { useStore } from '../../StoreContext';

export default function AboutPage() {
  const { state } = useStore();
  const { settings } = state;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: 'var(--space-xl) var(--margin-mobile)' }}>
      <h1 className="text-headline-lg-mobile" style={{ color: 'var(--primary)', fontWeight: 700 }}>
        About {settings.storeName}
      </h1>
      <p className="text-body-md" style={{ color: 'var(--on-surface-variant)', marginTop: 16 }}>
        Established in 1980, Al-Najm Hardware Est. is Kuwait's premier specialist in commercial cordage, industrial ropes, and marine rigging hardware. We operate from our central hub in Shuwaikh Industrial Area, serving both retail walk-ins and major B2B contracting accounts across the GCC.
      </p>
      
      <div className="card" style={{ padding: 20, marginTop: 24 }}>
        <h2 className="text-headline-sm" style={{ color: 'var(--primary)', marginBottom: 12 }}>Contact Us</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--secondary)' }}>location_on</span>
            <span className="text-body-sm">{settings.address}</span>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>call</span>
            <span className="text-body-sm">{settings.phone} / {settings.mobile}</span>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>mail</span>
            <span className="text-body-sm">{settings.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
