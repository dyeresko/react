import { StrictMode, useState } from 'react';
import type { IInfo } from '../Results/Results/Results.tsx';
import { PaginationDataContext } from '../../../hooks/PaginationDataContext.tsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import RootLayout from '../../../layout/RootLayout.tsx';
import App from '../../App.tsx';
import CharacterDetails from '../CharacterDetails/CharacterDetails.tsx';
import About from '../About/About.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="" element={<App />}>
        <Route path={'details/:id'} element={<CharacterDetails />} />
      </Route>
      <Route path="/about" element={<About />} />
    </Route>
  )
);

const MainApp = () => {
  const [paginationData, setPaginationData] = useState<IInfo>({
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
