import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useStore } from '../StoreContext';

const sidebarItems = [
  { path: '/admin', icon: 'dashboard', label: 'Dashboard', exact: true },
  { path: '/admin/products', icon: 'inventory_2', label: 'Products' },
  { path: '/admin/orders', icon: 'receipt_long', label: 'Retail Orders' },
  { path: '/admin/rfqs', icon: 'request_quote', label: 'Wholesale RFQs' },
  { path: '/admin/inventory', icon: 'warehouse', label: 'Inventory' },
  { path: '/admin/customers', icon: 'people', label: 'Customers' },
  { path: '/admin/banners', icon: 'view_carousel', label: 'Banners' },
  { path: '/admin/categories', icon: 'category', label: 'Categories' },
  { path: '/admin/settings', icon: 'settings', label: 'Settings' },
];

export default function AdminLayout() {
  const { state, dispatch, showToast } = useStore();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path: string, exact?: boolean) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const handleReset = () => {
    if (confirm('Clear all local demo prototype states and reset to default catalog values?')) {
      dispatch({ type: 'RESET_STORE' });
      showToast('Demo state reset complete.', 'restart_alt');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface)' }}>
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div style={{
          padding: '20px 16px 16px', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: 'var(--charcoal-slate)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--primary-fixed)' }}>admin_panel_settings</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="text-label-md" style={{ color: 'var(--pure-white)', letterSpacing: '-0.01em' }}>NAJMI Console</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--on-tertiary-container)' }} className="animate-pulse" />
                <span className="text-label-sm" style={{ fontSize: 10, color: 'var(--on-primary-container)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Demo Mode</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="hide-desktop"
            style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--on-primary-container)' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>close</span>
          </button>
        </div>

        {/* Nav Items */}
        <nav style={{ padding: '12px 0', flex: 1 }}>
          {sidebarItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`admin-sidebar-item ${isActive(item.path, item.exact) ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
              style={{ textDecoration: 'none' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{item.icon}</span>
              <span>{item.label}</span>
              {item.label === 'Retail Orders' && (
                <span style={{
                  marginLeft: 'auto', padding: '1px 6px', borderRadius: 4,
                  background: 'var(--on-tertiary-container)', color: 'var(--pure-white)',
                  fontSize: 10, fontWeight: 700
                }}>{state.retailOrders.filter(o => o.status === 'pending' || o.status === 'processing').length}</span>
              )}
              {item.label === 'Wholesale RFQs' && (
                <span style={{
                  marginLeft: 'auto', padding: '1px 6px', borderRadius: 4,
                  background: 'var(--secondary-fixed)', color: 'var(--on-secondary-fixed)',
                  fontSize: 10, fontWeight: 700
                }}>{state.rfqSubmissions.filter(r => r.status === 'pending').length}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Bottom Section */}
        <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <Link to="/" style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 12px', borderRadius: 8,
            color: 'var(--on-primary-container)', fontSize: 13,
            textDecoration: 'none', transition: 'all 0.15s'
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>storefront</span>
            <span>View Storefront</span>
          </Link>
          <button onClick={handleReset} style={{
            display: 'flex', alignItems: 'center', gap: 8, width: '100%',
            padding: '8px 12px', borderRadius: 8, marginTop: 4,
            color: 'var(--tertiary-fixed-dim)', fontSize: 13,
            transition: 'all 0.15s'
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>restart_alt</span>
            <span>Reset Demo Data</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="admin-content">
        {/* Top Bar */}
        <header style={{
          background: 'var(--primary-container)', color: 'var(--pure-white)',
          padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'sticky', top: 0, zIndex: 30
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              onClick={() => setSidebarOpen(true)}
              className="hide-desktop"
              style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--pure-white)' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 24 }}>menu</span>
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--on-tertiary-container)' }} className="animate-pulse" />
              <span className="text-headline-sm" style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.02em' }}>NAJMI Merchant Console</span>
            </div>
            <span style={{ height: 16, width: 1, background: 'rgba(255,255,255,0.2)' }} />
            <div className="text-label-sm" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--on-primary-container)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 15, color: 'var(--secondary-fixed)' }}>warehouse</span>
                Shuwaikh Hub 01
              </span>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>•</span>
              <span style={{
                background: 'rgba(38,52,71,0.6)', padding: '2px 8px', borderRadius: 4,
                fontFamily: 'monospace', letterSpacing: '0.08em'
              }}>ID #MGR-449</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Demo/Live Toggle */}
            <div style={{ display: 'flex', background: 'var(--primary)', borderRadius: 4, padding: 2, boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)' }}>
              <button style={{
                padding: '4px 12px', borderRadius: 3,
                background: 'var(--on-tertiary-container)', color: 'var(--pure-white)',
                fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase'
              }}>DEMO</button>
              <button style={{
                padding: '4px 12px', borderRadius: 3,
                color: 'var(--on-primary-container)',
                fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase'
              }}>LIVE</button>
            </div>

            {/* Admin Profile */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'var(--secondary-fixed)', color: 'var(--primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 700
              }}>TM</div>
              <div className="hide-mobile" style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="text-label-md" style={{ lineHeight: 1.2 }}>Tariq Al-Mansoor</span>
                <span className="text-label-sm" style={{ fontSize: 10, color: 'var(--on-primary-container)', lineHeight: 1.2 }}>Terminal Supervisor</span>
              </div>
            </div>
          </div>
        </header>

        {/* Demo Warning Banner */}
        <div style={{
          margin: '16px 24px 0', padding: '12px 16px', borderRadius: 8,
          background: 'var(--signal-orange-dim)', display: 'flex', alignItems: 'flex-start', gap: 12
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--on-tertiary-container)', marginTop: 2 }}>verified_user</span>
          <div>
            <span className="text-label-sm" style={{ color: 'var(--on-tertiary-container)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Merchant Prototype Sandbox</span>
            <p className="text-body-sm" style={{ color: 'var(--charcoal-slate)', marginTop: 4 }}>
              Local simulated metrics only. No live KNET gateway debits or warehouse ERP sync.
            </p>
          </div>
        </div>

        {/* Page Content */}
        <div style={{ padding: 24 }}>
          <div className="page-enter">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="hide-desktop"
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
            zIndex: 39
          }}
        />
      )}
    </div>
  );
}
