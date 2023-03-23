import { createSelector } from '@reduxjs/toolkit';
import { userWordsApi } from '../api/userWords';
import { RootState } from '../store';

const baseThingSelector = userWordsApi.endpoints.loadUserWords.select;

const userWordsSelector = (state: RootState) => baseThingSelector()(state).data || {};

export const userWordsListSelector = createSelector(userWordsSelector, Object.values);

export const userWordsByIdSelector = (state: RootState, { wordId }: { wordId: string }) => {
  const { data } = baseThingSelector()(state);
  if (data) return data[wordId];
};
