import type { IResponse } from '../src/components/Results/Results/Results';

export const data: IResponse = {
  info: {
    count: 0,
    pages: 0,
    next: '',
    prev: '',
  },
  results: [
    {
      id: 1,
      name: 'myla',
      status: 'alive',
      species: 'human',
      gender: 'female',
      type: '',
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    },
    {
      id: 2,
      name: 'elizabeth',
      status: 'alive',
      species: 'human',
      gender: 'female',
      type: '',
      image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    },
    {
      id: 3,
      name: 'beth',
      status: 'alive',
      species: 'human',
      gender: 'female',
      type: '',
      image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
    },
  ],
};

export const characterData = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: {
    name: 'Earth (C-137)',
    url: 'https://rickandmortyapi.com/api/location/1',
  },
  location: {
    name: 'Citadel of Ricks',
    url: 'https://rickandmortyapi.com/api/location/3',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
};
