import { Outlet } from 'react-router-dom';
import Controls from '@components/Controls/index';
import '@/App.css';
import useLocalStorage from '@/hooks/useLocalStorage.tsx';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const RootLayout = () => {
  const [, setStorageSearchResult] = useLocalStorage('searchResult', '');
  const [, setNewPage] = useState('');
  const [, setSearchParams] = useSearchParams();

  const onSearch = (value: string) => {
    setStorageSearchResult(value.trim());
    setSearchParams((prev) => {
      prev.set('page', '1');
      prev.set('name', value);
      return prev;
    });
  };
  const onNewPage = (value: string) => {
    setNewPage(value);
    const url = new URL(value);
    const page = url.searchParams.get('page');
    const name = url.searchParams.get('name');
    setSearchParams((prev) => {
      if (page) {
        prev.set('page', String(page));
      }
      if (name) {
        prev.set('name', name);
      }
      return prev;
    });
  };
  return (
    <>
      <Controls onNewPage={onNewPage} onSearch={onSearch} />
      <Outlet />
    </>
  );
};

export default RootLayout;
