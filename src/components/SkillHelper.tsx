import { sendBuySkill } from '../api';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectSkillPoints, selectUserId } from '../app/selectors';
import GameButton from '../elements/GameButton';
import GameText from '../elements/GameText';
import { selectSkillById } from '../state/skillsSlice';
import { buySkill } from '../state/thunk';

const SkillHelper = ({
  skillId,
  onClose,
}: {
  skillId: number;
  onClose: () => void;
}) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const skillPoints = useAppSelector(selectSkillPoints);
  const skill = useAppSelector((state) => selectSkillById(state, skillId));

  if (!skill) return;

  const { name, description, price, unlocked } = skill;

  const buyChosenSkill = (id: number) => {
    dispatch(buySkill(id));
    sendBuySkill(id, userId);
  };

  return (
    <div className="fixed p-8 top-0 w-full bg-blue-950/80 z-50 text-tortik-white border-2 border-solid">
      <GameButton
        icon="skills/cross.png"
        size="small"
        theme="red"
        onClick={onClose}
        className="absolute top-4 right-4"
      />
      <div className="flex flex-col gap-4 ">
        <GameText
          size="md"
          text={name}
          className="border-2 border-solid p-1 bg-blue-950/80"
        />
        <GameText size="sm" text={description} />
        <GameText size="sm" text={'Цена: ' + price + ' оу'} />
        {!unlocked && (
          <GameButton
            text={price > skillPoints ? 'Не хватает ОУ' : 'КУПИТЬ'}
            theme="space"
            bordered={false}
            size="small"
            onClick={() => buyChosenSkill(skillId)}
            disabled={skillPoints < price}
          />
        )}
      </div>
    </div>
  );
};
export default SkillHelper;
