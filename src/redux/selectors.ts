import { createSelector } from 'reselect';
import { RootState } from './store';

import { ITextbookState } from './reducer/textbook';
import { IAudioState } from './reducer/audio';

const textbookSelector = (state: RootState) => (<ITextbookState>state.textbook).entities;
export const textbookWordsSelector = createSelector(textbookSelector, Object.values);
export const textbookLoadingSelector = (state: RootState) =>
  (<ITextbookState>state.textbook).loading;
export const textbookLoadedSelector = (state: RootState) => (<ITextbookState>state.textbook).loaded;

export const textbookPageSelector = (state: RootState) => (<ITextbookState>state.textbook).page;
export const textbookGroupSelector = (state: RootState) => (<ITextbookState>state.textbook).group;

export const wordAudioByIdSelector = (state: RootState, wordId: string) => {
  return textbookSelector(state)[wordId]?.audio;
};

export const wordMeaningAudioByIdSelector = (state: RootState, wordId: string) => {
  return textbookSelector(state)[wordId]?.audioMeaning;
};

export const wordExampleAudioByIdSelector = (state: RootState, wordId: string) => {
  return textbookSelector(state)[wordId]?.audioExample;
};

export const currentAudioWordIdSelector = (state: RootState) => {
  return (<IAudioState>state.audio)?.wordId;
};
export const currentAudioPathSelector = (state: RootState) => {
  return (<IAudioState>state.audio)?.path;
};
