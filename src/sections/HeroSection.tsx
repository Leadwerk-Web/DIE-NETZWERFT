import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TunnelCanvas from '../components/TunnelScene';
import { useIsMobile } from '../hooks/use-mobile';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef({ current: 0, target: 0, ease: 0.05 });

  useEffect(() => {
    if (!sectionRef.current) return;

    const handleScroll = () => {
      scrollProgress.current.target = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    const pinTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      pin: true,
      scrub: 2,
      end: '+=300%',
    });

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
      pinTrigger.kill();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: 'min(100svh, 940px)',
        minHeight: '680px',
        overflow: 'hidden',
      }}
    >
      <TunnelCanvas isCompact={isMobile} scrollProgress={scrollProgress} />

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 5,
          pointerEvents: 'none',
          background: isMobile
            ? 'linear-gradient(180deg, rgba(245,240,235,0.98) 0%, rgba(245,240,235,0.95) 42%, rgba(245,240,235,0.3) 68%, rgba(245,240,235,0) 100%), linear-gradient(90deg, rgba(245,240,235,0.98) 0%, rgba(245,240,235,0.82) 52%, rgba(245,240,235,0) 100%)'
            : 'linear-gradient(90deg, rgba(245,240,235,0.97) 0%, rgba(245,240,235,0.9) 39%, rgba(245,240,235,0.22) 67%, rgba(245,240,235,0) 100%)',
        }}
      />

      {/* Overlay content */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: isMobile ? '138px' : 'clamp(128px, 18vh, 190px)',
            left: '5vw',
            maxWidth: isMobile ? '90vw' : '700px',
          }}
        >
          <p className="label-marker" style={{ marginBottom: '1rem' }}>
            Medizinische IT-Systeme
          </p>
          <h1
            className="font-display text-dark-navy"
            style={{
              fontSize: isMobile ? 'clamp(46px, 15vw, 62px)' : 'clamp(52px, 7.5vw, 104px)',
              lineHeight: isMobile ? 0.92 : 0.88,
              marginBottom: isMobile ? '1.25rem' : '1.5rem',
            }}
          >
            DIE NETZWERFT
          </h1>
          <p
            style={{
              maxWidth: isMobile ? '84vw' : '520px',
              color: '#6F6761',
              fontSize: isMobile ? '16px' : 'clamp(17px, 1.45vw, 22px)',
              lineHeight: 1.5,
            }}
          >
            Praxis-IT, T2Med, Telefonie und sichere Infrastruktur für Praxen in Karlsruhe und der Region.
          </p>
        </div>

        {/* Bottom-left */}
        <div
          style={{
            position: 'absolute',
            bottom: '5vh',
            left: '5vw',
          }}
        >
          <p className="font-accent text-bright-blue" style={{ fontSize: '24px' }}>
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
              backgroundColor: '#E07452',
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
        <div
          style={{
            position: 'absolute',
            bottom: '12vh',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            style={{
              width: '1px',
              height: '40px',
              backgroundColor: '#A39B94',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#E07452',
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
              }}
              className="pulse-location"
            />
          </div>
          <p className="font-mono text-muted-grey" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Scrollen
          </p>
        </div>
      </div>
    </section>
  );
}
