import classes from '@components/Results/Result/Result.module.css';
import type { DetailedCharacter } from '@/types/interfaces';
import { imageNotFoundURL } from '@/data/data';

const Panel = (props: DetailedCharacter) => {
  return (
    <div className={classes.result} data-testid="result">
      <img
        alt="Result image"
        className={classes.resultImage}
        src={props.image ? props.image : imageNotFoundURL}
        data-testid="image"
      />
      <div className={classes.resultInfo}>
        <div className={classes.infoItem}>
          <span>Name:</span>
          <span data-testid="name">
            {props.name ? props.name : 'name is missing'}
          </span>
        </div>
        <div className={classes.infoItem}>
          <span>Status:</span>
          <span data-testid="status">
            {props.status ? props.status : 'status is missing'}
          </span>
        </div>
        <div className={classes.infoItem}>
          <span>Species:</span>
          <span data-testid="species">
            {props.species ? props.species : 'species is missing'}
          </span>
        </div>
        <div className={classes.infoItem}>
          <span>Gender:</span>
          <span data-testid="gender">
            {props.gender ? props.gender : 'gender is missing'}
          </span>
        </div>
        <div className={classes.infoItem}>
          <span>Origin:</span>
          <span data-testid="origin">
            {props.origin?.name ? props.origin.name : 'origin is missing'}
          </span>
        </div>
        <div className={classes.infoItem}>
          <span>Location:</span>
          <span data-testid="location">
            {props.location?.name ? props.location.name : 'location is missing'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Panel;
