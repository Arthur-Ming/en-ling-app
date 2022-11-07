import { createSelector } from 'reselect';
import { RootState } from '../store';
import { selector, Selector } from '.';
import { IUserWordsState } from '../reducer/userWords';
import { IPaginatedResult, ITextbookWord } from '../../interfaces';

const userWordsSelector: Selector<IUserWordsState> = (state, field) =>
  selector(state, 'userWords')[field];

const userWordsEntitiesSelector = (state: RootState) => userWordsSelector(state, 'entities');

export const userWordsArrSelector = createSelector(userWordsEntitiesSelector, Object.values);

export const userWordsLoadingSelector = (state: RootState) => userWordsSelector(state, 'loading');
export const userWordsLoadedSelector = (state: RootState) => userWordsSelector(state, 'loaded');

export const userWordsByIdSelector = (state: RootState, wordId: string) =>
  userWordsEntitiesSelector(state)[wordId];

export const userWordsDifficultySelector = (state: RootState, wordId: string) =>
  userWordsByIdSelector(state, wordId)?.userWord?.difficulty;

export const userHardWordsArrSelector = createSelector(
  userWordsArrSelector,
  (words: IPaginatedResult[]): ITextbookWord[] => {
    return words
      .filter(({ userWord }) => userWord?.difficulty === 'hard')
      .map(
        ({
          _id,
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
        }) => ({
          id: _id,
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
        })
      );
  }
);
