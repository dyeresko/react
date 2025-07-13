import { Component } from 'react';
import Result from '../Result/Result.tsx';
import classes from './Results.module.css';
import ErrorButton from '../ErrorButton.tsx';
import logo from '../../../assets/react.svg';
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
  loading: boolean;
  error: boolean;
}

class Results extends Component<IProps, IState> {
  baseApiQuery: string;
  constructor(props: IProps) {
    super(props);
    this.baseApiQuery = 'https://rickandmortyapi.com/api/character/';
    this.state = { characters: [], apiQuery: '', error: false, loading: false };
  }
  componentDidUpdate(prevProps: IProps) {
    if (prevProps.searchResult !== this.props.searchResult) {
      this.setState({ loading: true });
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
    this.setState({ error: false });
    fetch(this.state.apiQuery)
      .then((response) => {
        if (!response.ok) {
          throw Error('Failed to fetch results.');
        }
        return response.json();
      })
      .then((data: IResponse) => {
        if (data.results) {
          this.setState({ loading: false, characters: data.results ?? [] });
        }
      })
      .catch(() => {
        this.setState({ loading: false, error: true });
      });
  }

  render() {
    return (
      <div>
        <div>
          {this.state.loading && (
            <img className="logo" src={logo} alt="Loading..." />
          )}
          {this.state.error && <h2>Request did not succeed</h2>}
          {!this.state.error && !this.state.loading && (
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
          )}
          <ErrorButton />
        </div>
      </div>
    );
  }
}

export default Results;
