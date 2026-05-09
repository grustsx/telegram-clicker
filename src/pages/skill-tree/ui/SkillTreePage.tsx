import React, { useState } from 'react';
import { SkillHelper } from '@/widgets/skill-helper';
import { SkillTreeWrapper } from '@/widgets/skill-tree';

function SkillTreePage() {
  const [selectedSkillId, setSelectedSkillId] = useState<number | null>(null);

  return (
    <>
      {selectedSkillId && (
        <SkillHelper
          skillId={selectedSkillId}
          onClose={() => setSelectedSkillId(null)}
        />
      )}
      <SkillTreeWrapper
        selectedSkillId={selectedSkillId}
        onSelectSkill={setSelectedSkillId}
      />
    </>
  );
}

export default React.memo(SkillTreePage);
