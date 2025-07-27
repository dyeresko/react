import './App.css';
import Controls from './components/Controls/Controls.tsx';
import Results from './components/Results/Results/Results.tsx';
import MyErrorBoundary from './components/MyErrorBoundary.tsx';
import useLocalStorage from '../hooks/useLocalStorage.tsx';

function App() {
  const [storageSearchResult, setStorageSearchResult] = useLocalStorage(
    'searchResult',
    ''
  );

  const onSearch = (value: string) => {
    setStorageSearchResult(value.trim());
  };
  return (
    <div className="App">
      <Controls onSearch={onSearch} />
      <MyErrorBoundary>
        <Results searchResult={storageSearchResult} />
      </MyErrorBoundary>
    </div>
  );
}

export default App;
