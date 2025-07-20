import useDragScroll from '../hooks/useDragScroll';
import { SkillTree } from '../components';

function SkillTreePage() {
  const containerRef = useDragScroll<HTMLDivElement>();

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-scroll perspective-[1px] perspective-origin-top-left"
    >
      <div
        className="origin-top-left pointer-events-none absolute top-0 left-0 w-[300vw] h-[300vh] z-0 bg-repeat bg-[length:auto_100vh]"
        style={{
          backgroundImage: "url('/assets/backgrounds/skills/blue-back.png')",
          transform: 'translateZ(-2px) scale(3)',
          imageRendering: 'pixelated',
        }}
      />

      <div
        className="origin-top-left absolute top-0 left-0 w-[300vw] h-[300vh] z-10 bg-repeat bg-[length:auto_100vh]"
        style={{
          backgroundImage: "url('/assets/backgrounds/skills/blue-stars.png')",
          transform: 'translateZ(-1px) scale(2)',
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
