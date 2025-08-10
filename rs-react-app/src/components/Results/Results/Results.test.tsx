import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import Results from '@components/Results/Results/index';
import { mockFetchFailure } from '@/test-utils/utils.ts';
import { customRender } from '@/test-utils/testUtils';
import { store } from '@/app/store';
import { Provider } from 'react-redux';

describe('Results render', () => {
  it('shows loading state while fetching data', () => {
    mockFetchFailure();
    customRender(
      <Provider store={store}>
        <Results />
      </Provider>
    );
    const loader = screen.getByTestId('loader');
    expect(loader).toBeVisible();
  });
  it('displays error message when API call fails', async () => {
    mockFetchFailure();
    customRender(
      <Provider store={store}>
        <Results />
      </Provider>
    );
    const error = await screen.findByTestId('error');
    expect(error).toBeVisible();
  });
  it('hides loading state based on loading prop', async () => {
    mockFetchFailure();
    customRender(
      <Provider store={store}>
        <Results />
      </Provider>
    );
    const loader = screen.getByTestId('loader');
    expect(loader).toBeVisible();
    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });
  });
});
