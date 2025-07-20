import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import App from './App.tsx';
import { mockFetchFailure, mockFetchSuccess } from '../test-utils/utils.ts';

describe('App', () => {
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
  it('makes initial API call on component mount', async () => {
    mockFetchSuccess();
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    render(<App />);
    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });
    fetchSpy.mockRestore();
  });

  it('updates component state based on API responses', async () => {
    mockFetchSuccess();
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('myla')).toBeVisible();
      expect(screen.getByText('elizabeth')).toBeVisible();
      expect(screen.getByText('beth')).toBeVisible();
    });
  });

  it('manages search term state correctly', async () => {
    mockFetchSuccess();
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    render(<App />);
    const input = screen.getByPlaceholderText(/search/i);
    await userEvent.clear(input);
    await userEvent.type(input, 'beth');
    const button = screen.getByRole('button', { name: 'Search' });
    await userEvent.click(button);
    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalled();
    });
    const [url] = fetchSpy.mock.calls[fetchSpy.mock.calls.length - 1];
    expect(url).toContain(
      'https://rickandmortyapi.com/api/character/?name=beth'
    );
    fetchSpy.mockRestore();
  });
  it('calls API with correct parameters', async () => {
    mockFetchSuccess();
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    render(<App />);
    const [url] = fetchSpy.mock.calls[0];
    expect(url).toContain('https://rickandmortyapi.com/api/character/');
    fetchSpy.mockRestore();
    localStorage.clear();
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
