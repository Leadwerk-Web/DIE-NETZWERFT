import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSectionReveal } from '../hooks/useSectionReveal';
import { publicAsset } from '@/lib/publicAsset';

const groups = [
  {
    eyebrow: 'Allround-IT',
    title: 'Technik und Betrieb',
    description: 'Hard- und Software, Cloud, Datenschutz und sichere Netze aus einer Hand.',
    items: [
      { title: 'Hardware', copy: 'Arbeitsplätze, Server und Netzwerk sauber geplant.', icon: publicAsset('/images/legacy/icons/icon-111.png') },
      { title: 'Cloudservice', copy: 'Standortunabhängiger Zugriff mit reduziertem Ausfallrisiko.', icon: publicAsset('/images/legacy/icons/icon-nw-27.png') },
      { title: 'Software', copy: 'Branchensoftware passend zu bestehenden Abläufen.', icon: publicAsset('/images/legacy/icons/icon-nw-26.png') },
      { title: 'Multimedia', copy: 'WLAN, Wartezimmer-Screens und Konferenztechnik.', icon: publicAsset('/images/legacy/icons/icon-nw-32.png') },
      { title: 'Sicherheit', copy: 'Firewall, Endpoint Protection, VPN und Content Filter.', icon: publicAsset('/images/legacy/icons/icon-nw-24.png') },
      { title: 'Datenschutz', copy: 'Begleitung als externer Datenschutzbeauftragter.', icon: publicAsset('/images/legacy/icons/icon-nw-25.png') },
    ],
  },
  {
    eyebrow: 'Praxisfokus',
    title: 'Software und Medizintechnik',
    description: 'Ausstattung, Praxissoftware und Partnerlösungen für medizinische Workflows.',
    items: [
      { title: 'T2Med', copy: 'Kernprodukt für moderne Praxisverwaltung.', icon: publicAsset('/images/legacy/icons/icon-34.png') },
      { title: 'MyMedax', copy: 'Anamnese, Fragebögen und Einwilligungen auf dem iPad.', icon: publicAsset('/images/legacy/icons/icon-33.png') },
      { title: 'teemer', copy: 'Softwarelösung für den Dental-Bereich.', icon: publicAsset('/images/legacy/icons/teemer-leistung-1.png') },
      { title: 'Sono & Röntgen', copy: 'Koordination mit Partnerfirmen für Diagnostikgeräte.', icon: publicAsset('/images/legacy/icons/icon-nw-29.png') },
      { title: 'Telematikinfrastruktur', copy: 'Installation von TI-Komponenten mit DGN-Partnerstatus.', icon: publicAsset('/images/legacy/icons/icon-110.png') },
      { title: 'Medizintechnik', copy: 'Diagnostiklösungen mit spezialisierten Partnern.', icon: publicAsset('/images/legacy/icons/icon-nw-31.png') },
    ],
  },
  {
    eyebrow: 'Infrastruktur',
    title: 'Räume, Anlagen und Kommunikation',
    description: 'Gebäude- und Medientechnik, Telefonie und elektrische Prüfungen mitgedacht.',
    items: [
      { title: 'Videoüberwachung', copy: 'Überwachungstechnik inklusive Fernzugriff per App.', icon: publicAsset('/images/legacy/icons/icon-nw-20.png') },
      { title: 'KNX-Programmierung', copy: 'Programmierung von KNX und weiteren Bussystemen.', icon: publicAsset('/images/legacy/icons/icon-nw-21.png') },
      { title: 'Elektroinstallation', copy: 'Planung, Sanierung und Installation von Netzen.', icon: publicAsset('/images/legacy/icons/icon-nw-22.png') },
      { title: 'Telefonanlagen', copy: 'Warteschleifen, Fax-to-Mail und PC-gestütztes Wählen.', icon: publicAsset('/images/legacy/icons/icon-nw-19.png') },
      { title: 'Medientechnik', copy: 'Multimediatechnik für Konferenz- und Schulungsräume.', icon: publicAsset('/images/legacy/icons/icon-nw-18.png') },
      { title: 'Elektrische Prüfungen', copy: 'Gesetzlich geforderte Prüfungen, auch an Medizingeräten.', icon: publicAsset('/images/legacy/icons/icon-35.png') },
    ],
  },
];

export default function CapabilityMatrix() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeGroup = groups[activeIndex];

  useSectionReveal(sectionRef);

  useEffect(() => {
    if (!panelRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        panelRef.current?.querySelectorAll('[data-capability-animate]') ?? [],
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.055,
        }
      );
    }, panelRef);

    return () => ctx.revert();
  }, [activeIndex]);

  const changeSlide = (direction: number) => {
    setActiveIndex((current) => (current + direction + groups.length) % groups.length);
  };

  return (
    <section
      ref={sectionRef}
      id="kompetenzfelder"
      className="section-pad"
      style={{
        width: '100%',
        backgroundColor: '#FFFFFF',
        padding: '104px 5vw 112px',
        position: 'relative',
        zIndex: 20,
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <div className="label-marker" style={{ marginBottom: '1.25rem' }}>
          [02] Kompetenzfelder
        </div>

        <div
          data-reveal="intro"
          className="section-heading-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)',
            gap: '4rem',
            alignItems: 'end',
            marginBottom: '3rem',
          }}
        >
          <h2 className="font-display text-dark-navy" style={{ fontSize: 'clamp(48px, 6vw, 84px)', lineHeight: 0.95, letterSpacing: 0 }}>
            Alles, was Ihre Praxis technisch trägt
          </h2>
          <p style={{ color: '#6F6761', fontSize: '18px', lineHeight: 1.55, maxWidth: '520px', marginLeft: 'auto' }}>
            Die alte Netzwerft-Stärke bleibt erhalten: ein Partner, der Praxissoftware, IT, Medizintechnik und Infrastruktur zusammen denkt.
          </p>
        </div>

        <div className="capability-slider" data-reveal="item">
          <div className="capability-slider-tabs" role="tablist" aria-label="Kompetenzfelder">
            {groups.map((group, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={group.title}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`capability-panel-${index}`}
                  onClick={() => setActiveIndex(index)}
                  className="capability-slider-tab"
                  data-active={isActive}
                >
                  <span className="font-mono">{String(index + 1).padStart(2, '0')}</span>
                  <span>{group.eyebrow}</span>
                  <span className="font-mono">{String(group.items.length).padStart(2, '0')}</span>
                </button>
              );
            })}
          </div>

          <div
            id={`capability-panel-${activeIndex}`}
            role="tabpanel"
            ref={panelRef}
            className="capability-slider-panel"
          >
            <div className="capability-slider-summary" data-capability-animate>
              <p className="font-mono text-coral" style={{ fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
                {activeGroup.eyebrow}
              </p>
              <h3 className="font-display text-dark-navy capability-slider-title" style={{ letterSpacing: 0, marginBottom: '1rem' }}>
                {activeGroup.title}
              </h3>
              <p style={{ color: '#6F6761', fontSize: '16px', lineHeight: 1.55, maxWidth: '390px' }}>
                {activeGroup.description}
              </p>

              <div className="slider-control-row">
                <button
                  type="button"
                  className="slider-icon-button"
                  onClick={() => changeSlide(-1)}
                  aria-label="Vorheriges Kompetenzfeld"
                  title="Vorheriges Kompetenzfeld"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="font-mono slider-counter">
                  {String(activeIndex + 1).padStart(2, '0')} / {String(groups.length).padStart(2, '0')}
                </span>
                <button
                  type="button"
                  className="slider-icon-button"
                  onClick={() => changeSlide(1)}
                  aria-label="Nächstes Kompetenzfeld"
                  title="Nächstes Kompetenzfeld"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="capability-items-grid">
              {activeGroup.items.map((item) => (
                <div key={item.title} className="capability-item" data-capability-animate>
                  <span className="capability-item-icon">
                    <img src={item.icon} alt="" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="capability-item-title">{item.title}</span>
                    <span className="capability-item-copy">{item.copy}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
