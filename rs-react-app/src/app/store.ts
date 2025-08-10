import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from '../features/cards/cardsSlice.ts';
import themeReducer from '../features/theme/themeSlice.ts';

export const store = configureStore({
  reducer: {
    cards: cardsReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
