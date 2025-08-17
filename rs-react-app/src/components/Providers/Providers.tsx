'use client';

import { store } from '@/app/lib/store';
import { type ReactNode } from 'react';
import { Provider } from 'react-redux';

export function Providers({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
