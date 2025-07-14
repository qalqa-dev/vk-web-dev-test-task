import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { rootStore, StoreContext } from './stores/RootStore.ts';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <ConfigProvider>
    <AdaptivityProvider>
      <StoreContext.Provider value={rootStore}>
        <App></App>
      </StoreContext.Provider>
    </AdaptivityProvider>
  </ConfigProvider>,
);
