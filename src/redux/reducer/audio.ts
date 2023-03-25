import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
