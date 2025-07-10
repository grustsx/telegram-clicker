import { sendBuySkill } from '../api';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectUserId } from '../app/selectors';
import { buySkill, updateCurrencyPerClick } from '../state/gameSlice';

import type { HelpInfo } from './SkillTree';

const SkillHelper = ({
  helpInfo,
  skillPoints,
  onClose,
}: {
  helpInfo: HelpInfo;
  skillPoints: number;
  onClose: () => void;
}) => {
  const { id, name, description, price, unlocked } = helpInfo;
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);

  const buyChosenSkill = (skillId: string) => {
    dispatch(buySkill(skillId));
    dispatch(updateCurrencyPerClick());

    sendBuySkill(id, userId);
  };

  return (
    <div className="fixed top-0 w-full h-48 bg-amber-900/20 z-10">
      <button className="absolute top-4 right-4" onClick={onClose}>
        X
      </button>
      <button
        className="absolute bottom-4 right-4"
        disabled={skillPoints < price}
        onClick={() => buyChosenSkill(id)}
      >
        {unlocked
          ? 'Куплено'
          : price > skillPoints
            ? 'Нет хватает ОУ'
            : 'Купить'}
      </button>
      <div className="p-4 text-2xl text-shadow-lg">{name}</div>
      <div className="p-4 text-md text-shadow-lg">{description}</div>
      <div className="p-4 text-lg text-shadow-lg">
        {'Цена: ' + price + 'ОУ'}
      </div>
    </div>
  );
};
export default SkillHelper;
