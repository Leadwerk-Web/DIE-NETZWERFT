import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BLOB_SHAPE = 'M 400 200 C 400 300, 300 400, 200 400 C 100 400, 0 300, 0 200 C 0 100, 100 0, 200 0 C 300 0, 400 100, 400 200 Z';
const DIAMOND_SHAPE = 'M 420 210 C 350 300, 295 390, 205 420 C 115 385, 40 300, 20 205 C 78 115, 128 42, 215 20 C 305 62, 370 118, 420 210 Z';
const TRIANGLE_SHAPE = 'M 250 32 C 330 150, 410 278, 468 430 C 345 448, 155 448, 32 430 C 90 278, 170 150, 250 32 C 250 32, 250 32, 250 32 Z';

const steps = [
  {
    number: '01',
    title: 'Analyse',
    description: 'Wir verstehen Ihre Praxis',
  },
  {
    number: '02',
    title: 'Konzeption',
    description: 'Maßgeschneiderte IT-Lösungen',
  },
  {
    number: '03',
    title: 'Umsetzung',
    description: 'Reibungslose Integration',
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shapeRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !pathRef.current || !shapeRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        introRef.current,
        { opacity: 0, y: 34 },
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
        stepsRef.current,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 52%',
          },
        }
      );

      gsap.to(shapeRef.current, {
        rotation: 8,
        scale: 1.04,
        y: -16,
        duration: 5.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap
        .timeline({ repeat: -1, defaults: { duration: 3.8, ease: 'sine.inOut' } })
        .to(pathRef.current, { attr: { d: DIAMOND_SHAPE } })
        .to(pathRef.current, { attr: { d: TRIANGLE_SHAPE } })
        .to(pathRef.current, { attr: { d: BLOB_SHAPE } });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pad"
      style={{
        width: '100%',
        backgroundColor: '#F5F0EB',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 20,
        padding: '112px 5vw',
      }}
    >
      <svg
        ref={shapeRef}
        viewBox="0 0 500 500"
        className="process-section-shape"
        style={{
          position: 'absolute',
          width: '420px',
          height: '420px',
          opacity: 0.11,
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          top: '48%',
          left: '52%',
        }}
      >
        <path ref={pathRef} d={BLOB_SHAPE} fill="var(--color-brand)" />
      </svg>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1120px', margin: '0 auto' }}>
        <div ref={introRef} className="section-heading-grid process-section-intro" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.8fr) minmax(0, 1.2fr)', gap: '4rem', alignItems: 'end', marginBottom: '4rem' }}>
          <h2
            className="font-display text-dark-navy"
            style={{
              fontSize: 'clamp(48px, 5vw, 76px)',
              lineHeight: 0.98,
              letterSpacing: 0,
            }}
          >
            So funktioniert's
          </h2>
          <p style={{ color: '#6F6761', fontSize: '18px', lineHeight: 1.55, maxWidth: '520px' }}>
            Klarer Ablauf, kurze Wege und ein realistischer Plan für Ihre Praxis-IT.
          </p>
        </div>

        <div
          className="process-steps-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '28px',
          }}
        >
          {steps.map((step, i) => (
            <article
              key={i}
              ref={(el) => {
                if (el) stepsRef.current[i] = el;
              }}
              style={{ borderTop: '1px solid rgba(163,155,148,0.55)', paddingTop: '1.75rem' }}
            >
              <p className="font-mono text-coral" style={{ fontSize: '48px', lineHeight: 1, marginBottom: '1.5rem' }}>
                {step.number}
              </p>
              <h3 className="font-display text-dark-navy" style={{ fontSize: '30px', lineHeight: 1, letterSpacing: 0, marginBottom: '0.8rem' }}>
                {step.title}
              </h3>
              <p className="font-accent text-muted-grey" style={{ fontSize: '18px' }}>
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
