import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@/app/store.ts';
import type { Info } from '@/types/interfaces';
import { defaultPaginationData } from '@/data/data';

const initialState: { value: Info } = { value: defaultPaginationData };

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPagination(state, action: PayloadAction<Info>) {
      state.value = action.payload;
    },
  },
});

export const { setPagination } = paginationSlice.actions;

export const selectCards = (state: RootState) => state.pagination;

export default paginationSlice.reducer;
