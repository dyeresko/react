import { StrictMode, useState } from 'react';
import type { IInfo } from '../Results/Results/Results.tsx';
import { PaginationDataContext } from '../../../hooks/PaginationDataContext.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from '../../../layout/RootLayout.tsx';
import App from '../../App.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      // {
      //   path: 'details/:id',
      //   element: <Details />
      // },
    ],
  },
]);

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
