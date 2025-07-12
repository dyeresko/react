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

interface IResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results?: Character[];
  error?: string;
}

class Results extends Component<object, { characters: Character[] }> {
  constructor(props: object) {
    super(props);
    this.state = { characters: [] };
  }
  componentDidMount() {
    fetch('https://rickandmortyapi.com/api/character/')
      .then((response) => response.json())
      .then((data: IResponse) => {
        if (data.results) {
          this.setState({ characters: data.results });
        }
      });
  }

  render() {
    return (
      <div className={classes.results}>
        {this.state.characters.map((character: Character) => (
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

export default Results;
