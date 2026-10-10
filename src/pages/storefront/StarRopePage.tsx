import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../StoreContext';
import { useState } from 'react';

export default function StarRopePage() {
  const { state, dispatch, showToast } = useStore();
  const navigate = useNavigate();
  
  // Filter only STAR ROPE products
  const starRopeProducts = state.products.filter(p => p.brand === 'STAR ROPE' && p.isActive);

  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const handleAddToCart = (productId: string, variantId: string) => {
    dispatch({ type: 'ADD_TO_CART', payload: { productId, variantId, quantity: 1 } });
    showToast('Added to Cart');
  };

  const handleAddToRfq = (productId: string, variantId: string) => {
    dispatch({ type: 'ADD_TO_RFQ', payload: { productId, variantId, quantity: 1, notes: '' } });
    showToast('Added to Quote Request', 'request_quote');
  };

  const handleCategoryClick = (filter: { material?: string; construction?: string; application?: string }) => {
    const params = new URLSearchParams({ brand: 'STAR ROPE' });
    if (filter.material) params.set('material', filter.material);
    if (filter.construction) params.set('construction', filter.construction);
    if (filter.application) params.set('application', filter.application);
    navigate(`/shop?${params.toString()}`);
  };

  const categories = [
    { name: 'Twisted Nylon Ropes', desc: 'High strength, durable and weather resistant. Ideal for general and industrial use.', img: '/images/products/rope_photo_001.png', filter: { material: 'Nylon', construction: 'twisted' } },
    { name: 'Polypropylene Ropes', desc: 'Lightweight, high strength and cost-effective. Widely used for packaging, agriculture and multipurpose.', img: '/images/products/rope_photo_008.png', filter: { material: 'Polypropylene' } },
    { name: 'HDPE Ropes', desc: 'Excellent chemical resistance and durability. Suitable for marine, fishing and outdoor use.', img: '/images/products/rope_photo_022.png', filter: { material: 'HDPE' } },
    { name: 'Polyester Braided Ropes', desc: 'Superior strength, low stretch and high abrasion resistance. Perfect for heavy-duty applications.', img: '/images/products/rope_photo_029.png', filter: { material: 'Polyester', construction: 'braided' } },
    { name: 'Cotton Sash Cord', desc: 'Soft, flexible and eco-friendly. Ideal for household, craft and general purpose use.', img: '/images/products/rope_photo_015.png', filter: { material: 'Cotton' } },
    { name: 'Marine Ropes', desc: 'Built for harsh marine environments. High strength, UV resistant and long lasting.', img: '/images/products/rope_photo_020.png', filter: { application: 'marine' } },
  ];

  const packagingImages = [
    '/images/products/rope_photo_002.png',
    '/images/products/rope_photo_010.png',
    '/images/products/rope_photo_018.png',
    '/images/products/rope_photo_024.png',
    '/images/products/rope_photo_030.png'
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      
      {/* SECTION 2 - PREMIUM HERO */}
      <section style={{ 
        position: 'relative', 
        background: 'linear-gradient(135deg, #e31837 0%, #e31837 55%, #0b3d91 55%, #0b3d91 100%)',
        color: '#fff',
        padding: '80px var(--margin-mobile)',
        overflow: 'hidden'
      }}>
        {/* Yellow Stars Accent (CSS representation) */}
        <div style={{ position: 'absolute', top: 40, left: 40, color: '#fddb00', fontSize: 48 }}>★</div>
        <div style={{ position: 'absolute', top: 80, left: 100, color: '#fddb00', fontSize: 32 }}>★</div>
        <div style={{ position: 'absolute', top: 20, left: 140, color: '#fddb00', fontSize: 24 }}>★</div>

        <div className="container-app" style={{ maxWidth: 1440, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 48 }}>
          
          <div style={{ flex: '1 1 500px', zIndex: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <h1 style={{ fontSize: '5rem', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.02em', color: '#fddb00' }}>Star</h1>
              <div style={{ background: '#fff', color: '#e31837', padding: '8px 16px', borderRadius: 8, fontSize: '3rem', fontWeight: 900, lineHeight: 1 }}>ROPE</div>
            </div>
            
            <h2 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 24 }}>
              Manufactured for Strength.
            </h2>
            
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6, marginBottom: 32, maxWidth: 500 }}>
              Explore our own-brand rope collection, available in multiple materials, diameters, colours and roll lengths for retail and wholesale customers in Kuwait.
            </p>
            
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <button onClick={() => {
                const el = document.getElementById('collection');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }} className="btn" style={{ background: '#fddb00', color: '#e31837', fontWeight: 800, padding: '16px 24px', border: 'none' }}>
                Explore STAR ROPE Products
              </button>
              <Link to="/shop?brand=STAR+ROPE" className="btn" style={{ background: '#fff', color: '#0b3d91', fontWeight: 700, padding: '16px 24px', border: 'none', textDecoration: 'none' }}>
                Shop All STAR ROPE
              </Link>
            </div>
          </div>
          
          <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
            <img 
              src="/images/products/rope_photo_010.png" 
              alt="Star Rope Coils" 
              style={{ width: '100%', maxWidth: 500, objectFit: 'contain', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.3))' }} 
            />
          </div>
          
        </div>

        {/* SECTION 3 - BRAND STRENGTHS */}
        <div className="container-app" style={{ maxWidth: 1440, margin: '64px auto 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 12 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 40 }}>verified</span>
            <h4 style={{ fontWeight: 700 }}>Reliable Quality</h4>
            <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>Tested for durability and everyday use.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 12 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 40 }}>category</span>
            <h4 style={{ fontWeight: 700 }}>Wide Range</h4>
            <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>Multiple materials and specifications.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 12 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 40 }}>factory</span>
            <h4 style={{ fontWeight: 700 }}>Own Manufacturing</h4>
            <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>Controlled production in India.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 12 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 40 }}>local_shipping</span>
            <h4 style={{ fontWeight: 700 }}>Retail & Wholesale</h4>
            <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>Supplying all scale of demands.</p>
          </div>
        </div>
      </section>

      {/* SECTION 4 - OUR MANUFACTURING STORY */}
      <section style={{ padding: '80px var(--margin-mobile)', background: '#fff' }}>
        <div className="container-app" style={{ maxWidth: 1440, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'center' }}>
          <div style={{ flex: '1 1 500px' }}>
            <span style={{ color: '#e31837', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Our Story</span>
            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0b3d91', marginBottom: 24, lineHeight: 1.1 }}>Behind Every Strand.</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--on-surface-variant)', lineHeight: 1.8, marginBottom: 24 }}>
              Star Rope is a professional rope brand produced by NAJMI Hardware to serve the unique demands of the Kuwaiti market. By controlling the manufacturing process in our dedicated Indian facilities, we ensure consistent quality, reliable supply, and a strong brand that customers trust.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ background: '#e31837', color: '#fff', width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined">precision_manufacturing</span>
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, color: '#0b3d91' }}>Modern Manufacturing</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--on-surface-variant)' }}>Advanced production lines for consistent quality.</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ background: '#e31837', color: '#fff', width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined">rule</span>
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, color: '#0b3d91' }}>Strict Quality Control</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--on-surface-variant)' }}>Every coil inspected before shipping.</p>
                </div>
              </div>
            </div>
            <Link to="/manufacturing" className="btn" style={{ background: '#e31837', color: '#fff', padding: '12px 24px', textDecoration: 'none', fontWeight: 700 }}>
              Explore Our Manufacturing →
            </Link>
          </div>
          <div style={{ flex: '1 1 500px', position: 'relative' }}>
            {/* Diagonal design element */}
            <div style={{ position: 'absolute', top: -20, right: -20, width: '100%', height: '100%', background: '#0b3d91', zIndex: 0, clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
            <img 
              src="/images/products/rope_photo_015.png" 
              alt="Manufacturing Demonstration" 
              style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', position: 'relative', zIndex: 1, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} 
            />
            <div style={{ position: 'absolute', bottom: 20, right: 20, background: 'rgba(255,255,255,0.9)', padding: '4px 8px', borderRadius: 4, fontSize: '0.7rem', zIndex: 2, fontWeight: 700 }}>DEMONSTRATION IMAGE</div>
          </div>
        </div>
      </section>

      {/* SECTION 5 - MULTIPLE ROPE TYPES */}
      <section style={{ padding: '80px var(--margin-mobile)', background: 'var(--surface-container-low)' }}>
        <div className="container-app" style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 24 }}>
            <div>
              <span style={{ color: '#e31837', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Our Products</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0b3d91' }}>Multiple Rope Types</h2>
              <p style={{ color: 'var(--on-surface-variant)', marginTop: 8 }}>We manufacture a wide range of ropes to meet diverse needs.</p>
            </div>
            <Link to="/shop?brand=STAR+ROPE" className="btn" style={{ background: '#e31837', color: '#fff', padding: '10px 20px', textDecoration: 'none', fontWeight: 700 }}>
              View All Products →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
            {categories.map((cat, idx) => (
              <div 
                key={idx} 
                className="card" 
                style={{ background: '#fff', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                onClick={() => handleCategoryClick(cat.filter)}
                onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ height: 200, overflow: 'hidden' }}>
                  <img src={cat.img} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ background: '#0b3d91', color: '#fff', padding: '12px 16px' }}>
                  <h3 style={{ fontWeight: 700, fontSize: '1.1rem' }}>{cat.name}</h3>
                </div>
                <div style={{ padding: 16 }}>
                  <p style={{ fontSize: '0.9rem', color: 'var(--on-surface-variant)', lineHeight: 1.5 }}>
                    {cat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 - STAR ROPE PRODUCT COLLECTION */}
      <section id="collection" style={{ padding: '80px var(--margin-mobile)', background: '#fff' }}>
        <div className="container-app" style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div style={{ marginBottom: 48, textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0b3d91' }}>The Collection</h2>
            <p style={{ color: 'var(--on-surface-variant)', marginTop: 8 }}>Retail ready and available for bulk quotation.</p>
          </div>

          {starRopeProducts.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
              {starRopeProducts.map(product => {
                const defaultVariant = product.variants[0];
                return (
                  <div key={product.id} className="card" style={{ display: 'flex', flexDirection: 'column', border: '1px solid var(--outline-variant)' }}>
                    <Link to={`/product/${product.id}`} style={{ display: 'block', padding: 24, background: '#fff', position: 'relative' }}>
                      <span className="badge" style={{ position: 'absolute', top: 16, left: 16, background: '#e31837', color: '#fff', fontWeight: 700 }}>STAR ROPE</span>
                      {product.images[0] ? (
                        <img src={product.images[0]} alt={product.name} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'contain' }} />
                      ) : (
                        <div style={{ width: '100%', aspectRatio: '1/1', background: 'var(--surface-container-low)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--outline)' }}>image</span>
                        </div>
                      )}
                    </Link>
                    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', flexGrow: 1, borderTop: '1px solid var(--outline-variant)' }}>
                      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: '#0b3d91' }}>
                        <h3 className="text-label-md truncate-2" style={{ marginBottom: 8, height: 36, fontWeight: 700 }}>{product.name}</h3>
                      </Link>
                      
                      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 16, paddingTop: 16 }}>
                        <span className="text-headline-sm" style={{ color: '#e31837', fontWeight: 800 }}>{defaultVariant.retailPrice.toFixed(3)}</span>
                        <span className="text-label-sm" style={{ fontWeight: 700 }}>KWD</span>
                        <span className="text-label-sm" style={{ color: 'var(--on-surface-variant)' }}>/ {defaultVariant.unit}</span>
                      </div>

                      <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn" style={{ flexGrow: 1, background: '#0b3d91', color: '#fff' }} onClick={() => handleAddToCart(product.id, defaultVariant.id)}>
                          Add to Cart
                        </button>
                        <button className="btn btn-outline" style={{ padding: '0 12px', color: '#e31837', borderColor: '#e31837' }} onClick={() => handleAddToRfq(product.id, defaultVariant.id)} title="Request Bulk Quote">
                          <span className="material-symbols-outlined icon-sm">request_quote</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ padding: 48, textAlign: 'center', background: 'var(--surface-bright)', borderRadius: 12 }}>
              <p className="text-body-md" style={{ color: 'var(--on-surface-variant)' }}>No STAR ROPE products found. Ensure products are assigned to this brand in the admin panel.</p>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 7 - PACKAGING SHOWCASE */}
      <section style={{ padding: '80px var(--margin-mobile)', background: 'var(--surface-container-low)' }}>
        <div className="container-app" style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ color: '#e31837', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Our Packaging</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0b3d91' }}>Star Rope Brand Packaging</h2>
            <p style={{ color: 'var(--on-surface-variant)', marginTop: 8, maxWidth: 600, margin: '8px auto 0' }}>
              Attractive and durable packaging with the Star Rope label, ensuring brand recognition and product trust in every market.
            </p>
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
            {packagingImages.map((img, i) => (
              <div 
                key={i}
                style={{ width: 200, height: 200, background: '#fff', padding: 16, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', cursor: 'pointer' }}
                onClick={() => setLightboxImage(img)}
              >
                <img src={img} style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt="Packaging" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 - CTA */}
      <section style={{ padding: '80px var(--margin-mobile)', background: '#0b3d91', color: '#fff', textAlign: 'center' }}>
        <div className="container-app" style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 24, color: '#fddb00', lineHeight: 1.3 }}>
            STAR ROPE — From a Single Roll to Bulk Supply.
          </h2>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: 40, lineHeight: 1.6 }}>
            Whether you need a few coils for a project or a container for distribution, Najmi Hardware has you covered.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/shop?brand=STAR+ROPE" className="btn" style={{ background: '#e31837', color: '#fff', padding: '16px 32px', fontSize: '1.1rem', fontWeight: 700, border: 'none', textDecoration: 'none' }}>
              Shop Retail
            </Link>
            <Link to="/wholesale" className="btn" style={{ background: '#fff', color: '#0b3d91', padding: '16px 32px', fontSize: '1.1rem', fontWeight: 700, border: 'none', textDecoration: 'none' }}>
              Request Wholesale Quote
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 9 - CONTACT */}
      <section style={{ padding: '60px var(--margin-mobile)', background: '#fff', textAlign: 'center' }}>
        <div className="container-app" style={{ maxWidth: 800, margin: '0 auto' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0b3d91', marginBottom: 16 }}>Need Assistance?</h3>
          <p style={{ color: 'var(--on-surface-variant)', marginBottom: 24 }}>Our sales team is ready to help with technical specifications and bulk pricing.</p>
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:+96512345678" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#e31837', textDecoration: 'none', fontWeight: 600 }}>
              <span className="material-symbols-outlined">call</span> +965 1234 5678
            </a>
            <a href="mailto:sales@najmihardware.com" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#e31837', textDecoration: 'none', fontWeight: 600 }}>
              <span className="material-symbols-outlined">email</span> sales@najmihardware.com
            </a>
            <Link to="/contact" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#e31837', textDecoration: 'none', fontWeight: 600 }}>
              <span className="material-symbols-outlined">location_on</span> Visit Us
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}
          onClick={() => setLightboxImage(null)}
        >
          <div style={{ position: 'relative', background: '#fff', padding: 24, borderRadius: 12, maxWidth: 800, width: '100%' }} onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setLightboxImage(null)}
              style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--on-surface-variant)' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 32 }}>close</span>
            </button>
            <h3 style={{ marginBottom: 16, color: '#0b3d91', fontWeight: 700 }}>Packaging Preview</h3>
            <p style={{ marginBottom: 24, color: 'var(--on-surface-variant)' }}>Informational packaging demonstration. Product not directly purchasable from this view.</p>
            <img src={lightboxImage} alt="Packaging Preview" style={{ width: '100%', height: 'auto', maxHeight: '60vh', objectFit: 'contain' }} />
          </div>
        </div>
      )}

    </div>
  );
}
