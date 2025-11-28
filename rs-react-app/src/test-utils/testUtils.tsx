import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

export function customRender(
  element: ReactElement,
  {
    route = '/',
    initialEntries = [route],
  }: { route?: string; initialEntries?: string[] } = {}
) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>{element}</MemoryRouter>
  );
}
