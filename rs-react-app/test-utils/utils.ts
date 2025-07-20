import { vi } from 'vitest';

export function mockFetchFailure() {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => {
      const body = JSON.stringify({ message: '404 not found' });
      return new Response(body, {
        status: 404,
        statusText: 'Not Found',
        headers: { 'Content-Type': 'application/json' },
      });
    })
  );
}
export function mockFetchSuccess() {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => {
      const body = JSON.stringify({ id: 1, name: 'Denis' });
      return new Response(body, {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    })
  );
}
