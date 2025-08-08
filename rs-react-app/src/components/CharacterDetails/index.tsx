import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState, type FC } from 'react';
import Panel from '@components/Panel/index';
import type { DetailedCharacter } from '@/types/interfaces';
import logo from '@/assets/react.svg';
import { baseApiQuery } from '@/data/data';
import useUpdateSearchParams from '@/hooks/useUpdateSearchParams';

const CharacterDetails: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<DetailedCharacter>({
    id: Number(id) || 0,
  });
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();

  const handleClick = () => {
    const page = searchParams.get('page') ?? undefined;
    const name = searchParams.get('name') ?? undefined;
    navigate('/', { replace: false });
    updateSearchParams({ page, name });
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${baseApiQuery}/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw Error('Failed to fetch results.');
        }
        return response.json();
      })
      .then((data) => {
        setTimeout(() => {
          setLoading(false);
          setCharacter(data);
        }, 200);
      });
  }, [id]);

  if (loading) {
    return (
      <div>
        <img
          data-testid="loader"
          className="logo"
          src={logo}
          alt="Loading..."
        />
      </div>
    );
  }
  return (
    <div>
      <button onClick={handleClick}>Close</button>
      <Panel character={character} />
    </div>
  );
};

export default CharacterDetails;
