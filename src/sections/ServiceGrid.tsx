import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { publicAsset } from '@/lib/publicAsset';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'T2Med Software',
    description: 'Einrichtung, Migration und laufende Betreuung für Praxissoftware.',
    image: publicAsset('/images/service-t2med.jpg'),
    accent: true,
  },
  {
    title: 'Praxis-IT',
    description: 'Arbeitsplätze, Server, Netzwerk und Wartung aus einer Hand.',
    image: publicAsset('/images/service-praxis-it.jpg'),
    accent: false,
  },
  {
    title: 'Telefonie',
    description: 'Moderne Kommunikation für Empfang, Team und Sprechzimmer.',
    image: publicAsset('/images/service-telefonie.jpg'),
    accent: false,
  },
  {
    title: 'Sicherheit',
    description: 'Schutzkonzepte, Rechteverwaltung und sichere Patientendaten.',
    image: publicAsset('/images/service-sicherheit.jpg'),
    accent: false,
  },
  {
    title: 'Cloud & Backup',
    description: 'Ausfallsichere Datensicherung und skalierbare Infrastruktur.',
    image: publicAsset('/images/service-cloud.jpg'),
    accent: false,
  },
  {
    title: 'Digitalisierung',
    description: 'Praxisprozesse, Geräte und Schnittstellen sauber verbunden.',
    image: publicAsset('/images/service-digital.jpg'),
    accent: false,
  },
];

export default function ServiceGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        introRef.current,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
          },
        }
      );

      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 52, scale: 0.985 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: 'power3.out',
          stagger: { amount: 0.35, from: 'start' },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 56%',
          },
        }
      );

      cardsRef.current.forEach((card) => {
        const image = card.querySelector('img');
        if (!image) return;

        gsap.fromTo(
          image,
          { scale: 1.06 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        width: '100%',
        backgroundColor: '#F5F0EB',
        padding: 'clamp(96px, 10vh, 132px) 5vw',
        position: 'relative',
        zIndex: 20,
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        <div className="label-marker" style={{ marginBottom: '1.25rem' }}>
          [01] Leistungen
        </div>

        <div ref={introRef} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '3rem', marginBottom: '3rem' }}>
          <h2
            className="font-display text-dark-navy"
            style={{ fontSize: 'clamp(48px, 6vw, 84px)', lineHeight: 0.95, letterSpacing: 0, maxWidth: '760px' }}
          >
            IT-Lösungen für den Praxisalltag
          </h2>
          <p style={{ color: '#6F6761', fontSize: '18px', lineHeight: 1.55, maxWidth: '360px', marginBottom: '0.5rem' }}>
            Von Software bis Sicherheit: abgestimmte Systeme, die im laufenden Betrieb funktionieren.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '22px',
            width: '100%',
          }}
        >
          {services.map((service, index) => (
            <article
              key={service.title}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              style={{
                minHeight: '382px',
                background: service.accent ? '#E07452' : '#FFFFFF',
                color: service.accent ? '#FFFFFF' : '#0B0F1C',
                borderRadius: '6px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 10px 34px rgba(11,15,28,0.08)',
              }}
            >
              <div
                style={{
                  width: '100%',
                  aspectRatio: '16/10',
                  overflow: 'hidden',
                  backgroundColor: service.accent ? 'rgba(255,255,255,0.14)' : '#ECECEC',
                }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>

              <div style={{ padding: '26px 28px 30px', display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 }}>
                <h3 className="font-display" style={{ fontSize: '30px', lineHeight: 1, letterSpacing: 0 }}>
                  {service.title}
                </h3>
                <p style={{ color: service.accent ? 'rgba(255,255,255,0.82)' : '#6F6761', fontSize: '15px', lineHeight: 1.55 }}>
                  {service.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
