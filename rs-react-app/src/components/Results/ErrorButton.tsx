import { Component } from 'react';
import MyError from './MyError.tsx';
class ErrorButton extends Component<object, { hasError: boolean }> {
  constructor(props: object) {
    super(props);
    this.state = { hasError: false };
  }
  handleButtonClick = () => {
    this.setState({ hasError: true });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleButtonClick}>Throw Error</button>
        {this.state.hasError && <MyError error={true} />}
      </div>
    );
  }
}

export default ErrorButton;
