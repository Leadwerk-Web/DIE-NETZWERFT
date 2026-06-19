import { useEffect, useRef } from 'react';

export type SlideProgressRef = React.MutableRefObject<{
  current: number;
  target: number;
  ease: number;
}>;

type HeroScrollSliderProps = {
  imageCount: number;
  onSeek: () => void;
  slideProgress: SlideProgressRef;
};

export default function HeroScrollSlider({
  imageCount,
  onSeek,
  slideProgress,
}: HeroScrollSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    let rafId = 0;

    const tick = () => {
      const progress = Math.max(0, Math.min(1, slideProgress.current.current));

      if (thumbRef.current) {
        thumbRef.current.style.bottom = `calc(${progress * 100}% - 3px)`;
      }
      if (fillRef.current) {
        fillRef.current.style.height = `${progress * 100}%`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [slideProgress]);

  const seekFromPointer = (clientY: number) => {
    const track = trackRef.current;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const ratio = 1 - Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));

    slideProgress.current.target = ratio;
    slideProgress.current.current = ratio;
    onSeek();

    // #region agent log
    fetch('http://127.0.0.1:7366/ingest/b36f4b69-b3b7-4b0b-b332-d41c2c52d7db',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'8d4886'},body:JSON.stringify({sessionId:'8d4886',runId:'time-slider',hypothesisId:'T2',location:'HeroScrollSlider.tsx:seek',message:'Slider seek',data:{ratio,slideIndex:Math.round(ratio*(imageCount-1)),imageCount},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    seekFromPointer(event.clientY);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    seekFromPointer(event.clientY);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <div className="hero-scroll-indicator">
      <div
        ref={trackRef}
        className="hero-scroll-track"
        role="slider"
        aria-label="Hero-Bilder durchblättern"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-orientation="vertical"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div className="hero-scroll-track-line" aria-hidden="true">
          <div ref={fillRef} className="hero-scroll-track-fill" />
          <div ref={thumbRef} className="hero-scroll-track-thumb" />
        </div>
      </div>
      <p className="font-mono text-muted-grey hero-scroll-label">Scrollen</p>
    </div>
  );
}
