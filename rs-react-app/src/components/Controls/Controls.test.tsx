import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import Controls from './Controls.tsx';

describe('Controls render', () => {
  it('renders input field', () => {
    render(<Controls onSearch={vi.fn()} />);
    const input = screen.getByPlaceholderText(/search/i);
    expect(input).toBeVisible();
  });
  it('renders button', () => {
    render(<Controls onSearch={vi.fn()} />);
    const button = screen.getByRole('button', { name: 'Search' });
    expect(button).toBeVisible();
  });
});

describe('Controls interaction', () => {
  it('updates input value when user types', async () => {
    render(<Controls onSearch={vi.fn()} />);
    const input = screen.getByPlaceholderText(/search/i);
    await userEvent.type(input, 'some text');
    expect(input).toHaveValue('some text');
  });
  it('updates input value when user types', async () => {
    render(<Controls onSearch={vi.fn()} />);
    const input = screen.getByPlaceholderText(/search/i);
    await userEvent.type(input, 'some text');
    expect(input).toHaveValue('some text');
  });
  it('trims whitespace from search input before saving', async () => {
    render(<Controls onSearch={vi.fn()} />);
    const input = screen.getByPlaceholderText(/search/i);
    await userEvent.type(input, '   some text   ');
    const button = screen.getByRole('button', { name: 'Search' });
    await userEvent.click(button);
    expect(input).toHaveValue('some text');
  });
  it('triggers search callback with correct parameters', async () => {
    const mockFunction = vi.fn();
    render(<Controls onSearch={mockFunction} />);
    const input = screen.getByPlaceholderText(/search/i);
    await userEvent.type(input, 'some text');
    const button = screen.getByRole('button', { name: 'Search' });
    await userEvent.click(button);
    expect(mockFunction).toHaveBeenCalledWith('some text');
  });
});
