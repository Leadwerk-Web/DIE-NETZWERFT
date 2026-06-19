import { useRef } from 'react';
import { MapPin } from 'lucide-react';
import { useSectionReveal } from '../hooks/useSectionReveal';
import { publicAsset } from '@/lib/publicAsset';

export default function RegionalSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useSectionReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="region"
      style={{
        width: '100%',
        minHeight: '60vh',
        backgroundColor: '#0B0F1C',
        color: '#FFFFFF',
        padding: '8vh 5vw',
        position: 'relative',
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '4rem',
          width: '100%',
          flexWrap: 'wrap',
        }}
      >
        {/* Left side */}
        <div data-reveal="intro" style={{ flex: '1 1 400px', minWidth: '300px' }}>
          <p className="label-marker" style={{ marginBottom: '1.5rem', color: '#A39B94' }}>
            [05] Region
          </p>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              color: '#FFFFFF',
              marginBottom: '1.5rem',
              lineHeight: 1.0,
            }}
          >
            Ihr Partner in Karlsruhe
          </h2>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
            Vor Ort für Sie da, mit schneller Reaktionszeit und persönlichem Kontakt. Wir betreuen Praxen in Karlsruhe und der gesamten Region.
          </p>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.58)', marginBottom: '2rem', lineHeight: 1.55 }}>
            Zusätzlich erreichbar in Speyer, Hafenstr. 39, 67346 Speyer.
          </p>
          <a href="#" className="btn-bordered-light">
            Standorte ansehen
          </a>
        </div>

        {/* Right side - Map */}
        <div
          data-reveal="media"
          data-parallax-y="-18"
          style={{
            flex: '1 1 400px',
            minWidth: '300px',
            position: 'relative',
            borderRadius: '6px',
            overflow: 'hidden',
          }}
        >
          <img
            src={publicAsset('/images/karlsruhe-map.jpg')}
            alt="Karlsruhe Region"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: '6px',
            }}
          />
          {/* Pulsing location dot */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: '#E07452',
                position: 'relative',
              }}
              className="pulse-location"
            >
              <MapPin
                size={12}
                color="#FFFFFF"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
