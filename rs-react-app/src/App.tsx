import '@/App.css';
import Results from '@components/Results/Results/index';
import MyErrorBoundary from '@components/MyErrorBoundary/index';
import { type FC } from 'react';
import { Outlet, useMatch } from 'react-router-dom';
import { useAppSelector } from '@/hooks/reduxHooks.ts';
import DownloadPanel from '@components/DownloadPanel/index';
import { useTranslations } from 'next-intl';

const App: FC = () => {
  const cards = useAppSelector((state) => state.cards.items);
  const isPanelOpen = useMatch('/details/:id');

  return (
    <div className={isPanelOpen ? 'App' : ''}>
      <MyErrorBoundary t={useTranslations('Error Boundary')}>
        <Results />
        {cards.length > 0 && <DownloadPanel />}
      </MyErrorBoundary>
      <Outlet />
    </div>
  );
};

export default App;
