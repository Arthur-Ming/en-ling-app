import { createSelector } from '@reduxjs/toolkit';
import { selector, Selector } from '.';
import { IUserWordsState } from '../reducer/userWords';
import { RootState } from '../store';

const userWordsStateSelector: Selector<IUserWordsState> = (state, field) =>
  selector(state, 'userWords')[field];

const userWordsSelector = (state: RootState) => userWordsStateSelector(state, 'entities');

export const userWordsListSelector = createSelector(userWordsSelector, Object.values);

export const userWordsByIdSelector = (state: RootState, { wordId }: { wordId: string }) =>
  userWordsSelector(state)[wordId];
