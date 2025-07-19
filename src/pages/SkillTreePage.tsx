import { useEffect, useRef } from 'react';
import useDragScroll from '../hooks/useDragScroll';
import { SkillTree } from '../components';

function SkillTreePage() {
  const containerRef = useDragScroll<HTMLDivElement>();
  const scrollPosRef = useRef({ x: 0, y: 0 });

  const bgBackRef = useRef<HTMLDivElement>(null);
  const bgStarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let ticking = false;

    const onScroll = () => {
      scrollPosRef.current = {
        x: el.scrollLeft,
        y: el.scrollTop,
      };

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const { x, y } = scrollPosRef.current;

          if (bgBackRef.current) {
            bgBackRef.current.style.backgroundPosition = `${-x * 0.1}px ${-y * 0.1}px`;
          }
          if (bgStarsRef.current) {
            bgStarsRef.current.style.backgroundPosition = `${-x * 0.3}px ${-y * 0.3}px`;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  });

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-scroll">
      <div
        ref={bgBackRef}
        className="pointer-events-none fixed top-0 left-0 w-full h-full z-0 bg-cover bg-repeat"
        style={{
          backgroundImage: "url('/assets/backgrounds/skills/blue-back.png')",
          backgroundPosition: '0px 0px',
          imageRendering: 'pixelated',
        }}
      />

      <div
        ref={bgStarsRef}
        className="pointer-events-none fixed top-0 left-0 w-full h-full z-10 bg-cover bg-repeat"
        style={{
          backgroundImage: "url('/assets/backgrounds/skills/blue-stars.png')",
          backgroundPosition: '0px 0px',
          imageRendering: 'pixelated',
        }}
      />

      <div className="transition-transform origin-top-left z-30">
        <SkillTree />
      </div>
    </div>
  );
}

export default SkillTreePage;
