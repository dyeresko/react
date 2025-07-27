import { useEffect, useState } from 'react';
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
const baseApiQuery = 'https://rickandmortyapi.com/api/character/';

function Results(props: IProps) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [apiQuery, setApiQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    if (props.searchResult) {
      setApiQuery(`${baseApiQuery}?name=${props.searchResult}`);
    } else {
      setApiQuery(baseApiQuery);
    }
  }, [props.searchResult]);

  useEffect(() => {
    if (!apiQuery) return;
    setError(false);
    fetch(apiQuery)
      .then((response) => {
        if (!response.ok) {
          throw Error('Failed to fetch results.');
        }
        return response.json();
      })
      .then((data: IResponse) => {
        console.log(data);
        setTimeout(() => {
          if (data.results) {
            setLoading(false);
            setCharacters(data.results ?? []);
          }
        }, 200);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [apiQuery]);

  return (
    <div>
      <div>
        {loading && (
          <img
            data-testid="loader"
            className="logo"
            src={logo}
            alt="Loading..."
          />
        )}
        {error && (
          <h2 data-testid="error" className={classes.header}>
            Request did not succeed
          </h2>
        )}
        {!error && !loading && <ResultList characters={characters} />}
        <ErrorButton />
      </div>
    </div>
  );
}

export default Results;
