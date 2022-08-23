import { combineReducers } from 'redux';
import textbook from './textbook';

const rootReducer = combineReducers({
  textbook,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
