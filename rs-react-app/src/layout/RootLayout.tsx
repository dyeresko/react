import { Outlet } from 'react-router-dom';
import Controls from '@components/Controls/index';
import '@/App.css';
import useLocalStorage from '@/hooks/useLocalStorage.tsx';
import useUpdateSearchParams from '@/hooks/useUpdateSearchParams';

const RootLayout = () => {
  const [, setStorageSearchResult] = useLocalStorage('searchResult', '');
  const updateSearchParams = useUpdateSearchParams();

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
  return (
    <>
      <Controls onNewPage={onNewPage} onSearch={onSearch} />
      <Outlet />
    </>
  );
};

export default RootLayout;
