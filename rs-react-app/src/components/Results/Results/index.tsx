'use client';
import { useEffect, type FC } from 'react';
import classes from '@components/Results/Results/Results.module.css';
import ErrorButton from '@components/Results/ErrorButton';
import logo from '@/assets/react.svg';
import ResultList from '@components/Results/ResultList/index';
import { useSearchParams } from 'next/navigation';
import type { Response } from '@/types/interfaces';
import useUpdateSearchParams from '@/hooks/useUpdateSearchParams';
import { useGetResultsQuery } from '@/app/[locale]/lib/services/api';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { setPagination } from '@/app/[locale]/lib/features/pagination/paginationSlice';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const Results: FC<{ initPage: number; response: Response | null }> = ({
  initPage,
  response,
}) => {
  const t = useTranslations('Result');
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();
  const page = Number(searchParams.get('page') || '1');
  const name = searchParams.get('name') || '';
  const [, setStorageSearchResult] = useLocalStorage('searchResult', '');
  const { data, error, isFetching, refetch } = useGetResultsQuery(
    {
      page,
      name,
    },
    { skip: page === initPage }
  );
  const res = page === initPage ? response : data || null;

  useEffect(() => {
    updateSearchParams({ page: String(page), name: name });
    setStorageSearchResult(name);
    if (data?.info) {
      dispatch(setPagination(data.info));
    }
    if (page === 1) {
      if (res?.info) {
        dispatch(setPagination(res?.info));
      }
    }
  }, [page, name, initPage, res, data]);

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
          alt={`${t('alt-loading')}...`}
        />
      </div>
    );
  }

  if (error) {
    return (
      <h2 className={classes.header} data-testid="error">
        {t('error')}
      </h2>
    );
  }

  return (
    <div>
      <button onClick={handleRefreshClick}>{t('refresh')}</button>
      <div>
        <ResultList characters={res?.results} />
        <ErrorButton />
      </div>
    </div>
  );
};

export default Results;
