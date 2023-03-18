import { ITextbookWord } from '../../interfaces';
import { api } from './';

interface ILoadWordsParams {
  page?: number | string;
  group?: number | string;
}

const wordsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    loadWords: builder.query<ITextbookWord[], ILoadWordsParams>({
      query: ({ page, group }) => {
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
  overrideExisting: false,
});

export const { useLoadWordsQuery } = wordsApi;
export const { useQueryState: useLoadWordsQueryState } = wordsApi.endpoints.loadWords;
