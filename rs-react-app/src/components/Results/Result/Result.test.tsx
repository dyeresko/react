import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import Result from './index';
import type { Character } from '@components/Results/ResultList/index';
import { Provider } from 'react-redux';
import { store } from '@/app/store.ts';

const data: Character = {
  id: 1,
  name: 'morty',
  status: 'alive',
  species: 'human',
  gender: 'male',
  type: '',
  image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
};

describe('Result display', () => {
  it('correctly displays item names and descriptions', () => {
    render(
      <Provider store={store}>
        <Result
          id={data.id}
          name={data.name}
          status={data.status}
          species={data.species}
          gender={data.gender}
          image={data.image}
        />
      </Provider>
    );
    expect(screen.getByTestId('name')).toHaveTextContent('morty');
    expect(screen.getByTestId('status')).toHaveTextContent('alive');
    expect(screen.getByTestId('species')).toHaveTextContent('human');
    expect(screen.getByTestId('gender')).toHaveTextContent('male');
    const image = screen.getByTestId('image');

    expect(image).toHaveAttribute(
      'src',
      'https://rickandmortyapi.com/api/character/avatar/2.jpeg'
    );
    expect(image).toHaveAttribute('alt', 'Result image');
  });
  it('handles missing or undefined data gracefully', () => {
    render(
      <Provider store={store}>
        <Result id={0} />
      </Provider>
    );
    expect(screen.getByTestId('name')).toHaveTextContent('name is missing');
    expect(screen.getByTestId('status')).toHaveTextContent('status is missing');
    expect(screen.getByTestId('species')).toHaveTextContent(
      'species is missing'
    );
    expect(screen.getByTestId('gender')).toHaveTextContent('gender is missing');
    const image = screen.getByTestId('image');

    expect(image).toHaveAttribute(
      'src',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/640px-No_image_3x4.svg.png'
    );
    expect(image).toHaveAttribute('alt', 'Result image');
  });
});
