'use client';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';

const BackButton: FC = () => {
  const router = useRouter();
  const handleBackClick = () => router.back();

  return <button onClick={handleBackClick}>Back</button>;
};

export default BackButton;
