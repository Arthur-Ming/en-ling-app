import { combineReducers } from 'redux';
import textbook from './textbook';
import audio from './audio';
import user from './user';

const rootReducer = combineReducers({
  textbook,
  audio,
  user,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
