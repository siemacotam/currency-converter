import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { initialState } from './modeReducer.const';

export const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    changeViewMode: (state, action: PayloadAction<'light' | 'dark'>) => {
      return { ...state, mode: action.payload };
    }
  }
});

export const { changeViewMode } = modeSlice.actions;

export const selectCount = (state: RootState) => state.mode;

export default modeSlice.reducer;
