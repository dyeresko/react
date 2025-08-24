import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@/app/store.ts';
import type { DataFromForm } from '@/types/interfaces';
import { countries, defaultFormData } from '@/data/data';
import '@testing-library/jest-dom/vitest';

const initialState: {
  uncontrolledFormData: DataFromForm;
  controlledFormData: DataFromForm;
  countries: string[];
} = {
  uncontrolledFormData: defaultFormData,
  controlledFormData: defaultFormData,
  countries: countries,
};

export const formsSlice = createSlice({
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
  formsSlice.actions;

export const selectForms = (state: RootState) => state.forms;

export default formsSlice.reducer;
