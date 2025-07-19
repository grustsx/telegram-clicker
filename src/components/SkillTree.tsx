import { useRef, useEffect } from 'react';
import useDragScroll from '../hooks/useDragScroll';
import { SkillTree } from '../components';

function SkillTreePage() {
  const containerRef = useDragScroll<HTMLDivElement>();
  const backRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateParallax = () => {
      const x = el.scrollLeft;
      const y = el.scrollTop;

      // Более производительный способ через transform
      if (backRef.current) {
        backRef.current.style.transform = `translate3d(${-x * 0.1}px, ${-y * 0.1}px, 0)`;
      }
      if (starsRef.current) {
        starsRef.current.style.transform = `translate3d(${-x * 0.3}px, ${-y * 0.3}px, 0)`;
      }
    };

    el.addEventListener('scroll', updateParallax);
    updateParallax(); // начальная позиция

    return () => el.removeEventListener('scroll', updateParallax);
  });

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-scroll">
      {/* Задний фон */}
      <div
        ref={backRef}
        className="pointer-events-none fixed top-0 left-0 w-full h-full z-0 bg-repeat"
        style={{
          backgroundImage: "url('/assets/backgrounds/skills/blue-back.png')",
          imageRendering: 'pixelated',
          willChange: 'transform',
        }}
      />

      {/* Звёзды поверх */}
      <div
        ref={starsRef}
        className="pointer-events-none fixed top-0 left-0 w-full h-full z-10 bg-repeat"
        style={{
          backgroundImage: "url('/assets/backgrounds/skills/blue-stars.png')",
          imageRendering: 'pixelated',
          willChange: 'transform',
        }}
      />

      {/* Контент */}
      <div className="transition-transform origin-top-left z-30">
        <SkillTree />
      </div>
    </div>
  );
}

export default SkillTreePage;
