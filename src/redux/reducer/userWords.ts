import { createReducer } from '@reduxjs/toolkit';
import {
  IAddUsersWordsAction,
  IPaginatedResult,
  ITextbookUserWordAction,
  IUpdateUsersWordsAction,
} from '../../interfaces';
import {
  ADD_USERS_WORDS,
  DELETE_USERS_WORDS,
  FAILURE,
  LOAD_USERS_WORDS,
  REQUEST,
  SUCCESS,
  UPDATE_USERS_WORDS,
} from '../action-types';
import { arrToMap } from '../../utils/arrayHelpers';

export interface IUserWordsState {
  loading: boolean;
  loaded: boolean;
  updating: {
    [key: string]: boolean;
  };
  updated: {
    [key: string]: boolean;
  };
  error: null | unknown;
  entities: {
    [key: string]: IPaginatedResult;
  };
}

const initialState: IUserWordsState = {
  loading: false,
  loaded: false,
  error: null,
  updating: {},
  updated: {},
  entities: {},
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(LOAD_USERS_WORDS + REQUEST, (state) => {
      state.loading = true;
      state.loaded = false;
      state.error = null;
      state.entities = {};
    })
    .addCase(LOAD_USERS_WORDS + SUCCESS, (state, action) => {
      const { data } = <ITextbookUserWordAction>action;
      state.loading = false;
      state.loaded = true;
      state.error = null;
      data && (state.entities = arrToMap(data, '_id'));
    })
    .addCase(LOAD_USERS_WORDS + FAILURE, (state, action) => {
      const { error = null } = <ITextbookUserWordAction>action;
      state.loading = false;
      state.loaded = false;
      state.error = error;
    })
    .addCase(UPDATE_USERS_WORDS + REQUEST, (state, action: IUpdateUsersWordsAction) => {
      const { wordId } = action;
      state.updating[wordId] = true;
      state.updated[wordId] = false;
    })
    .addCase(UPDATE_USERS_WORDS + SUCCESS, (state, action: IUpdateUsersWordsAction) => {
      const { wordId, userWord } = action;
      state.updating[wordId] = false;
      state.updated[wordId] = true;
      userWord && (state.entities[wordId].userWord = userWord);
    })
    .addCase(ADD_USERS_WORDS + REQUEST, (state, action: IAddUsersWordsAction) => {
      const { word } = action;
      state.updating[word._id] = true;
      state.updated[word._id] = false;
    })
    .addCase(ADD_USERS_WORDS + SUCCESS, (state, action: IAddUsersWordsAction) => {
      const { word } = action;
      const { _id } = word;
      state.updating[_id] = false;
      state.updated[_id] = true;
      word && (state.entities[_id] = word);
    })
    .addCase(DELETE_USERS_WORDS + REQUEST, (state, action: IUpdateUsersWordsAction) => {
      const { wordId } = action;
      state.updating[wordId] = true;
      state.updated[wordId] = false;
    })
    .addCase(DELETE_USERS_WORDS + SUCCESS, (state, action: IUpdateUsersWordsAction) => {
      const { wordId } = action;
      state.updating[wordId] = false;
      state.updated[wordId] = true;
      delete state.entities[wordId];
    });
});
