import { useRouteError } from 'react-router-dom';
import { Button, Flex, Paper, Stack, Text, Title } from '@mantine/core';

export default function ErrorFallback() {
  const error = useRouteError() as Error;

  console.error('Route error:', error);

  return (
    <Flex direction="column" gap="xl" justify="center" align="center" h="100vh">
      <Paper withBorder shadow="xs" radius="md" p="xl">
        <Stack gap="md" align="center">
          <Title c="red">Something went wrong</Title>
          <Text>
            We're sorry for the inconvenience. Please try refreshing the page or go back to the home
            page.
          </Text>
          <Text c="red">Error: {error.message}</Text>
          <Button w="20%" onClick={() => history.back()}>
            Go Back
          </Button>
          <Button w="20%" variant="outline" onClick={() => window.location.reload()}>
            Refresh Page
          </Button>
          <Button w="20%" onClick={() => (window.location.href = '/')}>
            Home Page
          </Button>
        </Stack>
      </Paper>
    </Flex>
  );
}
