import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store.ts';
import type { DetailedCharacter } from '../../components/Panel/Panel.tsx';

interface CardsState {
  items: DetailedCharacter[];
}

const initialState: CardsState = {
  items: [],
};

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<DetailedCharacter>) => {
      state.items.push(action.payload);
    },
    removeCard: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCards: (state) => {
      state.items = [];
    },
  },
});

export const { addCard, removeCard, clearCards } = cardsSlice.actions;

export const selectCards = (state: RootState) => state.cards.items;

export default cardsSlice.reducer;
