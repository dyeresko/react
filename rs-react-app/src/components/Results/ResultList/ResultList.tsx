import Result from '../Result/Result.tsx';
import classes from './ResultList.module.css';

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
  characters?: Character[];
}

function ResultList(props: IProps) {
  return (
    <div className={classes.results}>
      {props.characters
        ? props.characters.map((character: Character) => (
            <Result
              key={character.id}
              name={character.name}
              status={character.status}
              species={character.species}
              gender={character.gender}
              imageUrl={character.image}
            />
          ))
        : 'No results found.'}
    </div>
  );
}

export default ResultList;
