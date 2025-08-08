import Result from '@components/Results/Result/index';
import classes from '@components/Results//ResultList/ResultList.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { DetailedCharacter } from '@/types/interfaces';
import useUpdateSearchParams from '@/hooks/useUpdateSearchParams';
import type { FC } from 'react';

const ResultList: FC<{ characters?: DetailedCharacter[] }> = ({
  characters,
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();

  const handleResultClick = (id: number) => {
    const page = searchParams.get('page') ?? undefined;
    const name = searchParams.get('name') ?? undefined;
    navigate(`details/${id}`, { replace: false });
    updateSearchParams({ page, name });
  };
  return (
    <div className={classes.results}>
      {characters
        ? characters.map((character: DetailedCharacter) => (
            <div
              key={character.id}
              onClick={() => {
                handleResultClick(character.id);
              }}
            >
              <Result character={character} />
            </div>
          ))
        : 'No results found.'}
    </div>
  );
};

export default ResultList;
