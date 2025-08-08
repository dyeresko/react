import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';

import { customRender } from '@/test-utils/testUtils';
import NotFound from '@components/NotFound/index';

describe('Not Found', () => {
  it('renders not found page', () => {
    customRender(<NotFound />);
    const aboutPage = screen.getByTestId('error-not-found');
    expect(aboutPage).toBeVisible();
  });
  it('renders button', () => {
    customRender(<NotFound />);
    const backButton = screen.getByRole('button', { name: 'Back' });
    expect(backButton).toBeVisible();
  });
});
