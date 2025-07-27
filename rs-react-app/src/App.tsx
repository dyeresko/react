import { useEffect, useState } from 'react';
import './App.css';
import Controls from './components/Controls/Controls.tsx';
import Results from './components/Results/Results/Results.tsx';
import MyErrorBoundary from './components/MyErrorBoundary.tsx';

function App() {
  const [searchResult, setSearchResult] = useState('');

  useEffect(() => {
    const localSearchResult = localStorage.getItem('searchResult');
    if (localSearchResult !== null) {
      setSearchResult(localSearchResult);
    }
  }, [searchResult]);

  const onSearch = (value: string) => {
    setSearchResult(value.trim());
    localStorage.setItem('searchResult', value.trim());
  };
  return (
    <div className="App">
      <Controls onSearch={onSearch} />
      <MyErrorBoundary>
        <Results searchResult={searchResult} />
      </MyErrorBoundary>
    </div>
  );
}

export default App;
