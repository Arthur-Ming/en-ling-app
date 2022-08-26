import { AUDIO, LOAD_WORDS, STOP, TEXTBOOK_PAGE_CHANGE } from './constants';

import { ITextbookCardsAction, IAction } from '../interfaces';

export const getWords = (page: number, group: number): ITextbookCardsAction => ({
  type: LOAD_WORDS,
  CallAPI: `https://react-learnwords-example.herokuapp.com/words?page=${page}&group=${group}`,
  data: null,
  error: null,
  page,
  group,
});

export const pageChange = (): IAction => ({
  type: TEXTBOOK_PAGE_CHANGE,
});

export const audioStart = (
  audio: string,
  audioMeaning: string,
  audioExample: string,
  wordId: string
) => ({
  type: AUDIO,
  audioWord: audio,
  audioMeaning,
  audioExample,
  wordId,
  currentAudio: null,
});

export const audioStop = () => ({
  type: AUDIO + STOP,
});
