import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ITextbookWord } from '../../interfaces';
const baseUrl = 'http://localhost:8000';

interface ILoadWordsParams {
  page?: number | string;
  group?: number | string;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    loadWords: builder.query<ITextbookWord[], ILoadWordsParams>({
      query: ({ page, group }) => {
        console.log('call');
        return {
          url: `/words`,
          params: {
            page,
            group,
          },
        };
      },
    }),
  }),
});

export const { useLoadWordsQuery } = api;
export const { useQueryState: useLoadWordsQueryState } = api.endpoints.loadWords;
