import { useState, useEffect } from 'react';

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const retrieveInitialValue = (): T => {
    const localSearchResult = localStorage.getItem(key);
    if (localSearchResult !== null) {
      return JSON.parse(localSearchResult);
    } else {
      return initialValue;
    }
  };
  const init: T = retrieveInitialValue();
  const [value, setValue] = useState<T>(init);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
export default useLocalStorage;
