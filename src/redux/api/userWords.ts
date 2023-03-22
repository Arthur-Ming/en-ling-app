import Cookies from 'js-cookie';
import { IUser, ILoginBody, IUserWords, ITextbookWord } from '../../interfaces';
import { getUserId } from '../../utils/cookies';
import { login } from '../reducer/session';
import { addUserWord, addUserWords, removeUserWord } from '../reducer/userWords';
import { api } from './';

interface IUserWordsBody {
  wordId: string;
}

const userWordsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addUserWord: builder.mutation<ITextbookWord, ITextbookWord>({
      query: (word) => {
        const userId = getUserId();

        return {
          url: `/users/${userId}/words/${word.id}`,
          method: 'POST',
        };
      },
      async onQueryStarted(word, { queryFulfilled, dispatch }) {
        try {
          dispatch(addUserWord(word));
          await queryFulfilled;
        } catch (error) {
          dispatch(removeUserWord(word));
        }
      },
    }),
    removeUserWord: builder.mutation<IUserWords, ITextbookWord>({
      query: (word) => {
        const userId = getUserId();
        return {
          url: `/users/${userId}/words/${word.id}`,
          method: 'DELETE',
        };
      },
      async onQueryStarted(word, { queryFulfilled, dispatch }) {
        try {
          dispatch(removeUserWord(word));
          await queryFulfilled;
        } catch (error) {
          dispatch(addUserWord(word));
        }
      },
    }),
    loadUserWords: builder.query<IUserWords, null>({
      query: () => {
        const userId = getUserId();
        return {
          url: `/users/${userId}/words`,
          method: 'GET',
        };
      },
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          const { words } = data;
          dispatch(addUserWords(words));
        } catch (error) {}
      },
    }),
  }),
  overrideExisting: false,
});

export const { useLoadUserWordsQuery, useAddUserWordMutation, useRemoveUserWordMutation } =
  userWordsApi;
export const { useQueryState: useLoadUserWordsQueryState } = userWordsApi.endpoints.loadUserWords;
