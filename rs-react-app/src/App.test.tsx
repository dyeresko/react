import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import App from './App.tsx';

describe('App', () => {
  it('shows empty input when no saved term exists', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/search/i);
    expect(input).toHaveValue('');
  });
  it('displays previously saved search term from localStorage on mount', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/search/i);
    await userEvent.type(input, 'some text');
    const button = screen.getByRole('button', { name: 'Search' });
    await userEvent.click(button);
    expect(localStorage.getItem('searchResult')).toBe('some text');
    cleanup();
    render(<App />);
    const updatedInput = screen.getByPlaceholderText(/search/i);
    expect(updatedInput).toHaveValue('some text');
  });
  it('shows empty input if local storage is cleared', async () => {
    localStorage.removeItem('searchResult');
    render(<App />);
    const input = screen.getByPlaceholderText(/search/i);
    expect(input).toHaveValue('');
  });
});
