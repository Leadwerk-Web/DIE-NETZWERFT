import { useRef } from 'react';
import { useSectionReveal } from '../hooks/useSectionReveal';
import { publicAsset } from '@/lib/publicAsset';

export default function CareerSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useSectionReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="section-pad"
      style={{
        width: '100%',
        backgroundColor: '#F5F0EB',
        padding: '112px 5vw',
        position: 'relative',
        zIndex: 20,
      }}
    >
      <div
        className="career-section-grid"
        style={{
          maxWidth: '1180px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 0.78fr) minmax(420px, 1fr)',
          gap: '5rem',
          alignItems: 'center',
        }}
      >
        <div data-reveal="intro">
          <div className="label-marker" style={{ marginBottom: '1.25rem' }}>
            [06] Karriere
          </div>
          <h2
            className="font-display text-dark-navy"
            style={{ fontSize: 'clamp(44px, 5vw, 72px)', lineHeight: 0.98, letterSpacing: 0, marginBottom: '1.5rem' }}
          >
            Werden Sie Teil des Teams
          </h2>
          <p style={{ fontSize: '18px', color: '#6F6761', marginBottom: '2.5rem', lineHeight: 1.6 }}>
            Wir suchen engagierte IT-Experten, die Lust haben, die digitale Transformation im Gesundheitswesen voranzutreiben.
          </p>

          <a href="#" className="btn-coral" style={{ display: 'inline-block' }}>
            Offene Stellen
          </a>
        </div>

        <div
          data-reveal="media"
          data-parallax-y="-22"
          style={{
            borderRadius: '6px',
            overflow: 'hidden',
            boxShadow: '0 18px 44px rgba(11,15,28,0.1)',
          }}
        >
          <img
            src={publicAsset('/images/team-photo.jpg')}
            alt="DIE NETZWERFT Team"
            className="career-section-image"
            style={{
              width: '100%',
              height: '100%',
              minHeight: '430px',
              display: 'block',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    </section>
  );
}
