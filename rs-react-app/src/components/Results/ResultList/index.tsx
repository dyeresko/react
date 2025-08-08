import Result from '@components/Results/Result/index';
import classes from '@components/Results//ResultList/ResultList.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { DetailedCharacter } from '@/types/interfaces';
import useUpdateSearchParams from '@/hooks/useUpdateSearchParams';

function ResultList(props: { characters?: DetailedCharacter[] }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();
  return (
    <div className={classes.results}>
      {props.characters
        ? props.characters.map((character: DetailedCharacter) => (
            <div
              key={character.id}
              onClick={() => {
                const page = searchParams.get('page') ?? undefined;
                const name = searchParams.get('name') ?? undefined;
                navigate(`details/${character.id}`, { replace: false });
                updateSearchParams({ page, name });
              }}
            >
              <Result
                id={character.id}
                name={character.name}
                status={character.status}
                species={character.species}
                gender={character.gender}
                image={character.image}
                origin={character.origin}
                location={character.location}
              />
            </div>
          ))
        : 'No results found.'}
    </div>
  );
}

export default ResultList;
