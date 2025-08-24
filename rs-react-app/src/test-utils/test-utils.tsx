import type { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/app/store';

const customRender = (reactNode: ReactNode) => {
  return render(<Provider store={store}>{reactNode}</Provider>);
};

export default customRender;
