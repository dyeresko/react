import type { PaginationContext } from '@/types/interfaces';
import { createContext } from 'react';

export const PaginationDataContext = createContext<PaginationContext | null>(
  null
);
