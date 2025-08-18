'use server';
import type { DetailedCharacter } from '@/types/interfaces';

export const charactersToCSV = async (characters: DetailedCharacter[]) => {
  const headers = [Object.keys(characters[0])].toString() + '\n';
  const rows = characters
    .map((character) => {
      const values = Object.values(character);
      return values.map((value) => {
        if (typeof value === 'object') {
          return Object.values(value)[0];
        }
        return value;
      });
    })
    .join('\n');
  return headers + rows;
};
