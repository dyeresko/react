import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from '@/app/lib/features/cards/cardsSlice';
import themeReducer from '@/app/lib/features/theme/themeSlice';
import { rickAndMortyApi } from '@/app/lib/services/api';
import { setupListeners } from '@reduxjs/toolkit/query';
import paginationReducer from '@/app/lib/features/pagination/paginationSlice';

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
