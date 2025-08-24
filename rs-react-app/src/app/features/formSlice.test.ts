import formsReducer, {
  setControlledFormData,
  setUncontrolledFormData,
} from '@/app/features/formSlice';
import { countries, defaultFormData, testDataRedux } from '@/data/data';
import { describe, it } from 'node:test';
import { expect } from 'vitest';

describe('Forms slice', () => {
  it('adds uncontrolled forms data to redux store', async () => {
    const action = setUncontrolledFormData(testDataRedux);
    const state = formsReducer(
      {
        uncontrolledFormData: defaultFormData,
        controlledFormData: defaultFormData,
        countries: countries,
      },
      action
    );

    expect(state.uncontrolledFormData).toEqual(testDataRedux);
  });
  it('adds uncontrolled forms data to redux store', () => {
    const action = setControlledFormData(testDataRedux);
    const state = formsReducer(
      {
        uncontrolledFormData: defaultFormData,
        controlledFormData: defaultFormData,
        countries: countries,
      },
      action
    );

    expect(state.controlledFormData).toEqual(testDataRedux);
  });
});
