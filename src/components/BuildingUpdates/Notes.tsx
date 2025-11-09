import React from 'react';
import GameText from '../../elements/GameText';
import { createPortal } from 'react-dom';
import { useAppSelector } from '../../app/hooks';
import { selectBuildingById } from '../../state/buildingsSlice';
import { LAB_ID } from '../../constants/const';
import GameButton from '../../elements/GameButton';

function Notes() {
  const [isOpened, setIsOpened] = React.useState(false);

  return (
    <>
      {isOpened && <NotesModal onClose={() => setIsOpened(false)} />}

      <div
        className={`flex flex-col gap-4 pixel-border--gr justify-between items-center p-4`}
      >
        <GameButton
          theme="brown"
          onClick={() => setIsOpened(true)}
          text="ЗАПИСКИ ПАВЛИКА"
          icon="skills/list.png"
        />
      </div>
    </>
  );
}
const messages: string[] = [
  'Наконец-то мы на острове "С", таинственном источнике так называемых "тортиков". Когда мы начали строить здесь, это место будто откликнулось, чем больше мы трудимся, тем больше получаем ресурса.',
  'У меня выстраивается стройная теория, уровень наших построек связан с нашим доходом. Я даже рассчитал число "/сек" и вывел на панель.',
  'Эксперименты показывают, что закон работает почти всегда. По какой-то причине иногда мы детектируем большее число прироста, чем рассчитано "/сек".',
  'Наблюдение показывает, что во время хаотических приростов орбитальный торт совершает колебательные движения.',
  'Странное дело, наши астрономы замечают увеличение количества звёзд на ночном небе. После появления некоторых звёзд "/сек" вырос?',
  'Стены амбара растут, причём так, чтобы в одну комнату вмещалось ровно 1800 "/сек". Все хотят от меня услышать какое-то объяснение... Я НЕ ЗНАЮ, ОКЕЙ????',
  'От ямы исходит какая-то зловещая энергия. Вот бы её изучить, но даже взгляд в сторону раскопок вызывает у меня холодок.',
  'ОУ мы изначально отображали на панели как "общий уровень" всех построек. Число само уменьшается, когда загорается новая звезда. Надя сказала, что орбитальный тортик подумал, якобы это ОЧКИ УЛУЧШЕНИЯ, и на них зажигает звёзды... По ней давно плачет Кащенко!',
  'Мою квантовую теорию высмеяли! Я точно уверен в существовании наблюдателя! Всё говорит о том, что когда он смотрит, то "/сек" зачисляется нам на счёт, а когда не смотрит то отправляется в амбар! Эти клоуны ещё попляшут!',
  'У орбитального тортика были замечены странные ящики. До открытия ящик находится в суперпозиции, а после принимает одно из трёх возможных состояний. События не равновероятны.',
  'Самый частовстречаемый ящик начисляет нам на счёт число 600 "/сек"',
  'Что происходит на базе тортика? Они депают в казике наши тортики и всё им сходит с рук! А их оккультные ритуалы призыва равновероятного бустера пора прекратить! Хотя если их силой действительно можно повысить шанс редкого ящика...',
  'Судя по всему, колодец отлично синергирует со студентами, интересно, что в нём за вода',
];

function TextNote({ index, message }: { index: number; message: string }) {
  return (
    <div className="flex flex-col items-start p-2">
      <GameText
        className="text-blue-900"
        theme="brown"
        size="sm"
        text={`#${index}`}
      />
      <GameText
        className="text-blue-900"
        theme="brown"
        size="sm"
        text={message}
      />
    </div>
  );
}

function NotesModal({ onClose }: { onClose: () => void }) {
  const root = document.getElementById('notes-root');
  const { level } = useAppSelector((state) =>
    selectBuildingById(state, LAB_ID),
  );
  if (!root) return null;

  const showedMEssages = messages.slice(0, level / 5 + 1);

  return createPortal(
    <div className="absolute z-5000 inset-0 p-4 flex flex-col items-center gap-2 bg-red-950 justify-center">
      <div className="border-t-8 border-b-8 border-emerald-700 shadow-lg w-full flex flex-col gap-4 overflow-scroll">
        <div className="border-l-8 border-r-8 border-emerald-700 bg-amber-100 notebook">
          {showedMEssages.map((message, index) => (
            <div>
              <TextNote message={message} index={index + 1} />
              {!((index + 1) % 5) && (
                <div className="w-full h-2 bg-emerald-700" />
              )}
            </div>
          ))}
          {messages.length > showedMEssages.length && (
            <TextNote
              message={`${messages[showedMEssages.length].slice(0, 15)}...`}
              index={showedMEssages.length + 1}
            />
          )}
        </div>
      </div>
      <GameButton
        theme="red"
        onClick={onClose}
        text="Закрыть"
        icon="skills/cross.png"
      />
    </div>,
    root,
  );
}

export default React.memo(Notes);
