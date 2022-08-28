import { LOAD_WORDS, SUCCESS, REQUEST, FAILURE, DEFAULT_PAGE, DEFAULT_GROUP } from '../constants';
import arrToMap from '../../utils/arrToMap';
import { createReducer } from '@reduxjs/toolkit';
import { ITextbookWord, ITextbookCardsAction } from '../../interfaces';

export interface ITextbookState {
  loading: boolean;
  loaded: boolean;
  error: null | unknown;
  page: number;
  group: number;
  entities: {
    [key: string]: ITextbookWord;
  };
}

const initialState: ITextbookState = {
  loading: false,
  loaded: false,
  error: null,
  page: DEFAULT_PAGE,
  group: DEFAULT_GROUP,
  entities: {},
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(LOAD_WORDS + REQUEST, (state) => {
      state.loading = true;
      state.loaded = false;
      state.error = null;
      state.entities = {};
    })
    .addCase(LOAD_WORDS + SUCCESS, (state, action) => {
      const { data, page = DEFAULT_PAGE, group = DEFAULT_GROUP } = <ITextbookCardsAction>action;
      state.loading = false;
      state.loaded = true;
      state.error = null;
      state.page = page;
      state.group = group;
      data && (state.entities = arrToMap(data));
    })
    .addCase(LOAD_WORDS + FAILURE, (state, action) => {
      const { error = null } = <ITextbookCardsAction>action;
      state.loading = false;
      state.loaded = false;
      state.error = error;
    });
});
