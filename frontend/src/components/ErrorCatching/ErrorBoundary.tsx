import { Component, ReactNode } from 'react';
import { Button, Container, Text, Title } from '@mantine/core';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so next render shows fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Log error details to console for debugging
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container>
          <Title>Something went wrong</Title>
          <Text>We're sorry for the inconvenience. Please try refreshing the page.</Text>
          <Button onClick={() => window.location.reload()}>Refresh Page</Button>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
