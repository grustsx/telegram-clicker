import { useEffect, useRef } from 'react';
import useDragScroll from '../hooks/useDragScroll';
import { SkillTree } from '../components';

function SkillTreePage() {
  const containerRef = useDragScroll<HTMLDivElement>();
  const backRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let animationFrameId: number;

    const onScroll = () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      animationFrameId = requestAnimationFrame(() => {
        const x = el.scrollLeft;
        const y = el.scrollTop;

        // Плавный GPU параллакс
        if (backRef.current) {
          backRef.current.style.transform = `translate3d(${-x * 0.1}px, ${-y * 0.1}px, 0)`;
        }
        if (starsRef.current) {
          starsRef.current.style.transform = `translate3d(${-x * 0.3}px, ${-y * 0.3}px, 0)`;
        }
      });
    };

    el.addEventListener('scroll', onScroll);
    onScroll(); // начальная позиция

    return () => {
      el.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-scroll touch-none"
    >
      {/* Задний фон */}
      <div
        ref={backRef}
        className="fixed top-0 left-0 w-full h-full z-0 bg-repeat pointer-events-none"
        style={{
          backgroundImage: "url('/assets/backgrounds/skills/blue-back.png')",
          imageRendering: 'pixelated',
          willChange: 'transform',
        }}
      />

      {/* Звезды */}
      <div
        ref={starsRef}
        className="fixed top-0 left-0 w-full h-full z-10 bg-repeat pointer-events-none"
        style={{
          backgroundImage: "url('/assets/backgrounds/skills/blue-stars.png')",
          imageRendering: 'pixelated',
          willChange: 'transform',
        }}
      />

      {/* Контент скилл-дерева */}
      <div className="relative z-30">
        <SkillTree />
      </div>
    </div>
  );
}

export default SkillTreePage;
