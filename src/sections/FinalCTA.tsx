import { useRef } from 'react';
import { useSectionReveal } from '../hooks/useSectionReveal';

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useSectionReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      style={{
        width: '100%',
        minHeight: '50vh',
        backgroundColor: '#E07452',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8vh 5vw',
        position: 'relative',
        zIndex: 20,
        textAlign: 'center',
      }}
    >
      <h2
        data-reveal="intro"
        className="font-display"
        style={{
          fontSize: 'clamp(36px, 5vw, 64px)',
          color: '#FFFFFF',
          marginBottom: '1rem',
          lineHeight: 1.0,
        }}
      >
        Bereit für die nächste Stufe?
      </h2>
      <p data-reveal="intro" style={{ fontSize: '18px', color: 'rgba(255,255,255,0.85)', marginBottom: '2.5rem' }}>
        Lassen Sie uns gemeinsam Ihre IT-Strategie entwickeln.
      </p>

      <a
        data-reveal="item"
        href="#"
        style={{
          backgroundColor: '#FFFFFF',
          color: '#E07452',
          borderRadius: '6px',
          padding: '16px 40px',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400,
          fontSize: '18px',
          textDecoration: 'none',
          display: 'inline-block',
          transition: 'background-color 0.3s ease, color 0.3s ease',
          marginBottom: '1rem',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#0B0F1C';
          e.currentTarget.style.color = '#FFFFFF';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#FFFFFF';
          e.currentTarget.style.color = '#E07452';
        }}
      >
        Kostenloses Erstgespräch
      </a>

      <p data-reveal="item" className="font-mono" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.04em' }}>
        Antwort innerhalb von 24 Stunden
      </p>
    </section>
  );
}
