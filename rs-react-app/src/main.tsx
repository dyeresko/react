import { createRoot } from 'react-dom/client';
import './index.css';
import MainApp from './components/Main/MainApp.tsx';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<MainApp />);
}
