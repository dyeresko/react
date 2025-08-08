import { type ChangeEvent, useState, useContext, useEffect } from 'react';
import classes from '@components/Controls/Controls.module.css';
import useLocalStorage from '@/hooks/useLocalStorage.tsx';
import { PaginationDataContext } from '@/hooks/PaginationDataContext.tsx';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';
import { toggleTheme } from '@/features/theme/themeSlice.ts';
import type { ControlsProps } from '@/types/interfaces';
import { getPage } from '@/utils/utils';

function Controls(props: ControlsProps) {
  const [storageSearchResult] = useLocalStorage('searchResult', '');
  const [searchResult, setSearchResult] = useState(storageSearchResult);
  const paginationContext = useContext(PaginationDataContext);
  const navigate = useNavigate();
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchResult(e.target.value);
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
      <button
        onClick={() => {
          navigate('/about');
        }}
      >
        About
      </button>
      <input
        type="text"
        placeholder="Search..."
        value={searchResult}
        onChange={handleInputChange}
      />
      <button
        onClick={() => {
          setSearchResult(searchResult.trim());
          props.onSearch(searchResult.trim());
        }}
      >
        Search
      </button>
      <button
        onClick={() => {
          localStorage.clear();
          setSearchResult('');
        }}
      >
        Clear Input
      </button>
      <div className={classes.pagination}>
        <button
          onClick={() => {
            if (paginationContext?.paginationData.prev) {
              props.onNewPage(paginationContext.paginationData.prev);
            }
          }}
        >
          Prev
        </button>
        {getPage(
          paginationContext?.paginationData ?? {
            count: 0,
            pages: 0,
            prev: null,
            next: null,
          }
        )}
        /
        {paginationContext?.paginationData.pages === 0
          ? '∞'
          : paginationContext?.paginationData.pages}
        <button
          onClick={() => {
            if (paginationContext?.paginationData.next) {
              props.onNewPage(paginationContext.paginationData.next);
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Controls;
