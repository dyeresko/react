import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import Results from './Results.tsx';

describe('Results render', () => {
  it('shows loading state while fetching data', () => {
    render(<Results />);
    const loader = screen.getByTestId('loader');
    expect(loader).toBeVisible();
  });
  it('displays error message when API call fails', async () => {
    render(<Results searchResult="invalidResult" />);
    const error = await screen.findByTestId('error');
    expect(error).toBeVisible();
  });
});
