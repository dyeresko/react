import { Component } from 'react';

class MyError extends Component<{ error: boolean }, object> {
  render() {
    if (this.props.error) {
      throw new Error('Something went wrong.');
    }
    return <div>{this.props.error}</div>;
  }
}

export default MyError;
