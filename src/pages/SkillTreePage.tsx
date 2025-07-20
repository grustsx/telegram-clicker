import useDragScroll from '../hooks/useDragScroll';
import { SkillHelper, SkillTree } from '../components';
import useSkillsLayoutSize from '../hooks/useSkillsLayoutSize';
import React, { useEffect, useState } from 'react';

const isIOS = /iP(ad|hone|od)/.test(navigator.userAgent);

function SkillTreePage() {
  const containerRef = useDragScroll<HTMLDivElement>();
  const { width, height } = useSkillsLayoutSize();
  const [selectedSkillId, setSelectedSkillId] = useState<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const scrollX = (container.scrollWidth - container.clientWidth) / 2;
      const scrollY = (container.scrollHeight - container.clientHeight) / 2;
      container.scrollTo(scrollX, scrollY);
    }
  }, [containerRef]);

  return (
    <>
      {selectedSkillId && (
        <SkillHelper
          skillId={selectedSkillId}
          onClose={() => setSelectedSkillId(null)}
        />
      )}
      <div
        ref={containerRef}
        className="relative w-full h-full overflow-scroll perspective-[1px] perspective-origin-top-left"
      >
        <div
          className={`origin-top-left pointer-events-none absolute top-0 left-0 z-0 bg-repeat bg-[length:auto_100vh]`}
          style={{
            width: `${width}px`,
            height: `${height}px`,
            backgroundImage: "url('/assets/backgrounds/skills/blue-back.png')",
            transform: isIOS ? '' : 'translateZ(-2px) scale(3)',
            imageRendering: 'pixelated',
          }}
        />

        <div
          className={`origin-top-left absolute top-0 left-0 z-0 bg-repeat bg-[length:auto_100vh]`}
          style={{
            width: `${width}px`,
            height: `${height}px`,
            backgroundImage: "url('/assets/backgrounds/skills/blue-stars.png')",
            transform: isIOS ? '' : 'translateZ(-1px) scale(2)',
            imageRendering: 'pixelated',
          }}
        />

        <div className="transition-transform origin-top-left z-30">
          <SkillTree setSelectedSkillId={setSelectedSkillId} />
        </div>
      </div>
    </>
  );
}

export default React.memo(SkillTreePage);
