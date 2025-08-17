'use client';
import type { FC } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

const LocaleBackButton: FC = () => {
  const t = useTranslations('About');
  const router = useRouter();
  const handleBackClick = () => router.back();

  return <button onClick={handleBackClick}>{t('back')}</button>;
};

export default LocaleBackButton;
