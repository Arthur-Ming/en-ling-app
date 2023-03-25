import { IUserWords, IWord } from '../../interfaces';
import { arrToMap } from '../../utils/arrToMap';
import { getUserId } from '../../utils/cookies';
import { api } from './';

interface IUserWordsBody {
  wordId: string;
}

export const userWordsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    loadUserWords: builder.query<{ [key: string]: IWord }, void>({
      query: () => {
        const userId = getUserId();
        return {
          url: `/users/${userId}/words`,
          method: 'GET',
        };
      },

      transformResponse: (response: IUserWords) => arrToMap(response.words),
    }),
    addUserWord: builder.mutation<IWord, IWord>({
      query: (word) => {
        const userId = getUserId();

        return {
          url: `/users/${userId}/words/${word.id}`,
          method: 'POST',
        };
      },
      async onQueryStarted(word, { queryFulfilled, dispatch }) {
        const patchResult = dispatch(
          userWordsApi.util.updateQueryData('loadUserWords', undefined, (draft) => {
            draft[word.id] = word;
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),
    removeUserWord: builder.mutation<IUserWords, IWord>({
      query: (word) => {
        const userId = getUserId();
        return {
          url: `/users/${userId}/words/${word.id}`,
          method: 'DELETE',
        };
      },
      async onQueryStarted(word, { queryFulfilled, dispatch }) {
        const patchResult = dispatch(
          userWordsApi.util.updateQueryData('loadUserWords', undefined, (draft) => {
            delete draft[word.id];
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoadUserWordsQuery,
  useAddUserWordMutation,
  useRemoveUserWordMutation,
  useLazyLoadUserWordsQuery,
} = userWordsApi;

export const { useQueryState: useLoadUserWordsQueryState } = userWordsApi.endpoints.loadUserWords;
