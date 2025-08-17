'use client';
import Controls from '@components/Controls/index';
import '@/App.css';
import { type FC, type ReactNode } from 'react';
import Results from '@components/Results/Results/index';
import MyErrorBoundary from '@components/MyErrorBoundary/index';
import { useAppSelector } from '@/hooks/reduxHooks.ts';
import DownloadPanel from '@components/DownloadPanel/index';
import { usePathname } from 'next/navigation';

const App: FC<{ children: ReactNode }> = ({ children }) => {
  const cards = useAppSelector((state) => state.cards.items);
  const pathname = usePathname();
  const isPanelOpen = pathname.startsWith('/characters/details/');
  return (
    <>
      <Controls />
      <div className={isPanelOpen ? 'App' : ''}>
        <MyErrorBoundary>
          <Results />
          {cards.length > 0 && <DownloadPanel />}
          {children}
        </MyErrorBoundary>
      </div>
    </>
  );
};

export default App;
