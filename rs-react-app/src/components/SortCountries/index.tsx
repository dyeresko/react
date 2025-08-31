import { useStore } from '@/store/store';
import type { FC } from 'react';
import React from 'react';

const SortCountries: FC = () => {
  const sortMethod = useStore((store) => store.sortCountries);
  const setSortCountries = useStore((store) => store.setSortCountries);
  const handleSortMethodChange = (sortMethod: string) => {
    setSortCountries(sortMethod);
  };
  return (
    <select
      value={sortMethod}
      onChange={(e) => handleSortMethodChange(e.target.value)}
    >
      <option key={'asc'} value={'asc'}>
        {'asc'}
      </option>
      <option key={'desc'} value={'desc'}>
        {'desc'}
      </option>
    </select>
  );
};

export default React.memo(SortCountries);
