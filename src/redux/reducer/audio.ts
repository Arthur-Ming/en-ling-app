import { AUDIO, START, STOP, FAILURE } from '../constants';

import { AnyAction, createReducer } from '@reduxjs/toolkit';

export interface IAudioState {
  error: null | ErrorEvent;
  currentAudio: {
    path: string;
    wordId: string;
  } | null;
}

const initialState: IAudioState = {
  error: null,
  currentAudio: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(AUDIO + START, (state, action) => {
      const { currentAudio } = <AnyAction>action;
      state.currentAudio = currentAudio;
      state.error = null;
    })
    .addCase(AUDIO + STOP, (state) => {
      state.currentAudio = null;
    })
    .addCase(AUDIO + FAILURE, (state, action) => {
      const { error } = <AnyAction>action;
      state.currentAudio = null;
      state.error = error;
    });
});
