import { Component, type ErrorInfo } from 'react';
import ErrorButton from '@components/Results/ErrorButton.tsx';
import type {
  ErrorBoundaryProps,
  ErrorBoundaryState,
} from '@/types/interfaces';

class MyErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo);
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
