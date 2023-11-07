import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { rootApi } from './api/rootApi';

const store = () =>
  configureStore({
    reducer: {
      [rootApi.reducerPath]: rootApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(rootApi.middleware),
  });

export type AppStore = ReturnType<typeof store>;

export const wrapper = createWrapper<AppStore>(store, { debug: true });

export default store;
