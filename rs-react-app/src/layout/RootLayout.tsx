import { Outlet, useSearchParams } from 'react-router-dom';
import Controls from '@components/Controls/index';
import '@/App.css';
import useLocalStorage from '@/hooks/useLocalStorage.tsx';
import useUpdateSearchParams from '@/hooks/useUpdateSearchParams';
import { useEffect, type FC } from 'react';

const RootLayout: FC = () => {
  const [storageSearchResult, setStorageSearchResult] = useLocalStorage(
    'searchResult',
    ''
  );
  const updateSearchParams = useUpdateSearchParams();
  const [searchParams] = useSearchParams();

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
  useEffect(() => {
    if (storageSearchResult && !searchParams.get('name')) {
      updateSearchParams({ name: storageSearchResult });
    }
  });
  return (
    <>
      <Controls onNewPage={onNewPage} onSearch={onSearch} />
      <Outlet />
    </>
  );
};

export default RootLayout;
