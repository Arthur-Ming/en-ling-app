import { AUDIO, START, STOP, FAILURE } from '../constants';

import { AnyAction, createReducer } from '@reduxjs/toolkit';
import { IAudioAction } from '../../interfaces';

export interface IAudioState {
  error: null | unknown;
  path: string | null;
  wordId: string | null;
}

const initialState: IAudioState = {
  error: null,
  path: null,
  wordId: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(AUDIO + START, (state, action) => {
      const { path = null, wordId = null } = <IAudioAction>action;
      state.path = path;
      state.wordId = wordId;
      state.error = null;
    })
    .addCase(AUDIO + STOP, (state) => {
      state.path = null;
      state.wordId = null;
    })
    .addCase(AUDIO + FAILURE, (state, action) => {
      const { error = 'error' } = <IAudioAction>action;
      state.path = null;
      state.wordId = null;
      state.error = error;
    });
});
