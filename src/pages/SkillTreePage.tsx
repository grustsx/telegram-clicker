import { useState, useRef, useEffect } from 'react';
import useDragScroll from '../hooks/useDragScroll';
import { SkillTree } from '../components';

function SkillTreePage() {
  const containerRef = useDragScroll<HTMLDivElement>();
  const scaleRef = useRef<HTMLDivElement>(null);
  const [scrollPos, setScrollPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      setScrollPos({
        x: el.scrollLeft,
        y: el.scrollTop,
      });
    };

    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  });

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-scroll">
      <div
        className="pointer-events-none fixed top-0 left-0 w-full h-full z-0 bg-cover bg-repeat"
        style={{
          backgroundImage: "url('/assets/backgrounds/skills/blue-back.png')",
          backgroundPosition: `${-scrollPos.x * 0.1}px ${-scrollPos.y * 0.1}px`,
          imageRendering: 'pixelated',
        }}
      />

      <div
        className="pointer-events-none fixed top-0 left-0 w-full h-full z-10 bg-cover bg-repeat"
        style={{
          backgroundImage: "url('/assets/backgrounds/skills/blue-stars.png')",
          backgroundPosition: `${-scrollPos.x * 0.3}px ${-scrollPos.y * 0.3}px`,
          imageRendering: 'pixelated',
        }}
      />

      <div ref={scaleRef} className="transition-transform origin-top-left z-30">
        <SkillTree />
      </div>
    </div>
  );
}

export default SkillTreePage;
