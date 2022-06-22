import React, { ReactNode } from 'react';

interface Props {
  fallback: React.ElementType;
  message?: string;
  onReset?: () => void;
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  info: Error | null;
}

const initialState: State = {
  hasError: false,
  info: null,
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
    // this.onReset = this.onReset.bind(this);
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, info: error };
  }

  resetErrorBoundary = () => {
    console.log('this.props', this.props);
    const { onReset } = this.props;
    // eslint-disable-next-line no-void
    onReset == null ? void 0 : onReset();
    this.reset();
  };

  reset() {
    this.setState(initialState);
  }

  render() {
    const { hasError, info } = this.state;
    const { children, message } = this.props;

    if (hasError) {
      const props = {
        error: info,
        resetErrorBoundary: this.resetErrorBoundary,
      };
      return (
        <this.props.fallback
          onReset={props.resetErrorBoundary}
          message={message}
        />
      );
    }
    return children;
  }
}

export default ErrorBoundary;
