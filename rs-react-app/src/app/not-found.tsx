'use client';
import BackButton from '@/components/BackButton';
import NotFound from '@/components/NotFound';
import type { FC } from 'react';

const NotFoundPage: FC = () => {
  console.log('HAHHA');
  return (
    <div>
      <BackButton />
      <NotFound />
    </div>
  );
};

export default NotFoundPage;
