import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import ResultList from '@components/Results/ResultList/index';
import type { Character } from '@components/Results/ResultList/index';
import { customRender } from '@/test-utils/utils.tsx';
import { Provider } from 'react-redux';
import { store } from '@/app/store.ts';
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
    customRender(
      <Provider store={store}>
        <ResultList characters={data} />
      </Provider>
    );
    const results = screen.getAllByTestId('result');
    expect(results).toHaveLength(3);
  });
  it('displays no results if array is empty', () => {
    customRender(
      <Provider store={store}>
        <ResultList characters={[]} />
      </Provider>
    );
    const results = screen.queryAllByTestId('result');
    expect(results).toHaveLength(0);
  });
  it('displays "no results" message when data array is not defined', () => {
    customRender(
      <Provider store={store}>
        <ResultList />
      </Provider>
    );
    expect(screen.getByText(/no results found/i)).toBeVisible();
  });
  it('displays item name and description correctly', () => {
    customRender(
      <Provider store={store}>
        <ResultList characters={data} />
      </Provider>
    );
    const results = screen.queryAllByTestId('result');
    results.forEach((result, index) => {
      expect(result).toHaveTextContent(data[index].name);
      expect(result).toHaveTextContent(data[index].status);
      expect(result).toHaveTextContent(data[index].species);
      expect(result).toHaveTextContent(data[index].gender);
    });
  });
});
