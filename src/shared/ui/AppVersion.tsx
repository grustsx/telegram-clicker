import { APP_VERSION } from '../config/appVersion';

export default function AppVersion() {
  return (
    <div className="text-sm text-gray-400 absolute bottom-1 right-4">
      {`v${APP_VERSION}`}
    </div>
  );
}
