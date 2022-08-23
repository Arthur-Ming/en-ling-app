import { createSelector } from 'reselect';
import { RootState } from './store';

import { ITextbookState } from './reducer/textbook';

const textbookSelector = (state: RootState) => (<ITextbookState>state.textbook).entities;
export const textbookListSelector = createSelector(textbookSelector, Object.values);
export const textbookLoadingSelector = (state: RootState) =>
  (<ITextbookState>state.textbook).loading;
export const textbookLoadedSelector = (state: RootState) => (<ITextbookState>state.textbook).loaded;

export const textbookPageSelector = (state: RootState) => (<ITextbookState>state.textbook).page;
export const textbookGroupSelector = (state: RootState) => (<ITextbookState>state.textbook).group;
