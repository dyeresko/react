import { createContext } from 'react';
import type { IInfo } from '../src/components/Results/Results/Results';

interface IPaginationContext {
  paginationData: IInfo;
  setPaginationData: (paginationData: IInfo) => void;
}

export const PaginationDataContext = createContext<IPaginationContext | null>(
  null
);
