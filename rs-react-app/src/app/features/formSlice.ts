import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@/app/store.ts';
import type { DataFromForm } from '@/types/interfaces';
import { defaultFormData } from '@/data/data';

const initialState: {
  uncontrolledFormData: DataFromForm;
  controlledFormData: DataFromForm;
} = {
  uncontrolledFormData: defaultFormData,
  controlledFormData: defaultFormData,
};

export const cardsSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setUncontrolledFormData: (state, action: PayloadAction<DataFromForm>) => {
      state.uncontrolledFormData = action.payload;
    },
    setControlledFormData: (state, action: PayloadAction<DataFromForm>) => {
      state.controlledFormData = action.payload;
    },
  },
});

export const { setControlledFormData, setUncontrolledFormData } =
  cardsSlice.actions;

export const selectForms = (state: RootState) => state.forms;

export default cardsSlice.reducer;
