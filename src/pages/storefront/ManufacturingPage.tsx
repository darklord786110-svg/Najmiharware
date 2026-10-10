import { Link } from 'react-router-dom';
import { IMAGES } from '../../store';
import ManufacturingVideo from '../../components/ManufacturingVideo';

export default function ManufacturingPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '60vh', background: 'var(--primary)', display: 'flex', alignItems: 'center' }}>
        <div style={{
          position: 'absolute', inset: 0, 
          backgroundImage: `url(${IMAGES.warehouse})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3
        }} />
        <div className="container-app" style={{ position: 'relative', zIndex: 1, padding: '80px var(--margin-mobile)', textAlign: 'center', width: '100%', maxWidth: 900, margin: '0 auto' }}>
          <h1 className="text-display-xl-mobile" style={{ color: '#fff', marginBottom: 24 }}>Our Manufacturing Plant</h1>
          <p className="text-body-lg" style={{ color: 'var(--secondary)' }}>
            Located in India, our dedicated manufacturing facilities allow NAJMI Hardware to produce premium rope and cordage under our own STAR ROPE brand, ensuring strict quality control from raw material to finished coil.
          </p>
        </div>
      </section>

      {/* Storytelling */}
      <section style={{ padding: '80px var(--margin-mobile)', background: 'var(--surface-bright)' }}>
        <div className="container-app" style={{ maxWidth: 1000, margin: '0 auto' }}>
          
          <div style={{ marginBottom: 80 }}>
            <ManufacturingVideo />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
            {/* Step 1 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'center' }}>
              <div>
                <span className="badge" style={{ background: 'var(--primary-container)', color: 'var(--pure-white)', marginBottom: 16 }}>STAGE 1</span>
                <h2 className="text-headline-md" style={{ marginBottom: 16 }}>Raw Material Preparation</h2>
                <p className="text-body-md" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8 }}>
                  Our process begins with the careful selection and preparation of raw materials. Whether working with high-tenacity synthetic fibers or natural materials, we ensure the base components meet our rigorous strength and durability specifications before spinning begins.
                </p>
              </div>
              <div style={{ background: 'var(--surface-container-low)', aspectRatio: '4/3', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--outline)' }}>precision_manufacturing</span>
              </div>
            </div>

            {/* Step 2 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'center' }}>
              <div style={{ background: 'var(--surface-container-low)', aspectRatio: '4/3', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--outline)' }}>all_inclusive</span>
              </div>
              <div style={{ order: -1 }}>
                <span className="badge" style={{ background: 'var(--primary-container)', color: 'var(--pure-white)', marginBottom: 16 }}>STAGE 2</span>
                <h2 className="text-headline-md" style={{ marginBottom: 16 }}>Precision Twisting & Braiding</h2>
                <p className="text-body-md" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8 }}>
                  Using advanced industrial machinery, the prepared yarns are twisted into strands and then laid into the final rope structure. For our braided products, complex carrier systems weave the strands into a smooth, high-strength finish designed to prevent snagging.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'center' }}>
              <div>
                <span className="badge" style={{ background: 'var(--primary-container)', color: 'var(--pure-white)', marginBottom: 16 }}>STAGE 3</span>
                <h2 className="text-headline-md" style={{ marginBottom: 16 }}>Inspection & Winding</h2>
                <p className="text-body-md" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8 }}>
                  Every production run undergoes thorough inspection. The finished rope is then wound onto industrial spools or bound into coils, ensuring it remains tangle-free and ready for immediate deployment on site or in the workshop.
                </p>
              </div>
              <div style={{ background: 'var(--surface-container-low)', aspectRatio: '4/3', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--outline)' }}>inventory_2</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px var(--margin-mobile)', background: 'var(--surface-container-low)', textAlign: 'center' }}>
        <div className="container-app" style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 className="text-headline-md" style={{ marginBottom: 24 }}>Experience the Difference</h2>
          <p className="text-body-md" style={{ color: 'var(--on-surface-variant)', marginBottom: 32 }}>
            Explore our range of STAR ROPE products, manufactured with precision and built to perform.
          </p>
          <Link to="/brands/star-rope" className="btn btn-lg btn-primary">Shop STAR ROPE</Link>
        </div>
      </section>

    </div>
  );
}
