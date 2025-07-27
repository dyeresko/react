import { type ChangeEvent } from 'react';
import classes from './Controls.module.css';
import useLocalStorage from '../../../hooks/useLocalStorage.tsx';

interface IProps {
  onSearch: (searchResult: string) => void;
}
function Controls(props: IProps) {
  const [storageSearchResult, setStorageSearchResult] = useLocalStorage(
    'searchResult',
    ''
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStorageSearchResult(e.target.value);
  };
  return (
    <div className={classes.controls}>
      <h2>Controls</h2>
      <input
        type="text"
        placeholder="Search..."
        value={storageSearchResult}
        onChange={handleInputChange}
      />
      <button
        onClick={() => {
          props.onSearch(storageSearchResult);
        }}
      >
        Search
      </button>
    </div>
  );
}

export default Controls;
