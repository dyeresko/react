'use client';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { useTranslations } from 'next-intl';

const BackButton: FC = () => {
  const t = useTranslations('About');
  const router = useRouter();
  const handleBackClick = () => router.back();

  return <button onClick={handleBackClick}>{t('back')}</button>;
};

export default BackButton;
