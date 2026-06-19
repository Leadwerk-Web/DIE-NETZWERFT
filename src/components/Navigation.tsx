import { useState, useEffect } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className="site-header"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
        padding: '1rem 5vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'background-color 0.4s ease, backdrop-filter 0.4s ease',
        backgroundColor: scrolled ? 'rgba(245, 240, 235, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      {/* Logo */}
      <a
        href="#hero"
        aria-label="DIE NETZWERFT Startseite"
        style={{
          textDecoration: 'none',
          color: '#0B0F1C',
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '18px',
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: '0.04em',
          }}
        >
          DIE NETZWERFT
        </span>
        <span className="font-mono" style={{ color: '#A39B94', fontSize: '10px', letterSpacing: '0.08em' }}>
          MEDIZINISCHE IT
        </span>
      </a>

      {/* CTA */}
      <a href="#" className="btn-primary" style={{ fontSize: '14px', padding: '10px 20px' }}>
        Termin vereinbaren
      </a>
    </header>
  );
}
