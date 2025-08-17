import { createRoot } from 'react-dom/client';
import '@/index.css';
import MainApp from '@components/MainApp/index';
import { Provider } from 'react-redux';
import { store } from '@/app/lib/store';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}
