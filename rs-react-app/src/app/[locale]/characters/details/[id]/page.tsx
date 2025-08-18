import CharacterDetails from '@/components/CharacterDetails';
import type { FC } from 'react';

type Params<T> = Promise<T>;

const DetailsPage: FC<{ params: Params<{ id: string }> }> = async ({
  params,
}) => {
  const { id } = await params;
  return <CharacterDetails id={id} />;
};

export default DetailsPage;
