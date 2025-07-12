import { Component } from 'react';

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
      <div className="result">
        <img
          alt="Result image"
          className="resultImg"
          src={this.props.imageUrl}
        />
        <div className="resultInfo">
          <h4 className="resultName">Name: {this.props.name}</h4>
          <h4 className="resultStatus">Status: {this.props.status}</h4>
          <h4 className="resultSpecies">Species: {this.props.species}</h4>
          <h4 className="resultGender">Gender: {this.props.gender}</h4>
        </div>
      </div>
    );
  }
}

export default Result;
