import { screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import Controls from './Controls.tsx';
import { customRender } from '../../../test-utils/utils.tsx';

describe('Controls render', () => {
  it('renders input field', () => {
    customRender(<Controls onSearch={vi.fn()} onNewPage={vi.fn()} />);
    const input = screen.getByPlaceholderText(/search/i);
    expect(input).toBeVisible();
  });
  it('renders button', () => {
    customRender(<Controls onSearch={vi.fn()} onNewPage={vi.fn()} />);
    const button = screen.getByRole('button', { name: 'Search' });
    expect(button).toBeVisible();
  });
});

describe('Controls interaction', () => {
  it('updates input value when user types', async () => {
    customRender(<Controls onSearch={vi.fn()} onNewPage={vi.fn()} />);
    const input = screen.getByPlaceholderText(/search/i);
    await userEvent.type(input, 'some text');
    expect(input).toHaveValue('some text');
  });
  it('updates input value when user types', async () => {
    customRender(<Controls onSearch={vi.fn()} onNewPage={vi.fn()} />);
    const input = screen.getByPlaceholderText(/search/i);
    await userEvent.type(input, 'some text');
    expect(input).toHaveValue('some text');
  });
  it('trims whitespace from search input before saving', async () => {
    customRender(<Controls onSearch={vi.fn()} onNewPage={vi.fn()} />);
    const input = screen.getByPlaceholderText(/search/i);
    await userEvent.type(input, '  beth  ');
    const button = screen.getByRole('button', { name: 'Search' });
    await userEvent.click(button);
    expect(input).toHaveValue('beth');
  });
  it('triggers search callback with correct parameters', async () => {
    const mockFunction = vi.fn();
    customRender(<Controls onSearch={mockFunction} onNewPage={vi.fn()} />);
    const input = screen.getByPlaceholderText(/search/i);
    await userEvent.type(input, 'some text');
    const button = screen.getByRole('button', { name: 'Search' });
    await userEvent.click(button);
    expect(mockFunction).toHaveBeenCalledWith('some text');
  });
});
