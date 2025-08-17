import { useState, type FC } from 'react';
import MyError from '@components/Results/MyError/index';
import { useTranslations } from 'next-intl';

const ErrorButton: FC = () => {
  const [hasError, setHasError] = useState(false);
  const t = useTranslations('Error Boundary');

  const handleButtonClick = () => {
    setHasError(true);
  };
  return (
    <div>
      <button onClick={handleButtonClick}>{t('throw')}</button>
      {hasError && <MyError error={true} />}
    </div>
  );
};

export default ErrorButton;
