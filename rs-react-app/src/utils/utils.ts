import type { DetailedCharacter, Info } from '@/types/interfaces';

export const getPage = (pageInfo: Info) => {
  if (pageInfo.prev) {
    const url = new URL(pageInfo.prev);
    const prevPage = parseInt(url.searchParams.get('page') || '0');
    return prevPage + 1;
  }
  if (pageInfo.next) {
    const url = new URL(pageInfo.next);
    const nextPage = parseInt(url.searchParams.get('page') || '2');
    return nextPage - 1;
  }
  return 1;
};

export const charactersToCSV = (characters: DetailedCharacter[]) => {
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
