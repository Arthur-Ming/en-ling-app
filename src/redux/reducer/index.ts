import { combineReducers } from 'redux';
import audio from './audio';
import user from './user';

import session from './session';
import { api } from '../api';

const rootReducer = combineReducers({
  audio,
  user,
  session,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
