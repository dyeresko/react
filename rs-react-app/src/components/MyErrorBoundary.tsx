import { Component, type ErrorInfo, type ReactNode } from 'react';
import ErrorButton from './Results/ErrorButton.tsx';

interface IState {
  hasError: boolean;
}

interface IProps {
  children: ReactNode;
}

class MyErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): IState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <ErrorButton />
        </div>
      );
    }
    return this.props.children;
  }
}

export default MyErrorBoundary;
