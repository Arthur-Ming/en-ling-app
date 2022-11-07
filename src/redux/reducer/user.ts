import { createReducer } from '@reduxjs/toolkit';
import { ISignInAction } from '../../interfaces';
import { FAILURE, REQUEST, SIGN_IN, SIGN_OUT, SUCCESS } from '../action-types';

export interface IUserState {
  loading: boolean;
  loaded: boolean;
  error: null | unknown;
  name: null | string;
  isAuth: boolean;
}

const initialState: IUserState = {
  loading: false,
  loaded: false,
  error: null,
  name: null,
  isAuth: false,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(SIGN_IN + REQUEST, (state) => {
      state.loading = true;
      state.loaded = false;
      state.error = null;
      state.name = null;
      state.isAuth = false;
    })
    .addCase(SIGN_IN + SUCCESS, (state, action: ISignInAction) => {
      const { userName = null } = action;
      state.loading = false;
      state.loaded = true;
      state.error = null;
      state.name = userName;
      state.isAuth = true;
    })
    .addCase(SIGN_IN + FAILURE, (state, action: ISignInAction) => {
      const { error = null } = action;
      state.loading = false;
      state.loaded = false;
      state.error = error;
      state.name = null;
      state.isAuth = false;
    })
    .addCase(SIGN_OUT, (state) => {
      state.loading = false;
      state.loaded = false;
      state.error = null;
      state.name = null;
      state.isAuth = false;
    });
});
