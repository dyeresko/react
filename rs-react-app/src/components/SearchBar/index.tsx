import { useStore } from '@/store/store';
import type { FC } from 'react';
import React from 'react';

const SearchBar: FC = () => {
  const searchValue = useStore((state) => state.countryToSearch);
  const setSearchValue = useStore((state) => state.setCountryToSearch);

  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <input
      value={searchValue}
      placeholder="Search"
      onChange={(e) => handleSearchValueChange(e)}
    />
  );
};

export default React.memo(SearchBar);
