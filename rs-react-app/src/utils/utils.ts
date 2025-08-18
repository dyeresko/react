import type { Info } from '@/types/interfaces';

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

export const simulateLoading = () => {
  return new Promise((resolve) => setTimeout(resolve, 200));
};
