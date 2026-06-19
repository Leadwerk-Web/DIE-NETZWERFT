import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TunnelCanvas from '../components/TunnelScene';
import HeroScrollSlider from '../components/HeroScrollSlider';
import { useIsMobile } from '../hooks/use-mobile';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef({ current: 0, target: 0, ease: 0.05 });
  const pinRangeRef = useRef({ start: 0, end: 0 });

  useEffect(() => {
    if (!sectionRef.current) return;

    const handleScroll = () => {
      scrollProgress.current.target = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    const syncPinRange = (trigger: ScrollTrigger) => {
      pinRangeRef.current = {
        start: trigger.start,
        end: trigger.end,
      };

      // #region agent log
      fetch('http://127.0.0.1:7366/ingest/b36f4b69-b3b7-4b0b-b332-d41c2c52d7db',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'8d4886'},body:JSON.stringify({sessionId:'8d4886',runId:'slider',hypothesisId:'S2',location:'HeroSection.tsx:syncPinRange',message:'Hero pin range synced',data:pinRangeRef.current,timestamp:Date.now()})}).catch(()=>{});
      // #endregion
    };

    const pinTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      pin: true,
      scrub: 2,
      end: '+=300%',
    });

    syncPinRange(pinTrigger);

    const onRefresh = () => syncPinRange(pinTrigger);
    ScrollTrigger.addEventListener('refresh', onRefresh);

    let rafId: number;
    const animate = () => {
      scrollProgress.current.current = gsap.utils.interpolate(
        scrollProgress.current.current,
        scrollProgress.current.target,
        scrollProgress.current.ease
      );
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.removeEventListener('refresh', onRefresh);
      pinTrigger.kill();
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    if (!isMobile || !sectionRef.current) return;

    const measure = () => {
      const hero = sectionRef.current;
      const canvas = hero?.querySelector('canvas');
      const canvasRect = canvas?.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const centerX = canvasRect ? canvasRect.left + canvasRect.width / 2 : null;
      const offsetFromCenter = centerX !== null ? Math.abs(centerX - vw / 2) : null;
      const inViewport =
        canvasRect !== undefined &&
        canvasRect !== null &&
        canvasRect.left >= 0 &&
        canvasRect.right <= vw &&
        canvasRect.top >= 0 &&
        canvasRect.bottom <= vh;

      // #region agent log
      fetch('http://127.0.0.1:7366/ingest/b36f4b69-b3b7-4b0b-b332-d41c2c52d7db',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'8d4886'},body:JSON.stringify({sessionId:'8d4886',runId:'post-fix',hypothesisId:'A-E',location:'HeroSection.tsx:measure',message:'Mobile hero layout',data:{isMobile,vw,vh,canvasRect,centerX,viewportCenterX:vw/2,offsetFromCenter,inViewport,compactMode:true},timestamp:Date.now()})}).catch(()=>{});
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
      <TunnelCanvas isCompact={isMobile} scrollProgress={scrollProgress} />

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

      {/* Overlay content */}
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

        {/* Bottom-left */}
        <div className="hero-tagline">
          <p className="font-accent text-bright-blue hero-tagline-text">
            Praxisnah. Sicher. Vor Ort.
          </p>
        </div>

        {/* Bottom-center */}
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

        {/* Bottom-right */}
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

        {/* Center scroll indicator */}
        <HeroScrollSlider
          pinRangeRef={pinRangeRef}
          scrollProgress={scrollProgress}
        />
      </div>
    </section>
  );
}
