/* import { IBoard, IGetAllBoards, ICreatColumn, IDeleteColumn } from 'interfaces'; */
import { LOAD_WORDS, TEXTBOOK_PAGE_CHANGE, SUCCESS, REQUEST, FAILURE } from '../constants';
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
  page: 0,
  group: 0,
  entities: {},
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(LOAD_WORDS + REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(LOAD_WORDS + SUCCESS, (state, action) => {
      const { data, page = 0, group = 0 } = <ITextbookCardsAction>action;
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
    })
    .addCase(TEXTBOOK_PAGE_CHANGE, (state) => {
      state.loading = false;
      state.loaded = false;
      state.error = null;
    });
});
