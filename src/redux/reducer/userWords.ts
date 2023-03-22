import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITextbookWord } from '../../interfaces';
import { arrToMap } from '../../utils/arrToMap';

export interface IUserWordsState {
  entities: { [wordId: string]: ITextbookWord };
}

const initialState: IUserWordsState = {
  entities: {},
};

const userWordsSlice = createSlice({
  name: 'userWords',
  initialState,
  reducers: {
    addUserWords(state, action: PayloadAction<ITextbookWord[]>) {
      state.entities = arrToMap(action.payload);
    },
    addUserWord(state, action: PayloadAction<ITextbookWord>) {
      const { id } = action.payload;
      state.entities[id] = action.payload;
    },
    removeUserWord(state, action: PayloadAction<ITextbookWord>) {
      const { id } = action.payload;
      delete state.entities[id];
    },
  },
});

export const { addUserWords, addUserWord, removeUserWord } = userWordsSlice.actions;

export default userWordsSlice.reducer;
