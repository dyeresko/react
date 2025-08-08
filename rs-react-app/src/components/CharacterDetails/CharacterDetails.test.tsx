import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

import { customRender } from '@/test-utils/testUtils';
import { mockFetchCharacterSuccess } from '@/test-utils/utils.ts';
import CharacterDetails from '@components/CharacterDetails/index';

describe('Character details', () => {
  it('makes initial API call on component mount', async () => {
    mockFetchCharacterSuccess();
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    customRender(<CharacterDetails />);
    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });
    fetchSpy.mockRestore();
  });

  it('updates component state based on API responses', async () => {
    mockFetchCharacterSuccess();
    customRender(<CharacterDetails />);
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeVisible();
      expect(screen.getByText('Citadel of Ricks')).toBeVisible();
      expect(screen.getByText('Earth (C-137)')).toBeVisible();
    });
  });
});
