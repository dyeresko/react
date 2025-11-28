import type { ReactNode } from 'react';

export type ResultsProps = {
  searchResult?: string;
  newPage?: string;
};

export type ErrorBoundaryProps = {
  children: ReactNode;
};

export type ControlsProps = {
  onSearch: (searchResult: string) => void;
  onNewPage: (newPage: string) => void;
};
