import { GameText } from '@/shared';

export function TextNote({
  index,
  message,
}: {
  index: number;
  message: string;
}) {
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
