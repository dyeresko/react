'use client';
import Controls from '@components/Controls/index';
import '@/App.css';
import { type FC, type ReactNode } from 'react';
import Results from '@components/Results/Results/index';
import MyErrorBoundary from '@components/MyErrorBoundary/index';
import { useAppSelector } from '@/hooks/reduxHooks.ts';
import DownloadPanel from '@components/DownloadPanel/index';
import { usePathname } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

const App: FC<{ children: ReactNode }> = ({ children }) => {
  const cards = useAppSelector((state) => state.cards.items);
  const pathname = usePathname();
  const locales = routing.locales;
  const isPanelOpen = locales.some((locale) => pathname.startsWith(`/${locale}/characters/details/`));
  const t = useTranslations('Error Boundary');
  return (
    <>
      <Controls />
      <div className={isPanelOpen ? 'App' : ''}>
        <MyErrorBoundary t={t}>
          <Results />
          {cards.length > 0 && <DownloadPanel />}
        </MyErrorBoundary>
        {children}
      </div>
    </>
  );
};

export default App;
