import { useStore } from '@/store/store';
import type { FC } from 'react';

const SelectYears: FC<{ years: number[] }> = ({ years }) => {
  const year = useStore((store) => store.newYear);
  const setNewYear = useStore((store) => store.setNewYear);
  const setOldYear = useStore((store) => store.setOldYear);
  const handleYearChange = (newYear: number) => {
    console.log(year);
    console.log(newYear);
    setOldYear(year);
    setNewYear(newYear);
  };
  return (
    <select
      value={year}
      onChange={(e) => handleYearChange(Number(e.target.value))}
    >
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
};

export default SelectYears;
