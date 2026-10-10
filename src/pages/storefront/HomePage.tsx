import { Link } from 'react-router-dom';
import { useStore } from '../../StoreContext';
import { IMAGES } from '../../store';
import RopeFinder from '../../components/RopeFinder';
import LocationMap from '../../components/LocationMap';
import ManufacturingVideo from '../../components/ManufacturingVideo';

export default function HomePage() {
  const { state, dispatch, showToast } = useStore();

  const handleAddToCart = (productId: string, variantId: string) => {
    dispatch({ type: 'ADD_TO_CART', payload: { productId, variantId, quantity: 1 } });
    showToast('Added to Cart');
  };

  const handleAddToRfq = (productId: string, variantId: string) => {
    dispatch({ type: 'ADD_TO_RFQ', payload: { productId, variantId, quantity: 1, notes: '' } });
    showToast('Added to Quote Request', 'request_quote');
  };

  // Featured Star Rope Collection
  const starRopeProducts = state.products.filter(p => p.brand === 'STAR ROPE' && p.isActive).slice(0, 4);
  // General Retail Products
  const retailProducts = state.products.filter(p => p.isActive).slice(0, 8);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      
      {/* Section A: Premium Manufacturing Hero */}
      <section style={{ 
        position: 'relative', 
        minHeight: '80vh', 
        background: '#10233D',
        display: 'flex', 
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        {/* Placeholder for cinematic industrial image */}
        <div style={{
          position: 'absolute', inset: 0, 
          backgroundImage: `url(${IMAGES.heroRopes})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.4
        }} />
        
        <div className="container-app" style={{ position: 'relative', zIndex: 1, padding: '0 var(--margin-mobile)', width: '100%', maxWidth: '1440px', margin: '0 auto' }}>
          <div style={{ maxWidth: '720px' }}>
            <span style={{ 
              display: 'inline-block',
              background: 'var(--secondary)', 
              color: 'var(--primary)', 
              padding: '6px 16px', 
              borderRadius: 4, 
              fontWeight: 800,
              fontSize: 12,
              letterSpacing: '0.1em',
              marginBottom: 24,
              textTransform: 'uppercase'
            }}>Kuwait Rope & Cordage Specialist</span>
            
            <h1 style={{ 
              color: '#ffffff', 
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
              lineHeight: 1.1, 
              fontWeight: 800,
              letterSpacing: '-0.02em',
              marginBottom: 24
            }}>From Manufacturing to Every Industry.</h1>
            
            <p style={{ 
              color: '#D6B789', 
              fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', 
              lineHeight: 1.6, 
              maxWidth: '600px',
              marginBottom: 40
            }}>
              Discover STAR ROPE, our own rope brand, alongside a carefully sourced range of industrial and commercial rope products. Serving retail and wholesale customers across Kuwait.
            </p>
            
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/shop" className="btn btn-lg" style={{ background: 'var(--secondary)', color: 'var(--primary)' }}>
                Explore Our Products
              </Link>
              <Link to="/manufacturing" className="btn btn-lg btn-outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
                Our Manufacturing Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section B: Three Business Strengths */}
      <section style={{ padding: '80px var(--margin-mobile)', background: 'var(--surface)' }}>
        <div className="container-app" style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
            
            {/* Strength 1 */}
            <div className="card" style={{ padding: 40, background: 'var(--surface-bright)' }}>
              <div style={{ width: 48, height: 48, background: 'var(--primary-container)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--secondary)' }}>star</span>
              </div>
              <h3 className="text-headline-sm" style={{ marginBottom: 16 }}>STAR ROPE — Our Brand</h3>
              <p className="text-body-md" style={{ color: 'var(--on-surface-variant)', marginBottom: 24 }}>
                Premium branded rope products manufactured to our exacting specifications. Available across Kuwait.
              </p>
              <Link to="/brands/star-rope" className="text-label-md" style={{ color: 'var(--tertiary)', textDecoration: 'underline' }}>View Collection</Link>
            </div>

            {/* Strength 2 */}
            <div className="card" style={{ padding: 40, background: 'var(--surface-bright)' }}>
              <div style={{ width: 48, height: 48, background: 'var(--primary-container)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--secondary)' }}>factory</span>
              </div>
              <h3 className="text-headline-sm" style={{ marginBottom: 16 }}>Manufacturing in India</h3>
              <p className="text-body-md" style={{ color: 'var(--on-surface-variant)', marginBottom: 24 }}>
                Our own production facilities ensure strict quality control and reliable supply chains from raw material to finished coil.
              </p>
              <Link to="/manufacturing" className="text-label-md" style={{ color: 'var(--tertiary)', textDecoration: 'underline' }}>Explore Manufacturing</Link>
            </div>

            {/* Strength 3 */}
            <div className="card" style={{ padding: 40, background: 'var(--surface-bright)' }}>
              <div style={{ width: 48, height: 48, background: 'var(--primary-container)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--secondary)' }}>language</span>
              </div>
              <h3 className="text-headline-sm" style={{ marginBottom: 16 }}>International Sourcing</h3>
              <p className="text-body-md" style={{ color: 'var(--on-surface-variant)', marginBottom: 24 }}>
                We supplement our own production by sourcing specialized industrial ropes from trusted global partners.
              </p>
              <Link to="/about" className="text-label-md" style={{ color: 'var(--tertiary)', textDecoration: 'underline' }}>Read Our Story</Link>
            </div>

          </div>
        </div>
      </section>

      {/* Section C: STAR ROPE Featured Collection */}
      {starRopeProducts.length > 0 && (
        <section style={{ padding: '80px var(--margin-mobile)', background: 'var(--surface-container-low)' }}>
          <div className="container-app" style={{ maxWidth: 1440, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span className="text-label-md" style={{ color: 'var(--tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Premium Collection</span>
              <h2 className="text-headline-lg" style={{ marginTop: 8 }}>Meet STAR ROPE.</h2>
              <p className="text-body-md" style={{ color: 'var(--on-surface-variant)', maxWidth: 600, margin: '16px auto 0' }}>
                Our own brand of ropes, developed for a wide range of everyday and commercial requirements.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
              {starRopeProducts.map(product => {
                const defaultVariant = product.variants[0];
                return (
                  <div key={product.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                    <Link to={`/product/${product.id}`} style={{ display: 'block', padding: 24, background: '#fff', position: 'relative' }}>
                      <span className="badge" style={{ position: 'absolute', top: 16, left: 16, background: 'var(--primary)', color: 'var(--secondary)' }}>STAR ROPE</span>
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
                      <span className="text-label-sm" style={{ color: 'var(--on-surface-variant)', marginBottom: 16 }}>{product.categoryTag}</span>
                      
                      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 16 }}>
                        <span className="text-headline-sm" style={{ color: 'var(--primary)' }}>{defaultVariant.retailPrice.toFixed(3)}</span>
                        <span className="text-label-sm">KWD</span>
                        <span className="text-label-sm" style={{ color: 'var(--on-surface-variant)' }}>/ {defaultVariant.unit}</span>
                      </div>

                      <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn btn-primary" style={{ flexGrow: 1 }} onClick={() => handleAddToCart(product.id, defaultVariant.id)}>
                          Add to Cart
                        </button>
                        <button className="btn btn-outline" style={{ padding: '0 12px' }} onClick={() => handleAddToRfq(product.id, defaultVariant.id)} title="Request Bulk Quote">
                          <span className="material-symbols-outlined icon-sm">request_quote</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <Link to="/brands/star-rope" className="btn btn-lg btn-outline">Explore Full Collection</Link>
            </div>
          </div>
        </section>
      )}

      {/* Section D: Inside Our Manufacturing */}
      <section style={{ background: 'var(--primary)', color: 'var(--pure-white)', padding: '100px var(--margin-mobile)' }}>
        <div className="container-app" style={{ maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div style={{ width: '100%' }}>
            <ManufacturingVideo />
          </div>
          
          <div>
            <span className="text-label-md" style={{ color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Inside Our Plant</span>
            <h2 className="text-headline-lg" style={{ marginTop: 8, marginBottom: 24, color: '#fff' }}>Behind Every Strand.</h2>
            <p className="text-body-lg" style={{ color: 'var(--on-primary-container)', marginBottom: 40 }}>
              Explore the manufacturing journey behind our rope products. From raw material preparation to twisting, braiding, and final inspection, our facilities in India ensure uncompromising quality.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 48 }}>
              {[
                'Raw Material Preparation & Spinning',
                'Precision Twisting & Braiding',
                'Inspection & Load Testing',
                'Coiling, Packing & Dispatch'
              ].map((step, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--secondary)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                    {idx + 1}
                  </div>
                  <span className="text-body-md" style={{ fontWeight: 600 }}>{step}</span>
                </div>
              ))}
            </div>

            <Link to="/manufacturing" className="btn btn-lg" style={{ background: 'var(--secondary)', color: 'var(--primary)' }}>
              Explore Our Manufacturing
            </Link>
          </div>
        </div>
      </section>

      {/* Section E: Shop by Category */}
      <section style={{ padding: '80px var(--margin-mobile)', background: 'var(--surface)' }}>
        <div className="container-app" style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="text-headline-lg">Shop by Category</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {state.categories.map(cat => (
              <Link key={cat.id} to={`/shop/${cat.id}`} style={{ textDecoration: 'none' }}>
                <div className="card" style={{ padding: 32, textAlign: 'center', transition: 'transform 0.2s', background: 'var(--surface-bright)' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--tertiary)', marginBottom: 16 }}>{cat.icon}</span>
                  <h3 className="text-headline-sm" style={{ color: 'var(--primary)' }}>{cat.name}</h3>
                  <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)', marginTop: 8 }}>{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section F: International Sourcing */}
      <section style={{ padding: '80px var(--margin-mobile)', background: 'var(--surface-container-high)' }}>
        <div className="container-app" style={{ maxWidth: 1440, margin: '0 auto', textAlign: 'center' }}>
          <h2 className="text-headline-lg" style={{ marginBottom: 16 }}>Manufactured by Us. Sourced Worldwide.</h2>
          <p className="text-body-md" style={{ color: 'var(--on-surface-variant)', maxWidth: 600, margin: '0 auto 48px' }}>
            We leverage two supply channels to bring you the best cordage solutions: our own factory-direct STAR ROPE brand, and imported ranges from trusted international partners.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, maxWidth: 900, margin: '0 auto' }}>
            <div className="card" style={{ padding: 40, background: 'var(--primary)', color: '#fff', textAlign: 'left' }}>
              <span className="badge" style={{ background: 'var(--secondary)', color: 'var(--primary)', marginBottom: 24 }}>OWN FACTORY</span>
              <h3 className="text-headline-sm" style={{ marginBottom: 16 }}>STAR ROPE Manufacturing</h3>
              <p className="text-body-sm" style={{ color: 'var(--on-primary-container)' }}>Produced in our own facilities in India, ensuring strict quality control, custom specifications, and direct-to-market pricing for Kuwait.</p>
            </div>
            
            <div className="card" style={{ padding: 40, background: 'var(--surface-bright)', textAlign: 'left' }}>
              <span className="badge" style={{ background: 'var(--surface-dim)', color: 'var(--primary)', marginBottom: 24 }}>GLOBAL PARTNERS</span>
              <h3 className="text-headline-sm" style={{ marginBottom: 16 }}>International Imports</h3>
              <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>Specialized ropes and accessories sourced from trusted global manufacturers to complement our own product lines and fulfill niche requirements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section G: Wholesale Supply */}
      <section style={{ background: 'var(--primary-container)', padding: '80px var(--margin-mobile)' }}>
        <div className="container-app" style={{ maxWidth: 1440, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 64, color: 'var(--secondary)', marginBottom: 24 }}>inventory_2</span>
          <h2 className="text-headline-lg" style={{ color: '#fff', marginBottom: 16 }}>From a Single Roll to Bulk Supply.</h2>
          <p className="text-body-lg" style={{ color: 'var(--on-primary-container)', maxWidth: 700, marginBottom: 40 }}>
            Whether you need a few rolls for everyday work or larger quantities for commercial requirements, NAJMI makes sourcing easier.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/shop" className="btn btn-lg btn-outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>Shop Retail</Link>
            <Link to="/wholesale" className="btn btn-lg" style={{ background: 'var(--tertiary)', color: '#fff' }}>Request Wholesale Quote</Link>
          </div>
        </div>
      </section>

      {/* Section H: Featured Retail Products */}
      <section style={{ padding: '80px var(--margin-mobile)', background: 'var(--surface)' }}>
        <div className="container-app" style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
            <div>
              <h2 className="text-headline-lg">Explore All Products</h2>
              <p className="text-body-md" style={{ color: 'var(--on-surface-variant)', marginTop: 8 }}>Retail ready and available for bulk quotation.</p>
            </div>
            <Link to="/shop" className="text-label-md hide-mobile" style={{ color: 'var(--tertiary)', textDecoration: 'underline' }}>View Full Catalogue</Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
            {retailProducts.map(product => {
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
                      <span className="text-label-sm" style={{ color: 'var(--on-surface-variant)' }}>/ {defaultVariant.unit}</span>
                    </div>

                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn btn-primary" style={{ flexGrow: 1 }} onClick={() => handleAddToCart(product.id, defaultVariant.id)}>
                        Add to Cart
                      </button>
                      <button className="btn btn-outline" style={{ padding: '0 12px' }} onClick={() => handleAddToRfq(product.id, defaultVariant.id)} title="Request Bulk Quote">
                        <span className="material-symbols-outlined icon-sm">request_quote</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section I: Rope Finder */}
      <section style={{ padding: '80px var(--margin-mobile)', background: 'var(--primary)', color: '#fff' }}>
        <div className="container-app" style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--secondary)', marginBottom: 16 }}>manage_search</span>
          <h2 className="text-headline-lg">Interactive Rope Finder</h2>
          <p className="text-body-md" style={{ color: 'var(--on-primary-container)', marginTop: 8, marginBottom: 48 }}>
            Looking for something specific? Search our entire catalogue by precise specifications.
          </p>
          <RopeFinder />
        </div>
      </section>

      {/* Section J: Industries and Applications */}
      <section style={{ padding: '80px var(--margin-mobile)', background: 'var(--surface-bright)' }}>
        <div className="container-app" style={{ maxWidth: 1440, margin: '0 auto' }}>
          <h2 className="text-headline-lg" style={{ textAlign: 'center', marginBottom: 48 }}>Serving Key Industries</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {['Marine & Offshore', 'Construction', 'Logistics', 'Agriculture', 'General Industrial'].map(ind => (
              <div key={ind} className="card" style={{ padding: '40px 24px', textAlign: 'center', background: 'var(--surface-container-low)' }}>
                <span className="text-label-md" style={{ fontWeight: 800, color: 'var(--primary)' }}>{ind}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section K: Location Map */}
      <LocationMap />

    </div>
  );
}
