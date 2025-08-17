import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from '@/app/[locale]/lib/features/cards/cardsSlice';
import themeReducer from '@/app/[locale]/lib/features/theme/themeSlice';
import { rickAndMortyApi } from '@/app/[locale]/lib/services/api';
import { setupListeners } from '@reduxjs/toolkit/query';
import paginationReducer from '@/app/[locale]/lib/features/pagination/paginationSlice';

export const store = configureStore({
  reducer: {
    [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
    cards: cardsReducer,
    theme: themeReducer,
    pagination: paginationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rickAndMortyApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
