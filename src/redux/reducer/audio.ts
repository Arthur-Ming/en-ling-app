import { createReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAudioAction } from '../../interfaces';
import { AUDIO, FAILURE, START, STOP } from '../action-types';

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

/* export default createReducer(initialState, (builder) => {
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
 */

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    audioStart(state, action: PayloadAction<IAudioAction>) {
      const { path = null, wordId = null } = action.payload;
      state.path = path;
      state.wordId = wordId;
      state.error = null;
    },
    audioStop(state) {
      state.path = null;
      state.wordId = null;
    },
    audioFailure(state, action: PayloadAction<IAudioAction>) {
      const { error = 'error' } = action.payload;
      state.path = null;
      state.wordId = null;
      state.error = error;
    },
  },
});

export const { audioStart, audioStop, audioFailure } = audioSlice.actions;
export default audioSlice.reducer;
