import { Component } from 'react';
import classes from './Result.module.css';

interface IProps {
  name: string;
  status: string;
  species: string;
  gender: string;
  imageUrl: string;
}

class Result extends Component<IProps, object> {
  render() {
    return (
      <div className={classes.result} data-testid="result">
        <img
          alt="Result image"
          className={classes.resultImage}
          src={this.props.imageUrl}
        />
        <div className={classes.resultInfo}>
          <div className={classes.infoItem}>
            <span>Name:</span>
            <span>{this.props.name}</span>
          </div>
          <div className={classes.infoItem}>
            <span>Status:</span>
            <span>{this.props.status}</span>
          </div>
          <div className={classes.infoItem}>
            <span>Species:</span>
            <span> {this.props.species}</span>
          </div>
          <div className={classes.infoItem}>
            <span>Gender:</span>
            <span>{this.props.gender}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Result;
