import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';

import { customRender } from '../../../test-utils/utils.tsx';
import NotFound from './NotFound.tsx';

describe('Not Found', () => {
  it('renders about page', () => {
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
