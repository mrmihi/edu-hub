import { configureStore } from '@reduxjs/toolkit';

import data from './data';
import ui from './ui';

export function makeStore() {
  return configureStore({
    devTools: true,
    reducer: {
      data,
      ui,
    },
  });
}

const store = makeStore();

export default store;
