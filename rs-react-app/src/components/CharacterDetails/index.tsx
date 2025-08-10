import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState, type FC } from 'react';
import Panel from '@components/Panel/index';
import type { DetailedCharacter } from '@/types/interfaces';
import logo from '@/assets/react.svg';
import useUpdateSearchParams from '@/hooks/useUpdateSearchParams';
import { useGetResultQuery } from '@/app/services/api';

const CharacterDetails: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<DetailedCharacter>({
    id: Number(id) || 0,
  });
  const [searchParams] = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();
  const { data, error, isFetching, refetch } = useGetResultQuery({
    id: id ?? '0',
  });

  const handleCloseClick = () => {
    const page = searchParams.get('page') ?? undefined;
    const name = searchParams.get('name') ?? undefined;
    navigate('/', { replace: false });
    updateSearchParams({ page, name });
  };
  const handleRefreshClick = () => {
    refetch();
  };

  useEffect(() => {
    if (data) {
      setCharacter(data);
    }
  }, [data]);

  if (isFetching) {
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

  if (error) {
    return <h2 data-testid="error">Request did not succeed</h2>;
  }

  return (
    <div>
      <button onClick={handleRefreshClick} disabled={isFetching}>
        {isFetching ? 'Refreshing...' : 'Refresh'}
      </button>
      <button onClick={handleCloseClick}>Close</button>
      <Panel character={character} />
    </div>
  );
};

export default CharacterDetails;
