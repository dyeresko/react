import { StrictMode, type FC } from 'react';
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="" element={<App />}>
        <Route path={'details/:id'} element={<CharacterDetails id="1" />} />
      </Route>
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const MainApp: FC = () => {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
};

export default MainApp;
