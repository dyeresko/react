import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';

import { customRender } from '@/test-utils/testUtils';
import About from '@components/About/index';

describe('About', () => {
  it('renders about page', () => {
    customRender(<About />);
    const aboutPage = screen.getByTestId('author-info');
    expect(aboutPage).toBeVisible();
  });
  it('renders button', () => {
    customRender(<About />);
    const backButton = screen.getByRole('button', { name: 'Back' });
    expect(backButton).toBeVisible();
  });
});
