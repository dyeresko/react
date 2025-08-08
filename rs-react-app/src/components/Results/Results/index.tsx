import { useContext, useEffect, useState, type FC } from 'react';
import classes from '@components/Results/Results/Results.module.css';
import ErrorButton from '@components/Results/ErrorButton';
import logo from '@/assets/react.svg';
import ResultList from '@components/Results/ResultList/index';
import { PaginationDataContext } from '@/hooks/PaginationDataContext.tsx';
import { useSearchParams } from 'react-router-dom';
import type { Character, Response } from '@/types/interfaces';
import { baseApiQuery } from '@/data/data';
import useUpdateSearchParams from '@/hooks/useUpdateSearchParams';
import type { ResultsProps } from '@/types/types';

const Results: FC<ResultsProps> = ({ searchResult, newPage }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const paginationContext = useContext(PaginationDataContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [apiQuery, setApiQuery] = useState('');
  const [searchParams] = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();
  const page = Number(searchParams.get('page') || '1');
  const name = searchParams.get('name') || '';

  useEffect(() => {
    setLoading(true);
    if (searchResult) {
      const searchName = searchResult;
      setApiQuery(`${baseApiQuery}?name=${searchName}&page=1`);
    }
  }, [searchResult]);
  useEffect(() => {
    setLoading(true);
    if (newPage) {
      setApiQuery(newPage);
      return;
    }
    setApiQuery(`${baseApiQuery}?page=${page}&name=${name}`);
    updateSearchParams({ page: String(page), name: name });
  }, [newPage, page, name]);

  useEffect(() => {
    if (!apiQuery) return;
    setError(false);
    fetch(apiQuery)
      .then((response) => {
        if (!response.ok) {
          throw Error('Failed to fetch results.');
        }
        return response.json();
      })
      .then((data: Response) => {
        setTimeout(() => {
          if (data.results) {
            setLoading(false);
            setCharacters(data.results ?? []);
            paginationContext?.setPaginationData(data.info);
          }
        }, 200);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [apiQuery]);

  return (
    <div>
      <div>
        {loading && (
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
        {!error && !loading && <ResultList characters={characters} />}
        <ErrorButton />
      </div>
    </div>
  );
};

export default Results;
