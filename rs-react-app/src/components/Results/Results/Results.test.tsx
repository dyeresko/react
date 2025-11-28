import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import Results from './Results.tsx';
import { mockFetchFailure } from '../../../../test-utils/utils.ts';

describe('Results render', () => {
  it('shows loading state while fetching data', () => {
    mockFetchFailure();
    render(<Results />);
    const loader = screen.getByTestId('loader');
    expect(loader).toBeVisible();
  });
  it('displays error message when API call fails', async () => {
    mockFetchFailure();
    render(<Results searchResult="invalidResult" />);
    const error = await screen.findByTestId('error');
    expect(error).toBeVisible();
  });
  it('hides loading state based on loading prop', async () => {
    mockFetchFailure();
    render(<Results />);
    const loader = screen.getByTestId('loader');
    expect(loader).toBeVisible();
    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });
  });
});
