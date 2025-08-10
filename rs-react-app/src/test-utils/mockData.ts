import type { Response } from '@/types/interfaces';
export const data: Response = {
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

export const testInfoNext = {
  count: 0,
  pages: 0,
  next: 'https://rickandmortyapi.com/api/character/?page=2',
  prev: null,
};

export const testInfo = {
  count: 0,
  pages: 0,
  next: 'https://rickandmortyapi.com/api/character/?page=3',
  prev: 'https://rickandmortyapi.com/api/character/?page=1',
};

export const invalidTestInfo = {
  count: 0,
  pages: 0,
  next: null,
  prev: null,
};

export const detailedCharactersData = [
  {
    id: 21,
    name: 'Aqua Morty',
    status: 'unknown',
    species: 'Humanoid',
    type: 'Fish-Person',
    gender: 'Male',
    origin: {
      name: 'unknown',
      url: '',
    },
    location: {
      name: 'Citadel of Ricks',
      url: 'https://rickandmortyapi.com/api/location/3',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/21.jpeg',
    episode: [
      'https://rickandmortyapi.com/api/episode/10',
      'https://rickandmortyapi.com/api/episode/22',
    ],
    url: 'https://rickandmortyapi.com/api/character/21',
    created: '2017-11-04T22:39:48.055Z',
  },
  {
    id: 22,
    name: 'Aqua Rick',
    status: 'unknown',
    species: 'Humanoid',
    type: 'Fish-Person',
    gender: 'Male',
    origin: {
      name: 'unknown',
      url: '',
    },
    location: {
      name: 'Citadel of Ricks',
      url: 'https://rickandmortyapi.com/api/location/3',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/22.jpeg',
    episode: [
      'https://rickandmortyapi.com/api/episode/10',
      'https://rickandmortyapi.com/api/episode/22',
      'https://rickandmortyapi.com/api/episode/28',
    ],
    url: 'https://rickandmortyapi.com/api/character/22',
    created: '2017-11-04T22:41:07.171Z',
  },
  {
    id: 23,
    name: 'Arcade Alien',
    status: 'unknown',
    species: 'Alien',
    type: '',
    gender: 'Male',
    origin: {
      name: 'unknown',
      url: '',
    },
    location: {
      name: 'Immortality Field Resort',
      url: 'https://rickandmortyapi.com/api/location/7',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/23.jpeg',
    episode: [
      'https://rickandmortyapi.com/api/episode/13',
      'https://rickandmortyapi.com/api/episode/19',
      'https://rickandmortyapi.com/api/episode/21',
      'https://rickandmortyapi.com/api/episode/25',
      'https://rickandmortyapi.com/api/episode/26',
    ],
    url: 'https://rickandmortyapi.com/api/character/23',
    created: '2017-11-05T08:43:05.095Z',
  },
  {
    id: 24,
    name: 'Armagheadon',
    status: 'Alive',
    species: 'Alien',
    type: 'Cromulon',
    gender: 'Male',
    origin: {
      name: 'Signus 5 Expanse',
      url: 'https://rickandmortyapi.com/api/location/22',
    },
    location: {
      name: 'Signus 5 Expanse',
      url: 'https://rickandmortyapi.com/api/location/22',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/24.jpeg',
    episode: ['https://rickandmortyapi.com/api/episode/16'],
    url: 'https://rickandmortyapi.com/api/character/24',
    created: '2017-11-05T08:48:30.776Z',
  },
];

export const csvResult =
  'id,name,status,species,type,gender,origin,location,image,episode,url,created\n21,Aqua Morty,unknown,Humanoid,Fish-Person,Male,unknown,Citadel of Ricks,https://rickandmortyapi.com/api/character/avatar/21.jpeg,https://rickandmortyapi.com/api/episode/10,https://rickandmortyapi.com/api/character/21,2017-11-04T22:39:48.055Z\n22,Aqua Rick,unknown,Humanoid,Fish-Person,Male,unknown,Citadel of Ricks,https://rickandmortyapi.com/api/character/avatar/22.jpeg,https://rickandmortyapi.com/api/episode/10,https://rickandmortyapi.com/api/character/22,2017-11-04T22:41:07.171Z\n23,Arcade Alien,unknown,Alien,,Male,unknown,Immortality Field Resort,https://rickandmortyapi.com/api/character/avatar/23.jpeg,https://rickandmortyapi.com/api/episode/13,https://rickandmortyapi.com/api/character/23,2017-11-05T08:43:05.095Z\n24,Armagheadon,Alive,Alien,Cromulon,Male,Signus 5 Expanse,Signus 5 Expanse,https://rickandmortyapi.com/api/character/avatar/24.jpeg,https://rickandmortyapi.com/api/episode/16,https://rickandmortyapi.com/api/character/24,2017-11-05T08:48:30.776Z';
