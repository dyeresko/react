import Result from '../Result/Result.tsx';
import classes from './ResultList.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { DetailedCharacter } from '../../Panel/Panel.tsx';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
}

interface IProps {
  characters?: DetailedCharacter[];
}

function ResultList(props: IProps) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className={classes.results}>
      {props.characters
        ? props.characters.map((character: DetailedCharacter) => (
            <div
              key={character.id}
              onClick={() => {
                const page = searchParams.get('page');
                const name = searchParams.get('name');
                navigate(`details/${character.id}`, { replace: false });
                setSearchParams((prev) => {
                  if (page) {
                    prev.set('page', page);
                  }
                  if (name) {
                    prev.set('name', name);
                  }
                  return prev;
                });
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
