import { StrictMode, useState, type FC } from 'react';
import { PaginationDataContext } from '@/hooks/PaginationDataContext';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import RootLayout from '@/layout/RootLayout';
import App from '@/App';
import CharacterDetails from '@components/CharacterDetails/index';
import About from '@components/About/index';
import NotFound from '@components/NotFound/index';
import type { Info } from '@/types/interfaces';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="" element={<App />}>
        <Route path={'details/:id'} element={<CharacterDetails />} />
      </Route>
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const MainApp: FC = () => {
  const [paginationData, setPaginationData] = useState<Info>({
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  });

  return (
    <StrictMode>
      <PaginationDataContext.Provider
        value={{ paginationData, setPaginationData }}
      >
        <RouterProvider router={router} />
      </PaginationDataContext.Provider>
    </StrictMode>
  );
};

export default MainApp;
