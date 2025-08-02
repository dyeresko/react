import { createRoot } from 'react-dom/client';
import './index.css';
import MainApp from './components/Main/MainApp.tsx';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}
