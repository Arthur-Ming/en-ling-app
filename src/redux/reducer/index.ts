import { combineReducers } from 'redux';
import textbook from './textbook';
import audio from './audio';
import user from './user';
import userWords from './userWords';

const rootReducer = combineReducers({
  textbook,
  audio,
  user,
  userWords,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
