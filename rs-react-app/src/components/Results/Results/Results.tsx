import { Component } from 'react';
import Result from '../Result/Result.tsx';
import classes from './Results.module.css';
import ErrorButton from '../ErrorButton.tsx';
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
interface IProps {
  searchResult?: string;
}

interface IState {
  characters: Character[];
  apiQuery: string;
}

class Results extends Component<IProps, IState> {
  baseApiQuery: string;
  constructor(props: IProps) {
    super(props);
    this.baseApiQuery = 'https://rickandmortyapi.com/api/character/';
    this.state = { characters: [], apiQuery: '' };
  }
  componentDidUpdate(prevProps: IProps) {
    if (prevProps.searchResult !== this.props.searchResult) {
      if (this.props.searchResult) {
        this.setState(
          {
            apiQuery: `${this.baseApiQuery}?name=${this.props.searchResult?.trim()}`,
          },
          () => {
            this.fetchResults();
          }
        );
      } else {
        this.setState(
          {
            apiQuery: this.baseApiQuery,
          },
          () => {
            this.fetchResults();
          }
        );
      }
    }
  }
  fetchResults() {
    fetch(this.state.apiQuery)
      .then((response) => response.json())
      .then((data: IResponse) => {
        if (data.results) {
          this.setState({ characters: data.results });
        }
      });
  }

  render() {
    return (
      <div>
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
        <ErrorButton />
      </div>
    );
  }
}

export default Results;
