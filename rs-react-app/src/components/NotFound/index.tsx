import classes from "@/components/NotFound/NotFound.module.css"
import type { FC } from 'react';
const NotFound: FC = () => {

  return (
    <div data-testid="error-not-found" className={classes.errorNotFound}>
      <h2>404 NOT FOUND</h2>
    </div>
  );
};

export default NotFound;
