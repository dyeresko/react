'use client';
import { useState, useEffect } from 'react';
function useLocalStorage(
  key: string,
  initialValue: string
): [string, (value: string) => void] {
  const retrieveInitialValue = (): string => {
    const localSearchResult = localStorage.getItem(key);
    if (localSearchResult !== null) {
      return localSearchResult;
    } else {
      return initialValue;
    }
  };
  const [value, setValue] = useState(() => retrieveInitialValue());

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
}
export default useLocalStorage;
