import { useStore } from '../../StoreContext';
import LocationMap from '../../components/LocationMap';

export default function ContactPage() {
  const { state } = useStore();
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      
      {/* Header */}
      <section style={{ padding: '60px var(--margin-mobile)', background: 'var(--primary)', color: '#fff', textAlign: 'center' }}>
        <h1 className="text-display-lg-mobile" style={{ fontWeight: 800 }}>Contact Us</h1>
        <p className="text-body-lg" style={{ color: 'var(--on-primary-container)', marginTop: 8, maxWidth: 600, margin: '8px auto 0' }}>
          Get in touch with Kuwait's premier rope and cordage specialists.
        </p>
      </section>

      {/* Main Content */}
      <section style={{ padding: '60px var(--margin-mobile)', background: 'var(--surface)' }}>
        <div className="container-app" style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#0b3d91', marginBottom: 24 }}>How can we help?</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--on-surface-variant)', marginBottom: 40 }}>
            Whether you have a technical question, need a bulk quotation, or want to learn more about our manufacturing capabilities, our dedicated sales team is here to assist you.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center', marginBottom: 60 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#fff', padding: '16px 32px', borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', width: '100%', maxWidth: 400 }}>
              <span className="material-symbols-outlined" style={{ color: '#e31837', fontSize: 32 }}>call</span>
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontWeight: 700, color: 'var(--on-surface)', marginBottom: 4 }}>Call Us</p>
                <a href={`tel:${state.settings.phone.replace(/\s+/g, '')}`} style={{ color: '#0b3d91', textDecoration: 'none', fontWeight: 600 }}>{state.settings.phone}</a>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#fff', padding: '16px 32px', borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', width: '100%', maxWidth: 400 }}>
              <span className="material-symbols-outlined" style={{ color: '#e31837', fontSize: 32 }}>mail</span>
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontWeight: 700, color: 'var(--on-surface)', marginBottom: 4 }}>Email Us</p>
                <a href={`mailto:${state.settings.email}`} style={{ color: '#0b3d91', textDecoration: 'none', fontWeight: 600 }}>{state.settings.email}</a>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#fff', padding: '16px 32px', borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', width: '100%', maxWidth: 400 }}>
              <span className="material-symbols-outlined" style={{ color: '#e31837', fontSize: 32 }}>smartphone</span>
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontWeight: 700, color: 'var(--on-surface)', marginBottom: 4 }}>Mobile / WhatsApp</p>
                <a href={`tel:${state.settings.mobile.replace(/\s+/g, '')}`} style={{ color: '#0b3d91', textDecoration: 'none', fontWeight: 600 }}>{state.settings.mobile}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section K: Location Map */}
      <LocationMap />
      
    </div>
  );
}
