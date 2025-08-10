import { vi } from 'vitest';
import { data, characterData } from '@/test-utils/mockData';

export function mockFetchFailure() {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ message: '404 not found' }), {
        status: 404,
        statusText: 'Not Found',
        headers: { 'Content-Type': 'application/json' },
      })
    )
  );
}
export function mockFetchSuccess() {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue(
      new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    )
  );
}
export function mockFetchCharacterSuccess() {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue(
      new Response(JSON.stringify(characterData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    )
  );
}
