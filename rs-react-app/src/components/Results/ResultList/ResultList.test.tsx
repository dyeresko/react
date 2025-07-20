import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import ResultList from './ResultList.tsx';
import type { Character } from './ResultList.tsx';

const data: Character[] = [
  {
    id: 1,
    name: 'morty',
    status: 'alive',
    species: 'human',
    gender: 'male',
    type: '',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  },
  {
    id: 2,
    name: 'denis',
    status: 'alive',
    species: 'human',
    gender: 'male',
    type: '',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  },
  {
    id: 3,
    name: 'beth',
    status: 'alive',
    species: 'human',
    gender: 'female',
    type: '',
    image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg',
  },
];

describe('Result list render', () => {
  it('renders correct number of items when data is provided', () => {
    render(<ResultList characters={data} />);
    const results = screen.getAllByTestId('result');
    expect(results).toHaveLength(3);
  });
  it('displays "no results" message when data array is empty', () => {
    render(<ResultList characters={[]} />);
    const results = screen.queryAllByTestId('result');
    expect(results).toHaveLength(0);
  });
});
