import type { SearchParams } from '@/types/interfaces';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

function useUpdateSearchParams() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  return (configObject: SearchParams) => {
    const params = new URLSearchParams(searchParams);
    if (configObject.page) {
      params.set('page', configObject.page);
    }
    if (configObject.name) {
      params.set('name', configObject.name);
    } else {
      params.set('name', '');
    }
    replace(`${pathname}?${params.toString()}`);
  };
}

export default useUpdateSearchParams;
