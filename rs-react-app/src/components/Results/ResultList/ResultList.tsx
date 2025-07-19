import { Component } from 'react';
import Result from '../Result/Result.tsx';
import classes from './Results.module.css';
interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
}

interface IProps {
  characters: Character[];
}

class ResultList extends Component<IProps, object> {
  render() {
    return (
      <div className={classes.results}>
        {this.props.characters.map((character: Character) => (
          <Result
            key={character.id}
            name={character.name}
            status={character.status}
            species={character.species}
            gender={character.gender}
            imageUrl={character.image}
          />
        ))}
      </div>
    );
  }
}

export default ResultList;
