import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../StoreContext';
import { getCartItemCount, getRfqItemCount, IMAGES } from '../store';

export default function StorefrontLayout() {
  const { state } = useStore();
  const { i18n } = useTranslation();
  const location = useLocation();
  const cartCount = getCartItemCount(state);
  const rfqCount = getRfqItemCount(state);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const desktopNavItems = [
    { path: '/shop', label: 'Shop' },
    { path: '/brands/star-rope', label: 'STAR ROPE' },
    { path: '/manufacturing', label: 'Manufacturing' },
    { path: '/industries', label: 'Industries' },
    { path: '/wholesale', label: 'Wholesale' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const bottomNavItems = [
    { path: '/', icon: 'home', label: 'Home' },
    { path: '/shop', icon: 'category', label: 'Shop' },
    { path: '/rfq-basket', icon: 'request_quote', label: 'Quotes' },
    { path: '/account', icon: 'person', label: 'Account' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Sticky Header */}
      <header className="sticky-header">
        {/* Info Bar - Desktop Only */}
        <div className="hide-mobile" style={{
          height: '36px', background: 'var(--primary)', color: 'var(--on-primary)',
          padding: '0 var(--margin)', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontSize: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span className="material-symbols-outlined icon-sm">factory</span>
            <span style={{ fontWeight: 500, letterSpacing: '0.04em' }}>KUWAIT ROPE & CORDAGE SPECIALIST | EST. 1980</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="material-symbols-outlined icon-sm text-secondary">support_agent</span>
              <span style={{ fontWeight: 600 }}>{state.settings.phone}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700 }}>
              <span 
                onClick={() => i18n.changeLanguage('en')}
                style={{ 
                  color: i18n.language === 'en' ? 'var(--secondary)' : 'var(--on-primary)',
                  cursor: 'pointer'
                }}>EN</span>
              <span style={{ color: 'var(--on-primary-container)', fontWeight: 400 }}>|</span>
              <span 
                onClick={() => i18n.changeLanguage('ar-KW')}
                style={{ 
                  color: i18n.language === 'ar-KW' ? 'var(--secondary)' : 'var(--on-primary)',
                  cursor: 'pointer'
                }}>العربية</span>
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <div style={{
          height: '72px', padding: '0 var(--margin-mobile)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
          maxWidth: '1440px', margin: '0 auto', width: '100%'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Mobile Menu Toggle */}
            <button className="hide-desktop btn-ghost" style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setMobileMenuOpen(true)}>
              <span className="material-symbols-outlined">menu</span>
            </button>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
              <img src={IMAGES.logo} alt="NAJMI Logo" style={{ height: 40, width: 'auto', objectFit: 'contain' }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="text-headline-md" style={{ color: 'var(--primary)', letterSpacing: '-0.02em', lineHeight: 1, textTransform: 'uppercase', fontWeight: 800 }}>NAJMI</span>
                <span className="text-label-sm" style={{ color: 'var(--tertiary)', lineHeight: 1, marginTop: 4, letterSpacing: '0.12em' }}>HARDWARE</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {desktopNavItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  textDecoration: 'none',
                  color: isActive(item.path) ? 'var(--primary)' : 'var(--on-surface-variant)',
                  fontWeight: isActive(item.path) ? 700 : 600,
                  fontSize: '14px',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  transition: 'color 0.2s',
                  position: 'relative'
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Link to="/shop" aria-label="Search" className="btn-ghost hide-mobile" style={{
              width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: 24 }}>search</span>
            </Link>

            <Link to="/rfq-basket" aria-label="Wholesale RFQ Basket" style={{
              position: 'relative', width: 44, height: 44,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--on-surface)', transition: 'color 0.15s'
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: 24 }}>request_quote</span>
              <span style={{
                position: 'absolute', top: 4, right: 4,
                minWidth: 18, height: 18, padding: '0 4px',
                borderRadius: 999, background: 'var(--tertiary)', color: '#fff',
                fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>{rfqCount}</span>
            </Link>

            <Link to="/cart" aria-label="Retail Cart" style={{
              position: 'relative', width: 44, height: 44,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--on-surface)', transition: 'color 0.15s'
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: 24 }}>shopping_cart</span>
              <span style={{
                position: 'absolute', top: 4, right: 4,
                minWidth: 18, height: 18, padding: '0 4px',
                borderRadius: 999, background: 'var(--primary)', color: '#fff',
                fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>{cartCount}</span>
            </Link>

            <Link to="/account" className="hide-mobile" style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'var(--surface-container-high)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginLeft: 8, transition: 'background 0.2s'
            }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: 22 }}>person</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="hide-desktop" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100 }} onClick={() => setMobileMenuOpen(false)}>
          <div style={{ width: '280px', height: '100%', background: 'var(--surface-bright)', padding: '24px', display: 'flex', flexDirection: 'column' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
              <span className="text-headline-md" style={{ color: 'var(--primary)', fontWeight: 800 }}>NAJMI</span>
              <button onClick={() => setMobileMenuOpen(false)}><span className="material-symbols-outlined">close</span></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {desktopNavItems.map(item => (
                <Link key={item.path} to={item.path} onClick={() => setMobileMenuOpen(false)} style={{
                  textDecoration: 'none', color: 'var(--on-surface)', fontSize: 16, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                }}>
                  {item.label}
                  {item.label === 'STAR ROPE' && <span className="badge" style={{ background: 'var(--tertiary)', color: '#fff' }}>OWN BRAND</span>}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main style={{ flexGrow: 1, paddingTop: 108, paddingBottom: 80, background: 'var(--surface)' }}>
        <div className="page-enter">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        background: 'var(--primary)',
        color: 'var(--on-primary)',
        padding: '64px var(--margin-mobile) 32px',
        marginTop: 'auto'
      }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 48 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 24 }}>
              <span className="text-headline-md" style={{ color: 'var(--secondary)', letterSpacing: '-0.02em', lineHeight: 1, textTransform: 'uppercase', fontWeight: 800 }}>NAJMI</span>
            </div>
            <p className="text-body-sm" style={{ color: 'var(--on-primary-container)', marginBottom: 24 }}>
              Kuwait's premier industrial rope manufacturer and supplier. Serving commercial, marine, and retail requirements since 1980.
            </p>
            <p className="text-body-sm" style={{ color: 'var(--on-primary-container)', marginBottom: 8 }}>{state.settings.address}</p>
            <p className="text-body-sm" style={{ color: 'var(--on-primary-container)' }}>C.R. {state.settings.crNumber}</p>
          </div>
          <div>
            <h4 className="text-label-lg" style={{ color: 'var(--pure-white)', marginBottom: 24, fontWeight: 700 }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Link to="/about" style={{ color: 'var(--on-primary-container)', textDecoration: 'none' }}>About Us</Link>
              <Link to="/manufacturing" style={{ color: 'var(--on-primary-container)', textDecoration: 'none' }}>Manufacturing</Link>
              <Link to="/brands/star-rope" style={{ color: 'var(--on-primary-container)', textDecoration: 'none' }}>STAR ROPE</Link>
              <Link to="/contact" style={{ color: 'var(--on-primary-container)', textDecoration: 'none' }}>Contact</Link>
            </div>
          </div>
          <div>
            <h4 className="text-label-lg" style={{ color: 'var(--pure-white)', marginBottom: 24, fontWeight: 700 }}>Sales</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Link to="/shop" style={{ color: 'var(--on-primary-container)', textDecoration: 'none' }}>Retail Shop</Link>
              <Link to="/wholesale" style={{ color: 'var(--on-primary-container)', textDecoration: 'none' }}>Wholesale Supply</Link>
              <Link to="/rfq-basket" style={{ color: 'var(--on-primary-container)', textDecoration: 'none' }}>Request Quotation</Link>
            </div>
          </div>
          <div>
            <h4 className="text-label-lg" style={{ color: 'var(--pure-white)', marginBottom: 24, fontWeight: 700 }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <span style={{ color: 'var(--on-primary-container)', display: 'flex', alignItems: 'center', gap: 8 }}><span className="material-symbols-outlined icon-sm">call</span> {state.settings.phone}</span>
              <span style={{ color: 'var(--on-primary-container)', display: 'flex', alignItems: 'center', gap: 8 }}><span className="material-symbols-outlined icon-sm">smartphone</span> {state.settings.mobile}</span>
              <span style={{ color: 'var(--on-primary-container)', display: 'flex', alignItems: 'center', gap: 8 }}><span className="material-symbols-outlined icon-sm">mail</span> {state.settings.email}</span>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: 1440, margin: '64px auto 0', paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <span className="text-label-sm" style={{ color: 'var(--on-primary-container)' }}>© 2025 Al-Najm Hardware Est. All rights reserved.</span>
          <Link to="/admin" className="text-label-sm" style={{
            color: 'var(--primary)', fontWeight: 700, padding: '6px 12px', borderRadius: 4,
            background: 'var(--secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4
          }}>
            <span className="material-symbols-outlined icon-sm">admin_panel_settings</span> Admin Panel
          </Link>
        </div>
      </footer>

      {/* Bottom Navigation (Mobile Only) */}
      <nav className="bottom-nav hide-desktop">
        <div style={{
          display: 'flex', justifyContent: 'space-around', alignItems: 'center',
          height: 64, padding: '0 4px', margin: '0 auto'
        }}>
          {bottomNavItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`bottom-nav-item ${isActive(item.path) ? 'active' : ''}`}
              style={{ textDecoration: 'none' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 24, marginBottom: 2 }}>{item.icon}</span>
              <span className="text-label-sm" style={{ fontSize: 10 }}>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
