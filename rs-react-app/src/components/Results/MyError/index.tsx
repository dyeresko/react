import type { FC } from 'react';

const MyError: FC<{ error: boolean }> = ({ error }) => {
  if (error) {
    throw new Error('Something went wrong.');
  }
  return <div data-testid="error">{error}</div>;
};

export default MyError;
