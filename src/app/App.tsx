import './styles/App.css';

import { AppProviders } from './providers/AppProviders';
import { useAuthorizeTgUser } from './model/useAuthorizeTgUser';
import { useGameEffects } from './model/useGameEffects';

function App() {
  useAuthorizeTgUser();
  useGameEffects();

  return <AppProviders />;
}

export default App;
