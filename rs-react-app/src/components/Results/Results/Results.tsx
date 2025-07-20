import { Component } from 'react';
import classes from './Results.module.css';
import ErrorButton from '../ErrorButton.tsx';
import logo from '../../../assets/react.svg';
import ResultList from '../ResultList/ResultList.tsx';
interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
}

export interface IResponse {
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

  setBaseApiQuery = () => {
    this.setState({ loading: true });
    this.setState(
      {
        apiQuery: this.baseApiQuery,
      },
      () => {
        this.fetchResults();
      }
    );
  };

  setApiQuery = () => {
    this.setState({ loading: true });
    this.setState(
      {
        apiQuery: `${this.baseApiQuery}?name=${this.props.searchResult}`,
      },
      () => {
        this.fetchResults();
      }
    );
  };
  setUrl = () => {
    if (this.props.searchResult) {
      this.setApiQuery();
    } else {
      this.setBaseApiQuery();
    }
  };
  componentDidMount() {
    this.setUrl();
  }

  componentDidUpdate(prevProps: IProps) {
    if (prevProps.searchResult !== this.props.searchResult) {
      this.setState({ loading: true });
      this.setUrl();
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
        setTimeout(() => {
          if (data.results) {
            this.setState({ loading: false, characters: data.results ?? [] });
          }
        }, 200);
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
            <img
              data-testid="loader"
              className="logo"
              src={logo}
              alt="Loading..."
            />
          )}
          {this.state.error && (
            <h2 data-testid="error" className={classes.header}>
              Request did not succeed
            </h2>
          )}
          {!this.state.error && !this.state.loading && (
            <ResultList characters={this.state.characters} />
          )}
          <ErrorButton />
        </div>
      </div>
    );
  }
}

export default Results;
