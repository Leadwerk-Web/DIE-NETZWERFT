import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { referenceCategories, type LegacyLogo } from '../data/legacyHomepage';

gsap.registerPlugin(ScrollTrigger);

function LogoTile({ item, index }: { item: LegacyLogo; index: number }) {
  const content = (
    <>
      <img
        src={item.image}
        alt={`${item.title} Referenz`}
        loading={index < 12 ? 'eager' : 'lazy'}
        style={{
          maxWidth: '86%',
          maxHeight: '86%',
          objectFit: 'contain',
          filter: 'saturate(0.94)',
        }}
      />
      {item.href ? (
        <span className="reference-logo-link-icon" aria-hidden="true">
          <ExternalLink size={13} strokeWidth={1.8} />
        </span>
      ) : null}
    </>
  );

  if (!item.href) {
    return (
      <div className="reference-logo-card" data-reference-logo>
        {content}
      </div>
    );
  }

  return (
    <a
      className="reference-logo-card"
      data-reference-logo
      href={item.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${item.title} Referenz öffnen`}
    >
      {content}
    </a>
  );
}

export default function ClientShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [activeKey, setActiveKey] = useState(referenceCategories[0].key);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const activeCategory = useMemo(
    () => referenceCategories.find((category) => category.key === activeKey) ?? referenceCategories[0],
    [activeKey]
  );

  const totalCount = useMemo(
    () => referenceCategories.reduce((sum, category) => sum + category.items.length, 0),
    []
  );

  const updateRailControls = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;

    setCanScrollPrev(rail.scrollLeft > 4);
    setCanScrollNext(rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 4);
  }, []);

  const scrollReferences = (direction: number) => {
    const rail = railRef.current;
    if (!rail) return;

    rail.scrollBy({
      left: direction * Math.max(rail.clientWidth * 0.78, 320),
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (!sectionRef.current) return;

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    rail.scrollLeft = 0;

    const tiles = rail.querySelectorAll('[data-reference-logo]');
    gsap.fromTo(
      tiles,
      { opacity: 0, y: 18, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.48,
        ease: 'power3.out',
        stagger: { amount: Math.min(0.55, activeCategory.items.length * 0.018), from: 'start' },
      }
    );

    const frame = window.requestAnimationFrame(updateRailControls);

    return () => window.cancelAnimationFrame(frame);
  }, [activeCategory, updateRailControls]);

  useEffect(() => {
    window.addEventListener('resize', updateRailControls);
    return () => window.removeEventListener('resize', updateRailControls);
  }, [updateRailControls]);

  return (
    <section
      id="referenzen"
      ref={sectionRef}
      className="section-pad client-showcase"
      style={{
        width: '100%',
        backgroundColor: '#0B0F1C',
        color: '#FFFFFF',
        padding: '112px 5vw 128px',
        position: 'relative',
        zIndex: 20,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 16% 0%, rgba(0,67,96,0.24), transparent 32%), linear-gradient(135deg, rgba(58,125,255,0.16), transparent 42%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          maxWidth: '1240px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        <div className="label-marker" style={{ marginBottom: '1.25rem', color: 'rgba(255,255,255,0.58)' }}>
          [03] Referenzen
        </div>

        <div
          ref={introRef}
          className="reference-heading-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 0.82fr) minmax(0, 1.18fr)',
            gap: '4rem',
            alignItems: 'end',
            marginBottom: '3rem',
          }}
        >
          <div>
            <h2 className="font-display" style={{ fontSize: 'clamp(48px, 6vw, 84px)', lineHeight: 0.95, letterSpacing: 0, color: '#FFFFFF', marginBottom: '1rem' }}>
              Ein Auszug unserer Kunden
            </h2>
            <p className="font-mono" style={{ color: 'rgba(255,255,255,0.56)', fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {totalCount} Referenzen in vier Kategorien
            </p>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '18px', lineHeight: 1.55, maxWidth: '540px', marginLeft: 'auto' }}>
            Eine Auswahl aus Praxen, Gewerbe und radiologischen Einrichtungen, die im täglichen Betrieb auf stabile IT-Strukturen setzen.
          </p>
        </div>

        <div className="reference-toolbar">
          <div
            className="reference-tabs"
            role="tablist"
            aria-label="Referenzkategorien"
          >
            {referenceCategories.map((category) => {
              const isActive = category.key === activeCategory.key;

              return (
                <button
                  key={category.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`references-${category.key}`}
                  onClick={() => setActiveKey(category.key)}
                  className="reference-tab-button"
                  style={{
                    minHeight: '44px',
                    borderRadius: '6px',
                    border: `1px solid ${isActive ? '#FFFFFF' : 'rgba(255,255,255,0.24)'}`,
                    backgroundColor: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.07)',
                    color: isActive ? '#0B0F1C' : '#FFFFFF',
                    padding: '10px 16px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease, transform 0.25s ease',
                  }}
                >
                  <span className="font-mono" style={{ fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {category.label}
                  </span>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '11px',
                      color: isActive ? 'var(--color-brand)' : 'rgba(255,255,255,0.58)',
                    }}
                  >
                    {String(category.items.length).padStart(2, '0')}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="slider-control-row reference-slider-controls">
            <button
              type="button"
              className="slider-icon-button slider-icon-button-light"
              onClick={() => scrollReferences(-1)}
              disabled={!canScrollPrev}
              aria-label="Vorherige Referenzen"
              title="Vorherige Referenzen"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="font-mono slider-counter slider-counter-light">
              {String(activeCategory.items.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              className="slider-icon-button slider-icon-button-light"
              onClick={() => scrollReferences(1)}
              disabled={!canScrollNext}
              aria-label="Weitere Referenzen"
              title="Weitere Referenzen"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div
          id={`references-${activeCategory.key}`}
          role="tabpanel"
          ref={railRef}
          className="reference-logo-rail"
          onScroll={updateRailControls}
        >
          {activeCategory.items.map((item, index) => (
            <LogoTile key={`${activeCategory.key}-${item.image}`} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
