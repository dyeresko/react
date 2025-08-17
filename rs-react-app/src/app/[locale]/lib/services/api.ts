import { type DetailedCharacter, type Response } from '@/types/interfaces';
import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

export const baseApiQuery = 'https://rickandmortyapi.com/api/';

const delayedBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return fetchBaseQuery({ baseUrl: baseApiQuery })(args, api, extraOptions);
};

export const rickAndMortyApi = createApi({
  reducerPath: 'RickAndMortyApi',
  baseQuery: delayedBaseQuery,
  endpoints: (build) => ({
    getResults: build.query<Response, { name?: string; page?: number }>({
      query: ({ page = 1, name }) => {
        return `character/?page=${page}${name ? `&name=${name}` : ''}`;
      },
    }),
    getResult: build.query<DetailedCharacter, { id: string }>({
      query: ({ id }) => {
        return `character/${id}`;
      },
    }),
  }),
});

export const { useGetResultsQuery, useGetResultQuery } = rickAndMortyApi;
