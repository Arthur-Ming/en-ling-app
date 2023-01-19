import { combineReducers } from 'redux';
import textbook from './textbook';
import audio from './audio';
import user from './user';
import userWords from './userWords';
import { api } from '../api';

const rootReducer = combineReducers({
  textbook,
  audio,
  user,
  userWords,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
