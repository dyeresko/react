'use client';
import { type ChangeEvent, useState, useEffect, type FC, useMemo } from 'react';
import classes from '@components/Controls/Controls.module.css';
import useLocalStorage from '@/hooks/useLocalStorage.tsx';
import { useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';
import { toggleTheme } from '@/app/[locale]/lib/features/theme/themeSlice';
import { getPage } from '@/utils/utils';
import useUpdateSearchParams from '@/hooks/useUpdateSearchParams';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LocaleSwitcher from '../LocaleSwitcher';

const Controls: FC = () => {
  const [storageSearchResult, setStorageSearchResult] = useLocalStorage(
    'searchResult',
    ''
  );
  const updateSearchParams = useUpdateSearchParams();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (storageSearchResult && !searchParams.get('name')) {
      updateSearchParams({ name: storageSearchResult });
    }
  });
  const [searchResult, setSearchResult] = useState(storageSearchResult);
  const pagination = useAppSelector((state) => state.pagination.value);
  const page = useMemo(() => getPage(pagination), [pagination]);
  const t = useTranslations('Controls');
  const pages = useMemo(() => pagination.pages ?? '∞', [pagination.pages]);

  const onSearch = (value: string) => {
    setStorageSearchResult(value.trim());
    updateSearchParams({ name: value, page: '1' });
  };
  const onNewPage = (value: string) => {
    const url = new URL(value);
    const page = url.searchParams.get('page') ?? undefined;
    const name = url.searchParams.get('name') ?? undefined;
    updateSearchParams({ name, page });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchResult(e.target.value);
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
      <h2 className={classes.header}>Controls</h2>
      <button className={classes.themeButton} onClick={handleThemeChange}>
        {theme === 'white' ? '🌙' : '☀️'}
      </button>
      <LocaleSwitcher />
      <Link href={'/about'}>
        <button>{t('about')}</button>
      </Link>
      <input
        type="text"
        placeholder={t('placeholder')}
        value={searchResult}
        onChange={handleInputChange}
      />
      <button onClick={handleSearchClick}>{t('search')}</button>
      <button onClick={handleClearInputClick}>{t('clear')}</button>
      <div className={classes.pagination}>
        <button onClick={handlePrevClick}>{t('prev')}</button>
        {page}/{pages}
        <button onClick={handleNextClick}>{t('next')}</button>
      </div>
    </div>
  );
};

export default Controls;
