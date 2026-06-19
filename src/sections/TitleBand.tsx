import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Splitting from 'splitting';

gsap.registerPlugin(ScrollTrigger);

export default function TitleBand() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    Splitting({ target: textRef.current });

    const chars = textRef.current.querySelectorAll('.char');
    if (chars.length === 0) return;

    chars.forEach((char) => {
      gsap.set(char.parentNode, { perspective: 2000 });
    });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        {
          willChange: 'opacity, transform',
          transformOrigin: '100% 50%',
          opacity: 0,
          rotationX: -45,
          z: -300,
          yPercent: 120,
          xPercent: -50,
        },
        {
          opacity: 1,
          rotationX: 0,
          z: 0,
          yPercent: 0,
          xPercent: 0,
          stagger: { amount: 0.015 * chars.length, from: 'start' },
          ease: 'exponential.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="title-band"
      style={{
        width: '100%',
        minHeight: '260px',
        backgroundColor: '#F5F0EB',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 20,
      }}
    >
      <div
        ref={textRef}
        data-splitting=""
        className="font-display text-dark-navy"
        style={{
          fontSize: 'clamp(48px, 8vw, 120px)',
          lineHeight: 0.95,
          letterSpacing: 0,
          textAlign: 'center',
        }}
      >
        IT für Ihre Praxis
      </div>
    </section>
  );
}
