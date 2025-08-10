import classes from '@components/Results/Result/Result.module.css';
import type { DetailedCharacter } from '@/types/interfaces';
import { imageNotFoundURL } from '@/data/data';
import type { FC } from 'react';

const Panel: FC<{ character: DetailedCharacter }> = ({ character }) => {
  const { image, name, status, species, gender, origin, location } = character;
  return (
    <div className={classes.result} data-testid="result">
      <img
        alt="Result image"
        className={classes.resultImage}
        src={image ?? imageNotFoundURL}
        data-testid="image"
      />
      <div className={classes.resultInfo}>
        <div className={classes.infoItem}>
          <span>Name:</span>
          <span data-testid="name">{name ?? 'name is missing'}</span>
        </div>
        <div className={classes.infoItem}>
          <span>Status:</span>
          <span data-testid="status">{status ?? 'status is missing'}</span>
        </div>
        <div className={classes.infoItem}>
          <span>Species:</span>
          <span data-testid="species">{species ?? 'species is missing'}</span>
        </div>
        <div className={classes.infoItem}>
          <span>Gender:</span>
          <span data-testid="gender">{gender ?? 'gender is missing'}</span>
        </div>
        <div className={classes.infoItem}>
          <span>Origin:</span>
          <span data-testid="origin">
            {origin?.name ?? 'origin is missing'}
          </span>
        </div>
        <div className={classes.infoItem}>
          <span>Location:</span>
          <span data-testid="location">
            {location?.name ?? 'location is missing'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Panel;
