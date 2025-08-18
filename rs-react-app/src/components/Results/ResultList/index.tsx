import Result from '@components/Results/Result/index';
import classes from '@components/Results//ResultList/ResultList.module.css';
import type { DetailedCharacter } from '@/types/interfaces';
import type { FC } from 'react';
import { useSearchParams } from 'next/navigation';
import { Link } from '@/i18n/navigation';

const ResultList: FC<{ characters?: DetailedCharacter[] }> = ({
  characters,
}) => {
  const searchParams = useSearchParams();
  return (
    <div className={classes.results}>
      {characters
        ? characters.map((character: DetailedCharacter) => (
            <div key={character.id}>
              <Link
                className={classes.link}
                href={`/characters/details/${character.id}?page=${searchParams.get('page')}&name=${searchParams.get('name')}`}
              >
                <Result character={character} />
              </Link>
            </div>
          ))
        : 'No results found.'}
    </div>
  );
};

export default ResultList;
