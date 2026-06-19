import { useRef } from 'react';
import { Linkedin } from 'lucide-react';
import { useSectionReveal } from '../hooks/useSectionReveal';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useSectionReveal(footerRef);

  return (
    <footer
      ref={footerRef}
      className="site-footer"
      style={{
        width: '100%',
        backgroundColor: '#0B0F1C',
        padding: '80px 5vw 40px',
        position: 'relative',
        zIndex: 20,
      }}
    >
      <div
        className="footer-grid"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
        }}
      >
        {/* Column 1 */}
        <div data-reveal="item">
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            DIE NETZWERFT
          </p>
          <p className="font-accent" style={{ fontSize: '16px', color: '#A39B94', marginBottom: '1.5rem' }}>
            Medizinische IT-Systeme
          </p>
          <p style={{ fontSize: '14px', color: '#A39B94', lineHeight: 1.6 }}>
            Murgblick 4<br />
            76534 Baden-Baden<br />
            Hafenstr. 39<br />
            67346 Speyer
          </p>
        </div>

        {/* Column 2 */}
        <div data-reveal="item">
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem' }}>
            Leistungen
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {['T2Med', 'Praxis-IT', 'Telefonie', 'Sicherheit', 'Cloud'].map((item) => (
              <li key={item} style={{ marginBottom: '0.75rem' }}>
                <a
                  href="#"
                  style={{ fontSize: '14px', color: '#A39B94', textDecoration: 'none', transition: 'color 0.3s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#FFFFFF'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#A39B94'; }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 */}
        <div data-reveal="item">
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem' }}>
            Kontakt
          </p>
          <p style={{ fontSize: '14px', color: '#A39B94', marginBottom: '0.5rem' }}>
            Hotline: 07243 350 600
          </p>
          <p style={{ fontSize: '14px', color: '#A39B94', marginBottom: '1.5rem' }}>
            support@dienetzwerft.de
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a
              href="#"
              style={{ color: '#A39B94', transition: 'color 0.3s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#FFFFFF'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#A39B94'; }}
            >
              <Linkedin size={20} />
            </a>
            <a
              href="#"
              style={{ color: '#A39B94', transition: 'color 0.3s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#FFFFFF'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#A39B94'; }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.6 1H5.4C4.6 1 4 1.6 4 2.4v18.2c0 .8.6 1.4 1.4 1.4h13.2c.8 0 1.4-.6 1.4-1.4V2.4C20 1.6 19.4 1 18.6 1zM7.8 19.2H5.4V9.3h2.4v9.9zm-1.2-11.3c-.8 0-1.4-.6-1.4-1.4 0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4 0 .8-.6 1.4-1.4 1.4zm12.6 11.3h-2.4v-4.8c0-1.1 0-2.6-1.6-2.6s-1.8 1.2-1.8 2.5v4.9h-2.4V9.3h2.3v1.4h0c.3-.6 1.1-1.3 2.3-1.3 2.5 0 2.9 1.6 2.9 3.7v6.1z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        data-reveal="intro"
        className="footer-bottom"
        style={{
          maxWidth: '1200px',
          margin: '60px auto 0',
          paddingTop: '24px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <p className="font-mono" style={{ fontSize: '12px', color: '#A39B94' }}>
          &copy; 2025 Die Netzwerft
        </p>
        <p className="font-mono" style={{ fontSize: '12px', color: '#A39B94' }}>
          <a href="#" style={{ color: '#A39B94', textDecoration: 'none', transition: 'color 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#FFFFFF'; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#A39B94'; }}>Impressum</a>
          {' · '}
          <a href="#" style={{ color: '#A39B94', textDecoration: 'none', transition: 'color 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#FFFFFF'; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#A39B94'; }}>Datenschutz</a>
        </p>
      </div>
    </footer>
  );
}
