import { type ChangeEvent, useState, useEffect, type FC, useMemo } from 'react';
import classes from '@components/Controls/Controls.module.css';
import useLocalStorage from '@/hooks/useLocalStorage.tsx';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';
import { toggleTheme } from '@/features/theme/themeSlice.ts';
import type { ControlsProps } from '@/types/types';
import { getPage } from '@/utils/utils';

const Controls: FC<ControlsProps> = ({ onNewPage, onSearch }) => {
  const [storageSearchResult] = useLocalStorage('searchResult', '');
  const [searchResult, setSearchResult] = useState(storageSearchResult);
  const navigate = useNavigate();
  const pagination = useAppSelector((state) => state.pagination.value);
  const page = useMemo(() => getPage(pagination), [pagination]);

  const pages = useMemo(() => pagination.pages ?? '∞', [pagination.pages]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchResult(e.target.value);
  };

  const handleAboutClick = () => {
    navigate('/about');
  };

  const handleSearchClick = () => {
    setSearchResult(searchResult.trim());
    onSearch(searchResult.trim());
  };

  const handleClearInputClick = () => {
    localStorage.clear();
    setSearchResult('');
  };

  const handlePrevClick = () => {
    if (pagination.prev) {
      onNewPage(pagination.prev);
    }
  };

  const handleNextClick = () => {
    if (pagination.next) {
      onNewPage(pagination.next);
    }
  };
  const theme = useAppSelector((state) => state.theme.style);
  const dispatch = useAppDispatch();
  const handleThemeChange = () => {
    dispatch(toggleTheme());
  };
  useEffect(() => {
    document.documentElement.setAttribute('data-theme-style', theme);
  }, [theme]);
  return (
    <div className={classes.controls}>
      <h2>Controls</h2>
      <button className={classes.themeButton} onClick={handleThemeChange}>
        {theme === 'white' ? '🌙' : '☀️'}
      </button>
      <button onClick={handleAboutClick}>About</button>
      <input
        type="text"
        placeholder="Search..."
        value={searchResult}
        onChange={handleInputChange}
      />
      <button onClick={handleSearchClick}>Search</button>
      <button onClick={handleClearInputClick}>Clear Input</button>
      <div className={classes.pagination}>
        <button onClick={handlePrevClick}>Prev</button>
        {page}/{pages}
        <button onClick={handleNextClick}>Next</button>
      </div>
    </div>
  );
};

export default Controls;
