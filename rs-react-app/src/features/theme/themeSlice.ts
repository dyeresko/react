import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store.ts';

interface ThemeState {
  style: string;
}

const initialState: ThemeState = {
  style: 'white',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.style =
        state.style === 'dark'
          ? (state.style = 'white')
          : (state.style = 'dark');
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme.style;

export default themeSlice.reducer;
