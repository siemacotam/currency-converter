import { configureStore } from '@reduxjs/toolkit';
import mode from './reducers/modeReducer/modeReducer';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    mode
  }
});
