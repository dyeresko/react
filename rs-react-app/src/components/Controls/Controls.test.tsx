import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Controls from './Controls.tsx';
import '@testing-library/jest-dom/vitest';

describe('Controls', () => {
  it('renders input field', () => {
    render(<Controls onSearch={vi.fn()} />);
    const input = screen.getByPlaceholderText(/search/i);
    expect(input).toBeVisible();
  });
  it('renders button', () => {
    render(<Controls onSearch={vi.fn()} />);
    const input = screen.getByRole('button', { name: 'Search' });
    expect(input).toBeVisible();
  });
});
