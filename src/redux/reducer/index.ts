import { combineReducers } from 'redux';
import textbook from './textbook';
import audio from './audio';

const rootReducer = combineReducers({
  textbook,
  audio,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
