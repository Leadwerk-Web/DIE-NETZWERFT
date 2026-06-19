import { useRef } from 'react';
import { Shield, Lock, FileCheck } from 'lucide-react';
import { useSectionReveal } from '../hooks/useSectionReveal';

const badges = [
  {
    icon: FileCheck,
    label: 'KBV Zertifiziert',
    sublabel: 'nach § 75b SGB V',
  },
  {
    icon: Shield,
    label: 'DSGVO Konform',
    sublabel: 'Datenschutz',
  },
  {
    icon: Lock,
    label: 'ISO 27001',
    sublabel: 'Informationssicherheit',
  },
];

export default function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useSectionReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      style={{
        width: '100%',
        backgroundColor: '#FFFFFF',
        padding: '8vh 5vw',
        position: 'relative',
        zIndex: 20,
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <div data-reveal="intro">
          <h2
            className="font-display text-dark-navy"
            style={{ fontSize: '36px', marginBottom: '1rem' }}
          >
            Zertifiziert &amp; Sicher
          </h2>
          <p style={{ fontSize: '18px', color: '#A39B94', marginBottom: '4rem' }}>
            Wir erfüllen höchste Standards für den Umgang mit Patientendaten.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '3rem',
            flexWrap: 'wrap',
            marginBottom: '4rem',
          }}
        >
          {badges.map((badge, i) => (
            <div key={i} data-reveal="item" style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#ECECEC',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                }}
              >
                <badge.icon size={28} color="#0B0F1C" strokeWidth={1.5} />
              </div>
              <p className="font-mono" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0B0F1C' }}>
                {badge.label}
              </p>
              <p style={{ fontSize: '13px', color: '#A39B94', marginTop: '4px' }}>
                {badge.sublabel}
              </p>
            </div>
          ))}
        </div>

        <a href="#" className="btn-primary" data-reveal="item">
          Mehr über Sicherheit
        </a>
      </div>
    </section>
  );
}
