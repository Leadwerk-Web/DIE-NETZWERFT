import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useSectionReveal(sectionRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const select = gsap.utils.selector(section);

      if (shouldReduceMotion) {
        gsap.set(select('[data-reveal]'), { opacity: 1, clearProps: 'transform' });
        return;
      }

      const reveal = (selector: string, from: gsap.TweenVars, to: gsap.TweenVars) => {
        const elements = select(selector);
        if (!elements.length) return;

        gsap.fromTo(elements, from, {
          ...to,
          scrollTrigger: {
            trigger: section,
            start: 'top 74%',
            once: true,
          },
        });
      };

      reveal('[data-reveal="intro"]', { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' });
      reveal('[data-reveal="item"]', { opacity: 0, y: 28, scale: 0.985 }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.75,
        ease: 'power3.out',
        stagger: 0.08,
      });
      reveal('[data-reveal="media"]', { opacity: 0, y: 44, scale: 0.965 }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.95,
        ease: 'power3.out',
      });

      select('[data-parallax-y]').forEach((element) => {
        const y = Number((element as HTMLElement).dataset.parallaxY ?? -24);

        gsap.fromTo(
          element,
          { y: 0 },
          {
            y,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.7,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, [sectionRef]);
}
