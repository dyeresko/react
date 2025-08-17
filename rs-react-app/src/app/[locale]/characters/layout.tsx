'use client';
import Controls from '@components/Controls/index';
import '@/App.css';
import { useEffect, useState, type FC, type ReactNode } from 'react';
import Results from '@components/Results/Results/index';
import MyErrorBoundary from '@components/MyErrorBoundary/index';
import { useAppSelector } from '@/hooks/reduxHooks.ts';
import DownloadPanel from '@components/DownloadPanel/index';
import { usePathname } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import type { Response } from '@/types/interfaces';
import Image from 'next/image';
import logo from '@/assets/react.svg';

const App: FC<{ children: ReactNode }> = ({ children }) => {
  const cards = useAppSelector((state) => state.cards.items);
  const pathname = usePathname();
  const locales = routing.locales;
  const isPanelOpen = locales.some((locale) =>
    pathname.startsWith(`/${locale}/characters/details/`)
  );
  const t = useTranslations('Error Boundary');
  const [initialResponse, setInitialResponse] = useState<Response | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchInitialData() {
      const res = await fetch(`/api/results?page=1`);
      const data: Response = await res.json();
      setInitialResponse(data);
      setIsLoading(false);
    }
    fetchInitialData();
  }, []);

  if (isLoading)
    return (
      <div>
        <Image
          width={300}
          height={300}
          data-testid="loader"
          className="logo"
          src={logo}
          alt={`${t('alt-loading')}...`}
        />
      </div>
    );

  return (
    <>
      <Controls />
      <div className={isPanelOpen ? 'App' : ''}>
        <MyErrorBoundary t={t}>
          <Results initPage={1} response={initialResponse} />
          {cards.length > 0 && <DownloadPanel />}
        </MyErrorBoundary>
        {children}
      </div>
    </>
  );
};

export default App;
