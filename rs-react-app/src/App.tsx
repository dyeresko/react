import './App.css';
import Results from './components/Results/Results/Results.tsx';
import MyErrorBoundary from './components/MyErrorBoundary.tsx';
import useLocalStorage from '../hooks/useLocalStorage.tsx';
import { useState } from 'react';
import { Outlet, useMatch } from 'react-router-dom';

function App() {
  const [storageSearchResult] = useLocalStorage<string>('searchResult', '');
  const [newPage] = useState('');
  const isPanelOpen = useMatch('/details/:id');

  return (
    <div className={isPanelOpen ? 'App' : ''}>
      <MyErrorBoundary>
        <Results newPage={newPage} searchResult={storageSearchResult} />
      </MyErrorBoundary>
      <Outlet />
    </div>
  );
}

export default App;
