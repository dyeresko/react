import { Suspense, useRef, type FC } from 'react';
import './App.css';
import CountriesTable from '@/components/CountriesTable';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Loader from '@/components/Loader';
import Modal from '@/components/Modal';
import SelectColumns from '@/components/SelectColumns';

const queryClient = new QueryClient();

const App: FC = () => {
  const modal = useRef<HTMLDialogElement>(null);
  const handleSelectColumnsClick = () => {
    modal.current?.showModal();
  };
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loader />}>
        <button onClick={handleSelectColumnsClick}>Select columns</button>
        <CountriesTable />
      </Suspense>
      <Modal modalDialogRef={modal}>
        <SelectColumns />
      </Modal>
    </QueryClientProvider>
  );
};

export default App;
