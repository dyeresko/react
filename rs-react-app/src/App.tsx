import { Suspense, type FC } from 'react';
import './App.css';
import CountriesTable from '@/components/CountriesTable';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Loader from '@/components/Loader';

const queryClient = new QueryClient();

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loader />}>
        <CountriesTable />
      </Suspense>
    </QueryClientProvider>
  );
};

export default App;
