import { useRef } from 'react';
import { Headphones, MapPin, MonitorDown } from 'lucide-react';
import { useSectionReveal } from '../hooks/useSectionReveal';

const supportItems = [
  {
    icon: Headphones,
    label: 'Hotline',
    value: '07243 350 600',
    href: 'tel:+497243350600',
  },
  {
    icon: MonitorDown,
    label: 'Fernwartung',
    value: 'TeamViewer starten',
    href: 'https://quick.dienetzwerft.de',
  },
  {
    icon: MapPin,
    label: 'Neu in Speyer',
    value: 'Hafenstr. 39, 67346 Speyer',
    href: '#region',
  },
];

export default function SupportBand() {
  const sectionRef = useRef<HTMLElement>(null);

  useSectionReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      style={{
        width: '100%',
        backgroundColor: '#0B0F1C',
        color: '#FFFFFF',
        padding: '34px 5vw',
        position: 'relative',
        zIndex: 20,
      }}
    >
      <div
        className="support-band-grid"
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 0.9fr) repeat(3, minmax(0, 1fr))',
          gap: '24px',
          alignItems: 'center',
        }}
      >
        <div data-reveal="intro">
          <p className="label-marker" style={{ color: '#A39B94', marginBottom: '0.35rem' }}>
            Direkt erreichbar
          </p>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.78)', lineHeight: 1.45 }}>
            Support, Fernwartung und Standortinformationen ohne Umwege.
          </p>
        </div>

        {supportItems.map((item) => (
          <a
            key={item.label}
            data-reveal="item"
            className="support-band-link"
            href={item.href}
            style={{
              color: '#FFFFFF',
              textDecoration: 'none',
              display: 'grid',
              gridTemplateColumns: '44px minmax(0, 1fr)',
              gap: '14px',
              alignItems: 'center',
              minHeight: '70px',
              borderLeft: '1px solid rgba(255,255,255,0.12)',
              paddingLeft: '22px',
            }}
          >
            <span
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.16)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-brand-soft)',
              }}
            >
              <item.icon size={21} strokeWidth={1.7} />
            </span>
            <span>
              <span className="font-mono" style={{ display: 'block', color: '#A39B94', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {item.label}
              </span>
              <span style={{ display: 'block', fontSize: '18px', lineHeight: 1.25 }}>{item.value}</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
