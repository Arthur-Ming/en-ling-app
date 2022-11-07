import {
  DifficultyUserWord,
  IAddUsersWordsAction,
  IAggregatedWord,
  ITextbookUserWord,
  ITextbookUserWordAction,
  ITextbookWord,
  IUpdateUsersWordsAction,
  IPaginatedResult,
  IDeleteUsersWordsAction,
} from '../../interfaces';
import { apiRoutes } from '../../utils/apiRoutes';
import { Dispatch } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../store';

import {
  ADD_USERS_WORDS,
  FAILURE,
  LOAD_USERS_WORDS,
  REQUEST,
  SUCCESS,
  UPDATE_USERS_WORDS,
  DELETE_USERS_WORDS,
} from '../action-types';
import { TOKEN, USER_ID } from '../../constants';
import Cookies from 'js-cookie';
import fetchJson from '../../utils/fetch-json';
import { textbookWordByIdSelector, textbookWordsSelector } from '../selectors/textbook';
import { userIsAuthSelector } from '../selectors/user';
import {
  userWordsByIdSelector,
  userWordsLoadedSelector,
  userWordsLoadingSelector,
} from '../selectors/userWords';

const formatWordToUserWord = (
  {
    id,
    group,
    page,
    word,
    image,
    audio,
    audioMeaning,
    audioExample,
    textMeaning,
    textExample,
    transcription,
    textExampleTranslate,
    textMeaningTranslate,
    wordTranslate,
  }: ITextbookWord,
  difficulty: DifficultyUserWord
): IPaginatedResult => ({
  _id: id,
  group,
  page,
  word,
  image,
  audio,
  audioMeaning,
  audioExample,
  textMeaning,
  textExample,
  transcription,
  textExampleTranslate,
  textMeaningTranslate,
  wordTranslate,
  userWord: { difficulty },
});

export const getUsersWords =
  () => async (dispatch: Dispatch<ITextbookUserWordAction>, getState: () => RootState) => {
    const state = getState();
    const userId = Cookies.get(USER_ID);
    const token = Cookies.get(TOKEN);

    const loaded = userWordsLoadedSelector(state);
    const loading = userWordsLoadingSelector(state);

    if (loaded || loading) return;

    if (userId && token) {
      dispatch({ type: LOAD_USERS_WORDS + REQUEST });
      try {
        const [aggregatedWords]: IAggregatedWord[] = await fetchJson(
          apiRoutes.usersAggregatedWords(userId),
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }
        );
        dispatch({ type: LOAD_USERS_WORDS + SUCCESS, data: aggregatedWords.paginatedResults });
      } catch (err: unknown) {
        if (err instanceof Error) {
          dispatch({ type: LOAD_USERS_WORDS + FAILURE, error: err.message });
        }
      }
    }
  };

export const addUsersWord =
  (wordId: string, difficulty: DifficultyUserWord) =>
  async (dispatch: Dispatch<IAddUsersWordsAction>, getState: () => RootState) => {
    const userId = Cookies.get(USER_ID);
    const token = Cookies.get(TOKEN);
    const state = getState();
    const word = textbookWordByIdSelector(state, wordId);

    if (userId && token && word) {
      const userWord = formatWordToUserWord(word, difficulty);
      dispatch({ type: ADD_USERS_WORDS + REQUEST, word: userWord });

      try {
        const data = await fetchJson(apiRoutes.usersWordsById(userId, wordId), {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            difficulty,
            optional: {},
          }),
        });
        console.log(data);
        dispatch({
          type: ADD_USERS_WORDS + SUCCESS,
          word: userWord,
        });
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.log(err);
          // dispatch({ type: LOAD_USERS_WORDS + FAILURE, error: err.message });
        }
      }
    }
  };

export const updateUsersWord =
  (wordId: string, difficulty: DifficultyUserWord) =>
  async (dispatch: Dispatch<IUpdateUsersWordsAction>, getState: () => RootState) => {
    const userId = Cookies.get(USER_ID);
    const token = Cookies.get(TOKEN);

    if (userId && token) {
      dispatch({ type: UPDATE_USERS_WORDS + REQUEST, wordId });

      try {
        const data = await fetchJson(apiRoutes.usersWordsById(userId, wordId), {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            difficulty,
            optional: {},
          }),
        });
        console.log(data);
        dispatch({
          type: UPDATE_USERS_WORDS + SUCCESS,
          wordId,
          userWord: {
            difficulty,
          },
        });
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.log(err);
          // dispatch({ type: LOAD_USERS_WORDS + FAILURE, error: err.message });
        }
      }
    }
  };

export const setUsersWord =
  (wordId: string, difficulty: DifficultyUserWord) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const userWord = userWordsByIdSelector(state, wordId);

    if (!userWord) {
      console.log('addWord');
      dispatch(addUsersWord(wordId, difficulty));
    }

    if (userWord) {
      console.log('update');
      dispatch(updateUsersWord(wordId, difficulty));
    }
  };

export const deleteUsersWord =
  (wordId: string) =>
  async (dispatch: Dispatch<IDeleteUsersWordsAction>, getState: () => RootState) => {
    const userId = Cookies.get(USER_ID);
    const token = Cookies.get(TOKEN);
    const state = getState();

    if (userId && token) {
      console.log('deleteUsersWord');
      console.log(wordId);
      dispatch({ type: DELETE_USERS_WORDS + REQUEST, wordId });
      try {
        const data = await fetch(apiRoutes.usersWordsById(userId, wordId), {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(data);
        dispatch({ type: DELETE_USERS_WORDS + SUCCESS, wordId });
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.log(err);
          // dispatch({ type: LOAD_USERS_WORDS + FAILURE, error: err.message });
        }
      }
    }
  };
