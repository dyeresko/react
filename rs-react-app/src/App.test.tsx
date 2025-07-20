import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import App from './App.tsx';
import { mockFetchFailure } from '../test-utils/utils.ts';

describe('App', () => {
  it('makes initial API call on component mount', async () => {
    mockFetchFailure();
  });

  it('shows empty input when no saved term exists', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/search/i);
    expect(input).toHaveValue('');
  });
  it('saves search term to localStorage when search button is clicked', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/search/i);
    await userEvent.type(input, 'some text');
    const button = screen.getByRole('button', { name: 'Search' });
    await userEvent.click(button);
    expect(localStorage.getItem('searchResult')).toBe('some text');
  });
  it('displays previously saved search term from localStorage on mount', async () => {
    render(<App />);
    const updatedInput = screen.getByPlaceholderText(/search/i);
    expect(updatedInput).toHaveValue('some text');
  });
  it('overwrites existing localStorage value when new search is performed', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/search/i);
    await userEvent.clear(input);
    await userEvent.type(input, 'new text');
    const button = screen.getByRole('button', { name: 'Search' });
    await userEvent.click(button);
    expect(localStorage.getItem('searchResult')).toBe('new text');
  });
  it('shows empty input if local storage is cleared', async () => {
    localStorage.removeItem('searchResult');
    render(<App />);
    const input = screen.getByPlaceholderText(/search/i);
    expect(input).toHaveValue('');
  });
  it('shows error if no available results have been found', async () => {
    mockFetchFailure();
    render(<App />);
    const input = screen.getByPlaceholderText(/search/i);
    await userEvent.clear(input);
    await userEvent.type(input, 'invalid search result');
    const button = screen.getByRole('button', { name: 'Search' });
    await userEvent.click(button);
    const error = await screen.findByTestId('error');
    expect(error).toBeVisible();
    localStorage.removeItem('searchResult');
  });
});

describe('Error button tests', () => {
  it('throws error if error button is clicked', async () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<App />);
    const button = screen.getByRole('button', { name: 'Throw Error' });
    await userEvent.click(button);
    await waitFor(() => {
      expect(spy).toHaveBeenCalled();
    });
    spy.mockRestore();
  });
  it('triggers error boundary fallback UI', async () => {
    render(<App />);
    const button = screen.getByRole('button', { name: 'Throw Error' });
    await userEvent.click(button);
    expect(screen.queryByText('Something went wrong.')).toBeInTheDocument();
  });
});
