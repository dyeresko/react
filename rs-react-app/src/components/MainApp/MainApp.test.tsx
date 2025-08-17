import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import MainApp from '@components/MainApp/index';
import { store } from '@/app/lib/store';
import { mockFetchFailure, mockFetchSuccess } from '@/test-utils/utils.ts';
import { Provider } from 'react-redux';

describe('App', () => {
  it('shows empty input when no saved term exists', async () => {
    render(
      <Provider store={store}>
        <MainApp />
      </Provider>
    );
    const input = screen.getByPlaceholderText(/search/i);
    expect(input).toHaveValue('');
  });
  it('saves search term to localStorage when search button is clicked', async () => {
    render(
      <Provider store={store}>
        <MainApp />
      </Provider>
    );
    const input = screen.getByPlaceholderText(/search/i);
    await userEvent.type(input, 'some text');
    const button = screen.getByRole('button', { name: 'Search' });
    await userEvent.click(button);
    expect(localStorage.getItem('searchResult')).toBe('some text');
  });
  it('displays previously saved search term from localStorage on mount', async () => {
    render(
      <Provider store={store}>
        <MainApp />
      </Provider>
    );
    const input = screen.getByPlaceholderText(/search/i);
    await userEvent.type(input, 'text');
    const button = screen.getByRole('button', { name: 'Search' });
    await userEvent.click(button);
    cleanup();
    render(
      <Provider store={store}>
        <MainApp />
      </Provider>
    );
    expect(localStorage.getItem('searchResult')).toBe('text');
    const newInput = screen.getByPlaceholderText(/search/i);
    expect(newInput).toHaveValue('text');
  });
  it('overwrites existing localStorage value when new search is performed', async () => {
    render(
      <Provider store={store}>
        <MainApp />
      </Provider>
    );
    const input = screen.getByPlaceholderText(/search/i);
    await userEvent.type(input, 'text');
    const button = screen.getByRole('button', { name: 'Search' });
    await userEvent.click(button);
    expect(localStorage.getItem('searchResult')).toBe('text');
    await userEvent.clear(input);
    await userEvent.type(input, 'new text');
    await userEvent.click(button);
    expect(localStorage.getItem('searchResult')).toBe('new text');
  });
  it('shows empty input if local storage is cleared', async () => {
    render(
      <Provider store={store}>
        <MainApp />
      </Provider>
    );
    const input = screen.getByPlaceholderText(/search/i);
    await userEvent.type(input, 'new text');
    const button = screen.getByRole('button', { name: 'Search' });
    await userEvent.click(button);
    expect(localStorage.getItem('searchResult')).toBe('new text');
    localStorage.clear();
    cleanup();
    render(
      <Provider store={store}>
        <MainApp />
      </Provider>
    );
    const newInput = screen.getByPlaceholderText(/search/i);
    expect(newInput).toHaveValue('');
  });
  it('shows error if no available results have been found', async () => {
    mockFetchFailure();
    render(
      <Provider store={store}>
        <MainApp />
      </Provider>
    );
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
    render(
      <Provider store={store}>
        <MainApp />
      </Provider>
    );
    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });
    fetchSpy.mockRestore();
  });

  it('updates component state based on API responses', async () => {
    mockFetchSuccess();
    render(
      <Provider store={store}>
        <MainApp />
      </Provider>
    );
    await waitFor(() => {
      expect(screen.getByText('myla')).toBeVisible();
      expect(screen.getByText('elizabeth')).toBeVisible();
      expect(screen.getByText('beth')).toBeVisible();
    });
  });

  it('renders about page', async () => {
    render(
      <Provider store={store}>
        <MainApp />
      </Provider>
    );
    const aboutButton = screen.getByRole('button', { name: 'About' });
    await userEvent.click(aboutButton);
    const aboutPage = screen.getByTestId('author-info');
    expect(aboutPage).toBeInTheDocument();
    const backButton = screen.getByRole('button', { name: 'Back' });
    await userEvent.click(backButton);
  });
});

describe('Error button tests', () => {
  it('throws error if error button is clicked', async () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <Provider store={store}>
        <MainApp />
      </Provider>
    );
    const button = screen.getByRole('button', { name: 'Throw Error' });
    await userEvent.click(button);
    await waitFor(() => {
      expect(spy).toHaveBeenCalled();
    });
    spy.mockRestore();
  });
  it('triggers error boundary fallback UI', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <Provider store={store}>
        <MainApp />
      </Provider>
    );
    const button = screen.getByRole('button', { name: 'Throw Error' });
    await userEvent.click(button);
    expect(screen.queryByText('Something went wrong.')).toBeInTheDocument();
  });
});

describe('State Management tests', () => {
  it('selects item if checkbox is pressed', async () => {
    mockFetchSuccess();
    render(
      <Provider store={store}>
        <MainApp />
      </Provider>
    );
    const checkbox = await screen.findByRole('checkbox', { name: 'cb-1' });
    expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    await userEvent.click(checkbox);
  });
  it('panel appears if item is selected', async () => {
    mockFetchSuccess();
    render(
      <Provider store={store}>
        <MainApp />
      </Provider>
    );
    const checkbox = await screen.findByRole('checkbox', { name: 'cb-1' });
    expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    const downloadPanel = await screen.findByTestId('download-panel');
    expect(downloadPanel).toBeVisible();
    await userEvent.click(checkbox);
  });
  it('panel buttons appear', async () => {
    mockFetchSuccess();
    render(
      <Provider store={store}>
        <MainApp />
      </Provider>
    );
    const checkbox = await screen.findByRole('checkbox', { name: 'cb-1' });
    await userEvent.click(checkbox);
    const downloadButton = await screen.findByRole('button', {
      name: 'Download',
    });
    expect(downloadButton).toBeVisible();
    const unselectButton = await screen.findByRole('button', {
      name: 'Unselect all',
    });
    expect(unselectButton).toBeVisible();
    await userEvent.click(checkbox);
  });
  it('updates text on selecting item', async () => {
    mockFetchSuccess();
    render(
      <Provider store={store}>
        <MainApp />
      </Provider>
    );
    const checkbox = await screen.findByRole('checkbox', { name: 'cb-1' });
    await userEvent.click(checkbox);
    const element = await screen.findByText('There are 1 selected cards');
    expect(element).toBeVisible();
    const checkbox2 = await screen.findByRole('checkbox', { name: 'cb-2' });
    await userEvent.click(checkbox2);
    const element2 = await screen.findByText('There are 2 selected cards');
    expect(element2).toBeVisible();
    await userEvent.click(checkbox);
    await userEvent.click(checkbox2);
  });
  it('closes the window if no items are selected', async () => {
    mockFetchSuccess();
    render(
      <Provider store={store}>
        <MainApp />
      </Provider>
    );
    const checkbox = await screen.findByRole('checkbox', { name: 'cb-1' });
    await userEvent.click(checkbox);
    const element = await screen.findByText('There are 1 selected cards');
    expect(element).toBeVisible();
    await userEvent.click(checkbox);
    const panel = screen.queryByTestId('download-panel');
    expect(panel).not.toBeInTheDocument();
  });
  it('closes the panel if unselect button is pressed', async () => {
    mockFetchSuccess();
    render(
      <Provider store={store}>
        <MainApp />
      </Provider>
    );
    const checkbox = await screen.findByRole('checkbox', { name: 'cb-1' });
    await userEvent.click(checkbox);
    const element = await screen.findByText('There are 1 selected cards');
    expect(element).toBeVisible();
    const unselectButton = await screen.findByRole('button', {
      name: 'Unselect all',
    });
    await userEvent.click(unselectButton);
    const panel = screen.queryByTestId('download-panel');
    expect(panel).not.toBeInTheDocument();
  });
  it('unselects item if unselect button is pressed', async () => {
    mockFetchSuccess();
    render(
      <Provider store={store}>
        <MainApp />
      </Provider>
    );
    const checkbox = await screen.findByRole('checkbox', { name: 'cb-2' });
    await userEvent.click(checkbox);
    const element = await screen.findByText('There are 1 selected cards');
    expect(element).toBeVisible();
    const unselectButton = await screen.findByRole('button', {
      name: 'Unselect all',
    });
    await userEvent.click(unselectButton);
    expect(checkbox).not.toBeChecked();
  });
  it('button that changes theme appears', async () => {
    render(
      <Provider store={store}>
        <MainApp />
      </Provider>
    );
    const themeButton = await screen.findByRole('button', { name: '🌙' });
    expect(themeButton).toBeVisible();
  });
  it('changes text content of theme button on click', async () => {
    render(
      <Provider store={store}>
        <MainApp />
      </Provider>
    );
    const themeButton = await screen.findByRole('button', { name: '🌙' });
    await userEvent.click(themeButton);
    expect(themeButton).toHaveTextContent('☀️');
    await userEvent.click(themeButton);
  });
  it('changes class name of html on theme button click', async () => {
    render(
      <Provider store={store}>
        <MainApp />
      </Provider>
    );
    const themeButton = await screen.findByRole('button', { name: '🌙' });
    await userEvent.click(themeButton);
    expect(document.documentElement.getAttribute('data-theme-style')).toBe(
      'dark'
    );
    await userEvent.click(themeButton);
    expect(document.documentElement.getAttribute('data-theme-style')).toBe(
      'white'
    );
  });
});
