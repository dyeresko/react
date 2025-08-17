import classes from '@components/Results/Result/Result.module.css';
import type { DetailedCharacter } from '@/types/interfaces';
import { imageNotFoundURL } from '@/data/data';
import type { FC } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
const Panel: FC<{ character: DetailedCharacter }> = ({ character }) => {
  const { image, name, status, species, gender, origin, location } = character;
  const t = useTranslations('Result');
  return (
    <div className={classes.result} data-testid="result">
      <Image
        width={300}
        height={300}
        alt={t('alt-result')}
        className={classes.resultImage}
        src={image ?? imageNotFoundURL}
        data-testid="image"
      />
      <div className={classes.resultInfo}>
        <div className={classes.infoItem}>
          <span>{t('name')}:</span>
          <span data-testid="name">{name ?? 'name is missing'}</span>
        </div>
        <div className={classes.infoItem}>
          <span>{t('status')}:</span>
          <span data-testid="status">{status ?? 'status is missing'}</span>
        </div>
        <div className={classes.infoItem}>
          <span>{t('species')}:</span>
          <span data-testid="species">{species ?? 'species is missing'}</span>
        </div>
        <div className={classes.infoItem}>
          <span>{t('gender')}:</span>
          <span data-testid="gender">{gender ?? 'gender is missing'}</span>
        </div>
        <div className={classes.infoItem}>
          <span>{t('origin')}:</span>
          <span data-testid="origin">
            {origin?.name ?? 'origin is missing'}
          </span>
        </div>
        <div className={classes.infoItem}>
          <span>{t('location')}:</span>
          <span data-testid="location">
            {location?.name ?? 'location is missing'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Panel;
