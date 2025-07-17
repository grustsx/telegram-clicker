import React from 'react';
import { useAppSelector } from '../app/hooks';
import { selectSpellById } from '../app/selectors';
import { formatDuration } from '../utils/format';

const Sugar = () => {
  const sugarSpell = useAppSelector((state) => selectSpellById(state, 1));
  if (!sugarSpell) return;

  const { remainSeconds } = sugarSpell;
  return (
    <div className="text-2xl text-shadow-lg text-tortik-white">
      Сахарок:
      {remainSeconds > 0
        ? `${formatDuration(remainSeconds)} откат`
        : 'готов к использованию'}
    </div>
  );
};
export default React.memo(Sugar);
