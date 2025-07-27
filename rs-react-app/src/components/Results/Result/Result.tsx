import classes from './Result.module.css';

interface IProps {
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
  imageUrl?: string;
}

function Result(props: IProps) {
  return (
    <div className={classes.result} data-testid="result">
      <img
        alt="Result image"
        className={classes.resultImage}
        src={
          props.imageUrl
            ? props.imageUrl
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
      </div>
    </div>
  );
}

export default Result;
