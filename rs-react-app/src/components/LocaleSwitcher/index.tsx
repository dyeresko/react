'use client';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import type { FC } from 'react';

const LocaleSwitcher: FC = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = () => {
    router.push(`/${locale === 'ru' ? 'en' : 'ru'}${pathname.substring(3)}`);
  };

  return (
    <button onClick={changeLanguage}>
      {locale === 'ru' ? 'Switch to English' : 'Переключиться на Русский'}
    </button>
  );
};

export default LocaleSwitcher;
