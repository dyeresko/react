'use client';
import { useEffect, useState, type FC } from 'react';
import Panel from '@components/Panel/index';
import type { DetailedCharacter } from '@/types/interfaces';
import logo from '@/assets/react.svg';
import { useGetResultQuery } from '@/app/[locale]/lib/services/api';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const CharacterDetails: FC<{ id: string }> = ({ id }) => {
  const t = useTranslations('Result');
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
          alt={`${t('alt-loading')}...`}
        />
      </div>
    );
  }

  if (error) {
    return <h2 data-testid="error">{t('error')}</h2>;
  }

  return (
    <div>
      <button onClick={handleRefreshClick}>{t('refresh')}</button>
      <Link
        href={`/characters?page=${searchParams.get('page')}&name=${searchParams.get('name')}`}
      >
        <button>{t('close')}</button>
      </Link>

      <Panel character={character} />
    </div>
  );
};

export default CharacterDetails;
