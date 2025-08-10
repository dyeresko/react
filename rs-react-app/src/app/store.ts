import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from '@/features/cards/cardsSlice.ts';
import themeReducer from '@/features/theme/themeSlice.ts';
import { rickAndMortyApi } from '@/app/services/api';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
    cards: cardsReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rickAndMortyApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
