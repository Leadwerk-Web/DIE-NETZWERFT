import { useRef } from 'react';
import { partnerLogos } from '../data/legacyHomepage';
import { useSectionReveal } from '../hooks/useSectionReveal';

const marqueeLogos = [...partnerLogos, ...partnerLogos];

export default function PartnerSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useSectionReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="partner"
      className="section-pad partner-section"
      style={{
        width: '100%',
        backgroundColor: '#F5F0EB',
        padding: '108px 0 118px',
        position: 'relative',
        zIndex: 20,
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 5vw' }}>
        <div className="label-marker" style={{ marginBottom: '1.25rem' }}>
          [04] Partner
        </div>

        <div
          data-reveal="intro"
          className="partner-section-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 0.86fr) minmax(0, 1.14fr)',
            gap: '4rem',
            alignItems: 'end',
            marginBottom: '3.25rem',
          }}
        >
          <h2 className="font-display text-dark-navy" style={{ fontSize: 'clamp(46px, 5.4vw, 78px)', lineHeight: 0.96, letterSpacing: 0 }}>
            Mit an Bord
          </h2>
          <p style={{ color: '#6F6761', fontSize: '18px', lineHeight: 1.55, maxWidth: '560px', marginLeft: 'auto' }}>
            Ein starkes Netzwerk aus Software-, Hardware-, Telefonie- und Medizintechnikpartnern, damit Projekte sauber zusammenspielen.
          </p>
        </div>
      </div>

      <div className="partner-marquee" aria-label="Partnerlogos" data-reveal="media">
        <div className="partner-marquee-track">
          {marqueeLogos.map((partner, index) => {
            const logo = (
              <img
                src={partner.image}
                alt={`${partner.title} Partner`}
                loading={index < partnerLogos.length ? 'eager' : 'lazy'}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  filter: 'saturate(0.9)',
                }}
              />
            );

            return partner.href ? (
              <a
                key={`${partner.image}-${index}`}
                className="partner-marquee-item"
                href={partner.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${partner.title} Partner öffnen`}
              >
                {logo}
              </a>
            ) : (
              <div key={`${partner.image}-${index}`} className="partner-marquee-item">
                {logo}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
