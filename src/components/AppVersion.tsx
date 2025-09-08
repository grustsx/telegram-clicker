import { useAppSelector } from '../app/hooks';
import { selectUserId } from '../app/selectors';

export default function AppVersion() {
  const id = useAppSelector(selectUserId);

  return (
    <div className="text-sm text-gray-400 absolute bottom-1 right-4">
      {`${id} v${__APP_VERSION__}`}
    </div>
  );
}
