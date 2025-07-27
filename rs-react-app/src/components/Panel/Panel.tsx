import classes from '../Results/Result/Result.module.css';

export interface DetailedCharacter {
  id: number;
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
  image?: string;
  origin?: {
    name: string;
  };
  location?: {
    name: string;
  };
}

const Panel = (props: DetailedCharacter) => {
  return (
    <div className={classes.result} data-testid="result">
      <img
        alt="Result image"
        className={classes.resultImage}
        src={
          props.image
            ? props.image
            : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/640px-No_image_3x4.svg.png'
        }
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
