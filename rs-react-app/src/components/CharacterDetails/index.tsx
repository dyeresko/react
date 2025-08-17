'use client';
import { useEffect, useState, type FC } from 'react';
import Panel from '@components/Panel/index';
import type { DetailedCharacter } from '@/types/interfaces';
import logo from '@/assets/react.svg';
import { useGetResultQuery } from '@/app/lib/services/api';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const CharacterDetails: FC<{ id: string }> = ({ id }) => {
  const [character, setCharacter] = useState<DetailedCharacter>({
    id: Number(id) || 0,
  });
  const { data, error, isFetching, refetch } = useGetResultQuery({
    id: id ?? '0',
  });
  const searchParams = useSearchParams();
  const handleRefreshClick = () => {
    refetch();
  };

  useEffect(() => {
    if (data) {
      setCharacter(data);
    }
  }, [data]);

  if (isFetching) {
    return (
      <div>
        <Image
          width={300}
          height={300}
          data-testid="loader"
          className="logo"
          src={logo}
          alt="Loading..."
        />
      </div>
    );
  }

  if (error) {
    return <h2 data-testid="error">Request did not succeed</h2>;
  }

  return (
    <div>
      <button onClick={handleRefreshClick}>
        {isFetching ? 'Refreshing...' : 'Refresh'}
      </button>
      <Link
        href={`/characters?page=${searchParams.get('page')}&name=${searchParams.get('name')}`}
      >
        <button>Close</button>
      </Link>

      <Panel character={character} />
    </div>
  );
};

export default CharacterDetails;
