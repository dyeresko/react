import { Outlet } from 'react-router-dom';
import Controls from '@components/Controls/index';
import '@/App.css';
import { type FC } from 'react';

const RootLayout: FC = () => {
  return (
    <>
      <Controls />
      <Outlet />
    </>
  );
};

export default RootLayout;
