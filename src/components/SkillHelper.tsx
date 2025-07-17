import { sendBuySkill } from '../api';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectSkillById, selectUserId } from '../app/selectors';
import { buySkill } from '../state/gameSlice';

const SkillHelper = ({
  skillId,
  skillPoints,
  onClose,
}: {
  skillId: number;
  skillPoints: number;
  onClose: () => void;
}) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const skill = useAppSelector((state) => selectSkillById(state, skillId));

  if (!skill) return;

  const { name, description, price, unlocked } = skill;

  const buyChosenSkill = (id: number) => {
    dispatch(buySkill(id));
    sendBuySkill(id, userId);
  };

  return (
    <div className="fixed p-8 top-0 w-full bg-amber-900/60 z-10 text-tortik-white">
      <button className="bg-red-900 absolute top-4 right-4" onClick={onClose}>
        x
      </button>

      <div className="p-4 text-2xl text-shadow-lg">{name}</div>
      <div className="p-4 text-md text-shadow-lg">{description}</div>
      <div className="p-4 text-lg text-shadow-lg">
        {'Цена: ' + price + 'ОУ'}
      </div>
      {!unlocked && (
        <button
          className="bg-indigo-950"
          disabled={skillPoints < price}
          onClick={() => buyChosenSkill(skillId)}
        >
          {price > skillPoints ? 'Нет хватает ОУ' : 'Купить'}
        </button>
      )}
    </div>
  );
};
export default SkillHelper;
