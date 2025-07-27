import { type ChangeEvent, useEffect, useState } from 'react';
import classes from './Controls.module.css';
interface IProps {
  onSearch: (searchResult: string) => void;
}
function Controls(props: IProps) {
  const [searchResult, setSearchResult] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchResult(e.target.value);
  };

  useEffect(() => {
    const localSearchResult = localStorage.getItem('searchResult');
    if (localSearchResult !== null) {
      setSearchResult(localSearchResult);
    }
  }, []);
  return (
    <div className={classes.controls}>
      <h2>Controls</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchResult}
        onChange={handleInputChange}
      />
      <button
        onClick={() => {
          setSearchResult(searchResult.trim());
          props.onSearch(searchResult);
        }}
      >
        Search
      </button>
    </div>
  );
}

export default Controls;
