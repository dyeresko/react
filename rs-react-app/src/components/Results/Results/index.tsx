import { useContext, useEffect, useState, type FC } from 'react';
import classes from '@components/Results/Results/Results.module.css';
import ErrorButton from '@components/Results/ErrorButton';
import logo from '@/assets/react.svg';
import ResultList from '@components/Results/ResultList/index';
import { PaginationDataContext } from '@/hooks/PaginationDataContext.tsx';
import { useSearchParams } from 'react-router-dom';
import type { Character } from '@/types/interfaces';
import useUpdateSearchParams from '@/hooks/useUpdateSearchParams';
import { useGetResultsQuery } from '@/app/services/api';
import useLocalStorage from '@/hooks/useLocalStorage';

const Results: FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const paginationContext = useContext(PaginationDataContext);
  const [searchParams] = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();
  const page = Number(searchParams.get('page') || '1');
  const name = searchParams.get('name') || '';
  const [, setStorageSearchResult] = useLocalStorage('searchResult', '');

  const { data, error, isFetching } = useGetResultsQuery({ page, name });

  useEffect(() => {
    updateSearchParams({ page: String(page), name: name });
    setStorageSearchResult(name);
  }, [page, name]);

  useEffect(() => {
    if (data?.results) {
      setCharacters(data.results);
    }
    if (data?.info) {
      paginationContext?.setPaginationData(data.info);
    }
  }, [data]);

  return (
    <div>
      <div>
        {isFetching && (
          <img
            data-testid="loader"
            className="logo"
            src={logo}
            alt="Loading..."
          />
        )}
        {error && (
          <h2 data-testid="error" className={classes.header}>
            Request did not succeed
          </h2>
        )}
        {!error && !isFetching && <ResultList characters={characters} />}
        <ErrorButton />
      </div>
    </div>
  );
};

export default Results;
