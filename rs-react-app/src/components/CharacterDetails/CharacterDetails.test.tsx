import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { customRender } from '@/test-utils/testUtils';
import { mockFetchCharacterSuccess } from '@/test-utils/utils.ts';
import CharacterDetails from '@components/CharacterDetails/index';
import { Provider } from 'react-redux';
import { store } from '@/app/lib/store';
import userEvent from '@testing-library/user-event';

describe('Character details', () => {
  it('makes initial API call on component mount', async () => {
    mockFetchCharacterSuccess();
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    customRender(
      <Provider store={store}>
        <CharacterDetails id={'1'} />
      </Provider>
    );
    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });
    fetchSpy.mockRestore();
  });

  it('updates component state based on API responses', async () => {
    mockFetchCharacterSuccess();
    customRender(
      <Provider store={store}>
        <CharacterDetails id={'1'} />
      </Provider>
    );
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeVisible();
      expect(screen.getByText('Citadel of Ricks')).toBeVisible();
      expect(screen.getByText('Earth (C-137)')).toBeVisible();
    });
  });
  it('shows loading state when clicking refresh button', async () => {
    mockFetchCharacterSuccess();
    customRender(
      <Provider store={store}>
        <CharacterDetails id={'1'} />
      </Provider>
    );
    await screen.findByText('Rick Sanchez');
    const button = screen.getByRole('button', { name: 'Refresh' });
    await userEvent.click(button);
    const loader = await screen.findByTestId('loader');
    expect(loader).toBeVisible();
  });
});
