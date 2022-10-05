import { createSelector } from 'reselect';
import { RootState } from '../store';
import { ITextbookState } from '../reducer/textbook';
import { selector, Selector } from '.';

const textbookSelector: Selector<ITextbookState> = (state, field) =>
  selector(state, 'textbook')[field];

const textbookEntitiesSelector = (state: RootState) => textbookSelector(state, 'entities');

export const textbookWordsSelector = createSelector(textbookEntitiesSelector, Object.values);

export const textbookLoadingSelector = (state: RootState) => textbookSelector(state, 'loading');
export const textbookLoadedSelector = (state: RootState) => textbookSelector(state, 'loaded');
export const textbookPageSelector = (state: RootState) => textbookSelector(state, 'page');
export const textbookGroupSelector = (state: RootState) => textbookSelector(state, 'group');

export const wordAudioByIdSelector = (state: RootState, wordId: string) => {
  return textbookEntitiesSelector(state)[wordId]?.audio;
};

export const wordMeaningAudioByIdSelector = (state: RootState, wordId: string) => {
  return textbookEntitiesSelector(state)[wordId]?.audioMeaning;
};

export const wordExampleAudioByIdSelector = (state: RootState, wordId: string) => {
  return textbookEntitiesSelector(state)[wordId]?.audioExample;
};
