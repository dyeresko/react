import type { SearchParams } from '@/types/interfaces';
import { useSearchParams } from 'react-router-dom';

function useUpdateSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  return (configObject: SearchParams) => {
    setSearchParams(() => {
      if (configObject.page) {
        searchParams.set('page', configObject.page);
      }
      if (configObject.name) {
        searchParams.set('name', configObject.name);
      } else {
        searchParams.set('name', '');
      }
      return searchParams;
    });
  };
}
export default useUpdateSearchParams;
