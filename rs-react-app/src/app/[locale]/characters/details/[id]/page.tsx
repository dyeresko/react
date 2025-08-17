import CharacterDetails from '@/components/CharacterDetails';
import type { FC } from 'react';

const DetailsPage: FC<{ params: { id: string } }> = async ({ params }) => {
  const { id } = await params;
  return <CharacterDetails id={id} />;
};

export default DetailsPage;
