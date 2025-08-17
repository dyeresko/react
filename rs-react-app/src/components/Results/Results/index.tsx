'use client';
import { useEffect, useState, type FC } from 'react';
import classes from '@components/Results/Results/Results.module.css';
import ErrorButton from '@components/Results/ErrorButton';
import logo from '@/assets/react.svg';
import ResultList from '@components/Results/ResultList/index';
import { useSearchParams } from 'next/navigation';
import type { Character } from '@/types/interfaces';
import useUpdateSearchParams from '@/hooks/useUpdateSearchParams';
import { useGetResultsQuery } from '@/app/lib/services/api';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { setPagination } from '@/app/lib/features/pagination/paginationSlice';
import Image from 'next/image';

const Results: FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();
  const page = Number(searchParams.get('page') || '1');
  const name = searchParams.get('name') || '';
  const [, setStorageSearchResult] = useLocalStorage('searchResult', '');

  const { data, error, isFetching, refetch } = useGetResultsQuery({
    page,
    name,
  });

  useEffect(() => {
    updateSearchParams({ page: String(page), name: name });
    setStorageSearchResult(name);
  }, [page, name]);

  useEffect(() => {
    if (data?.results) {
      setCharacters(data.results);
    }
    if (data?.info) {
      dispatch(setPagination(data.info));
    }
  }, [data]);

  const handleRefreshClick = () => {
    refetch();
  };
  if (isFetching) {
    return (
      <div>
        <Image
          width={300}
          height={300}
          data-testid="loader"
          className="logo"
          src={logo}
          alt="Loading..."
        />
      </div>
    );
  }

  if (error) {
    return (
      <h2 className={classes.header} data-testid="error">
        Request did not succeed
      </h2>
    );
  }

  return (
    <div>
      <button onClick={handleRefreshClick}>Refresh</button>
      <div>
        <ResultList characters={characters} />
        <ErrorButton />
      </div>
    </div>
  );
};

export default Results;
