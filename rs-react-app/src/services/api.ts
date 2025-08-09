import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

export const baseApiQuery = 'https://rickandmortyapi.com/api/';

export const rickAndMortyApi = createApi({
  reducerPath: 'RickAndMortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseApiQuery }),
  endpoints: () => ({}),
});
