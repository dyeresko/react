import './App.css';
import Results from './components/Results/Results/Results.tsx';
import MyErrorBoundary from './components/MyErrorBoundary.tsx';
import useLocalStorage from '../hooks/useLocalStorage.tsx';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  const [storageSearchResult] = useLocalStorage<string>('searchResult', '');
  const [newPage] = useState('');

  return (
    <div className="App">
      <MyErrorBoundary>
        <Results newPage={newPage} searchResult={storageSearchResult} />
      </MyErrorBoundary>
      <Outlet />
    </div>
  );
}

export default App;
