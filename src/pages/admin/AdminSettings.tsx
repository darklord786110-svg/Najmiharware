import { useState } from 'react';
import { useStore } from '../../StoreContext';

export default function AdminSettings() {
  const { state, dispatch, showToast } = useStore();
  const [formData, setFormData] = useState(state.settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'UPDATE_SETTINGS', payload: formData });
    showToast('Settings saved');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span className="material-symbols-outlined" style={{ fontSize: 24, color: 'var(--primary)' }}>settings</span>
        <h1 className="text-headline-md" style={{ color: 'var(--primary)' }}>Store Settings</h1>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="card" style={{ padding: 20 }}>
          <h2 className="text-headline-sm" style={{ marginBottom: 16 }}>Store Identity</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label className="text-label-sm" style={{ color: 'var(--on-surface-variant)', display: 'block', marginBottom: 4 }}>Store Name</label>
              <input type="text" className="input" value={formData.storeName} onChange={e => setFormData({...formData, storeName: e.target.value})} />
            </div>
            <div>
              <label className="text-label-sm" style={{ color: 'var(--on-surface-variant)', display: 'block', marginBottom: 4 }}>Tagline</label>
              <input type="text" className="input" value={formData.tagline} onChange={e => setFormData({...formData, tagline: e.target.value})} />
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <h2 className="text-headline-sm" style={{ marginBottom: 16 }}>Contact Info</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label className="text-label-sm" style={{ color: 'var(--on-surface-variant)', display: 'block', marginBottom: 4 }}>Phone</label>
              <input type="text" className="input" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
            <div>
              <label className="text-label-sm" style={{ color: 'var(--on-surface-variant)', display: 'block', marginBottom: 4 }}>Email</label>
              <input type="text" className="input" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div>
              <label className="text-label-sm" style={{ color: 'var(--on-surface-variant)', display: 'block', marginBottom: 4 }}>Address</label>
              <textarea className="input" style={{ height: 'auto', paddingTop: 8 }} rows={3} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})}></textarea>
            </div>
            <div>
              <label className="text-label-sm" style={{ color: 'var(--on-surface-variant)', display: 'block', marginBottom: 4 }}>Google Map URL (Embed)</label>
              <textarea className="input" style={{ height: 'auto', paddingTop: 8 }} rows={3} value={formData.mapUrl || ''} onChange={e => setFormData({...formData, mapUrl: e.target.value})}></textarea>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ padding: 16 }}>Save Settings</button>
      </form>
    </div>
  );
}
