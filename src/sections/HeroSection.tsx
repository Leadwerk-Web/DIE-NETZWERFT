import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import TunnelCanvas, {
  HERO_IMAGE_COUNT,
  HERO_SLIDE_INTERVAL_MS,
  getHeroSlideStep,
} from '../components/TunnelScene';
import HeroScrollSlider from '../components/HeroScrollSlider';
import { useIsMobile } from '../hooks/use-mobile';

const HERO_SLIDE_EASE = 0.12;
const HERO_AUTOPLAY_PAUSE_MS = 12000;

export default function HeroSection() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const slideProgress = useRef({ current: 0, target: 0, ease: HERO_SLIDE_EASE });
  const autoplayPausedUntil = useRef(0);

  const pauseAutoplay = useCallback(() => {
    autoplayPausedUntil.current = Date.now() + HERO_AUTOPLAY_PAUSE_MS;
  }, []);

  useEffect(() => {
    const slideStep = getHeroSlideStep();

    let rafId: number;
    const animate = () => {
      slideProgress.current.current = gsap.utils.interpolate(
        slideProgress.current.current,
        slideProgress.current.target,
        slideProgress.current.ease
      );
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    const autoplayId = window.setInterval(() => {
      if (Date.now() < autoplayPausedUntil.current) return;

      const nextTarget = slideProgress.current.target + slideStep;
      slideProgress.current.target = nextTarget > 1 ? 0 : nextTarget;

      // #region agent log
      fetch('http://127.0.0.1:7366/ingest/b36f4b69-b3b7-4b0b-b332-d41c2c52d7db',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'8d4886'},body:JSON.stringify({sessionId:'8d4886',runId:'time-slider',hypothesisId:'T1',location:'HeroSection.tsx:autoplay',message:'Autoplay advance',data:{target:slideProgress.current.target,slideStep,intervalMs:HERO_SLIDE_INTERVAL_MS},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
    }, HERO_SLIDE_INTERVAL_MS);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearInterval(autoplayId);
    };
  }, []);

  useEffect(() => {
    if (!isMobile || !sectionRef.current) return;

    const measure = () => {
      const hero = sectionRef.current;
      const canvas = hero?.querySelector('canvas');
      const canvasRect = canvas?.getBoundingClientRect();
      const vw = window.innerWidth;

      // #region agent log
      fetch('http://127.0.0.1:7366/ingest/b36f4b69-b3b7-4b0b-b332-d41c2c52d7db',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'8d4886'},body:JSON.stringify({sessionId:'8d4886',runId:'post-fix',hypothesisId:'A-E',location:'HeroSection.tsx:measure',message:'Mobile hero layout',data:{isMobile,vw,slideProgress:slideProgress.current.current,inViewport:!!canvasRect},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
    };

    const timer = window.setTimeout(measure, 1500);
    window.addEventListener('resize', measure);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('resize', measure);
    };
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`hero-section${isMobile ? ' hero-section--mobile' : ''}`}
      style={{
        position: 'relative',
        width: '100%',
        height: isMobile ? '100svh' : 'min(100svh, 940px)',
        minHeight: isMobile ? '0' : '680px',
        overflow: 'hidden',
      }}
    >
      <TunnelCanvas isCompact={isMobile} slideProgress={slideProgress} />

      <div
        aria-hidden="true"
        className="hero-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 5,
          pointerEvents: 'none',
          background: isMobile
            ? 'linear-gradient(180deg, rgba(245,240,235,0.99) 0%, rgba(245,240,235,0.95) 36%, rgba(245,240,235,0.52) 58%, rgba(245,240,235,0.12) 78%, rgba(245,240,235,0) 100%)'
            : 'linear-gradient(90deg, rgba(245,240,235,0.97) 0%, rgba(245,240,235,0.9) 39%, rgba(245,240,235,0.22) 67%, rgba(245,240,235,0) 100%)',
        }}
      />

      <div className="hero-content">
        <div className="hero-copy">
          <p className="label-marker" style={{ marginBottom: '1rem' }}>
            Medizinische IT-Systeme
          </p>
          <h1 className="font-display text-dark-navy hero-title">
            DIE NETZWERFT
          </h1>
          <p className="hero-description">
            Praxis-IT, T2Med, Telefonie und sichere Infrastruktur für Praxen in Karlsruhe und der Region.
          </p>
        </div>

        <div className="hero-tagline">
          <p className="font-accent text-bright-blue hero-tagline-text">
            Praxisnah. Sicher. Vor Ort.
          </p>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '5vh',
            left: '50%',
            transform: 'translateX(-50%)',
            display: isMobile ? 'none' : 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div style={{ width: '120px', height: '1px', backgroundColor: '#A39B94' }} />
          <div
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-brand)',
            }}
          />
          <div style={{ width: '120px', height: '1px', backgroundColor: '#A39B94' }} />
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '5vh',
            right: '5vw',
            display: isMobile ? 'none' : 'block',
          }}
        >
          <p className="font-mono text-muted-grey" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Karlsruhe &amp; Region
          </p>
        </div>

        <HeroScrollSlider
          imageCount={HERO_IMAGE_COUNT}
          onSeek={pauseAutoplay}
          slideProgress={slideProgress}
        />
      </div>
    </section>
  );
}
