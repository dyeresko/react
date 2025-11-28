import { useState } from 'react';
import MyError from './MyError.tsx';

function ErrorButton() {
  const [hasError, setHasError] = useState(false);

  const handleButtonClick = () => {
    setHasError(true);
  };
  return (
    <div>
      <button onClick={handleButtonClick}>Throw Error</button>
      {hasError && <MyError error={true} />}
    </div>
  );
}

export default ErrorButton;
