import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Panel from '@components/Panel/index';
import type { DetailedCharacter } from '@/types/interfaces';
import logo from '@/assets/react.svg';
import { baseApiQuery } from '@/data/data';
import useUpdateSearchParams from '@/hooks/useUpdateSearchParams';

function CharacterDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<DetailedCharacter>({
    id: id ? Number(id) : 0,
  });
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();

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
  return (
    <div>
      {loading && (
        <img
          data-testid="loader"
          className="logo"
          src={logo}
          alt="Loading..."
        />
      )}
      {!loading && (
        <>
          <button
            onClick={() => {
              const page = searchParams.get('page') ?? undefined;
              const name = searchParams.get('name') ?? undefined;
              navigate('/', { replace: false });
              updateSearchParams({ page, name });
            }}
          >
            Close
          </button>
          <Panel
            id={character.id}
            name={character.name}
            status={character.status}
            species={character.species}
            type={character.type}
            gender={character.gender}
            image={character.image}
            origin={character.origin}
            location={character.location}
          />
        </>
      )}
    </div>
  );
}

export default CharacterDetails;
