import type { ReactNode } from 'react';

export interface DetailedCharacter {
  id: number;
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
  image?: string;
  origin?: {
    name: string;
  };
  location?: {
    name: string;
  };
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
}

export interface CardsState {
  items: DetailedCharacter[];
}

export interface ControlsProps {
  onSearch: (searchResult: string) => void;
  onNewPage: (newPage: string) => void;
}

export interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface Response {
  info: Info;
  results?: Character[];
  error?: string;
}
export interface ResultsProps {
  searchResult?: string;
  newPage?: string;
}

export interface PaginationContext {
  paginationData: Info;
  setPaginationData: (paginationData: Info) => void;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ThemeState {
  style: string;
}

export interface SearchParams {
  page?: string;
  name?: string;
}
