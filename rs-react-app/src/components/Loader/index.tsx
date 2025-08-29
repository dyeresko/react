import type { FC } from 'react';

import classes from '@/components/Loader/Loader.module.css';

const Loader: FC = () => {
  return <div className={classes.loader}></div>;
};

export default Loader;
