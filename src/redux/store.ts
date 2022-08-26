import { configureStore } from '@reduxjs/toolkit';
import api from './middleware/api';
import audio from './middleware/audio';

import reducer from './reducer';

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api, audio),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
