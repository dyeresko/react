import '@/App.css';
import Results from '@components/Results/Results/index';
import MyErrorBoundary from '@components/MyErrorBoundary/index';
import useLocalStorage from '@/hooks/useLocalStorage.tsx';
import { useState } from 'react';
import { Outlet, useMatch } from 'react-router-dom';
import { useAppSelector } from '@/hooks/reduxHooks.ts';
import DownloadPanel from '@components/DownloadPanel/index';

function App() {
  const [storageSearchResult] = useLocalStorage('searchResult', '');
  const cards = useAppSelector((state) => state.cards.items);
  const [newPage] = useState('');
  const isPanelOpen = useMatch('/details/:id');

  return (
    <div className={isPanelOpen ? 'App' : ''}>
      <MyErrorBoundary>
        <Results newPage={newPage} searchResult={storageSearchResult} />
        {cards.length > 0 && <DownloadPanel />}
      </MyErrorBoundary>
      <Outlet />
    </div>
  );
}

export default App;
