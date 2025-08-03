import { screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import Controls from './Controls.tsx';
import { customRender } from '../../../test-utils/utils.tsx';
import { Provider } from 'react-redux';
import { store } from '../../app/store.ts';

describe('Controls render', () => {
  it('renders input field', () => {
    customRender(
      <Provider store={store}>
        <Controls onSearch={vi.fn()} onNewPage={vi.fn()} />
      </Provider>
    );
    const input = screen.getByPlaceholderText(/search/i);
    expect(input).toBeVisible();
  });
  it('renders button', () => {
    customRender(
      <Provider store={store}>
        <Controls onSearch={vi.fn()} onNewPage={vi.fn()} />
      </Provider>
    );
    const button = screen.getByRole('button', { name: 'Search' });
    expect(button).toBeVisible();
  });
});

describe('Controls interaction', () => {
  it('updates input value when user types', async () => {
    customRender(
      <Provider store={store}>
        <Controls onSearch={vi.fn()} onNewPage={vi.fn()} />
      </Provider>
    );
    const input = screen.getByPlaceholderText(/search/i);
    await userEvent.type(input, 'some text');
    expect(input).toHaveValue('some text');
  });
  it('updates input value when user types', async () => {
    customRender(
      <Provider store={store}>
        <Controls onSearch={vi.fn()} onNewPage={vi.fn()} />
      </Provider>
    );
    const input = screen.getByPlaceholderText(/search/i);
    await userEvent.type(input, 'some text');
    expect(input).toHaveValue('some text');
  });
  it('trims whitespace from search input before saving', async () => {
    customRender(
      <Provider store={store}>
        <Controls onSearch={vi.fn()} onNewPage={vi.fn()} />
      </Provider>
    );
    const input = screen.getByPlaceholderText(/search/i);
    await userEvent.type(input, '  beth  ');
    const button = screen.getByRole('button', { name: 'Search' });
    await userEvent.click(button);
    expect(input).toHaveValue('beth');
  });
  it('triggers search callback with correct parameters', async () => {
    const mockFunction = vi.fn();
    customRender(
      <Provider store={store}>
        <Controls onSearch={mockFunction} onNewPage={vi.fn()} />
      </Provider>
    );
    const input = screen.getByPlaceholderText(/search/i);
    await userEvent.type(input, 'some text');
    const button = screen.getByRole('button', { name: 'Search' });
    await userEvent.click(button);
    expect(mockFunction).toHaveBeenCalledWith('some text');
  });
  it('clears inputs if button pressed', async () => {
    customRender(
      <Provider store={store}>
        <Controls onSearch={vi.fn()} onNewPage={vi.fn()} />
      </Provider>
    );
    const input = screen.getByPlaceholderText(/search/i);
    await userEvent.type(input, 'some text');
    expect(input).toHaveValue('some text');
    const button = screen.getByRole('button', { name: 'Clear Input' });
    await userEvent.click(button);
    expect(input).toHaveValue('');
  });
});
