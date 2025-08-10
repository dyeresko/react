import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import Results from '@components/Results/Results/index';
import { mockFetchFailure } from '@/test-utils/utils.ts';
import { customRender } from '@/test-utils/testUtils';

describe('Results render', () => {
  it('shows loading state while fetching data', () => {
    mockFetchFailure();
    customRender(<Results />);
    const loader = screen.getByTestId('loader');
    expect(loader).toBeVisible();
  });
  it('displays error message when API call fails', async () => {
    mockFetchFailure();
    customRender(<Results searchResult={'invalid result'} />);
    const error = await screen.findByTestId('error');
    expect(error).toBeVisible();
  });
  it('hides loading state based on loading prop', async () => {
    mockFetchFailure();
    customRender(<Results />);
    const loader = screen.getByTestId('loader');
    expect(loader).toBeVisible();
    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });
  });
});
