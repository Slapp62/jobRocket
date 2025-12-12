import { Button, Center, Flex, Text, Title } from '@mantine/core';
import { IconMoodSad } from '@tabler/icons-react';
import { ReactNode } from 'react';

/**
 * Props for the EmptyState component
 */
interface EmptyStateProps {
  /**
   * Custom icon to display. Defaults to IconMoodSad with size 100
   */
  icon?: ReactNode;
  /**
   * Main title text to display (e.g., "No Listings Found")
   */
  title: string;
  /**
   * Optional description text to display below the title
   */
  description?: string;
  /**
   * Optional action button configuration
   */
  action?: {
    /**
     * Button label text
     */
    label: string;
    /**
     * Click handler for the button
     */
    onClick: () => void;
    /**
     * Whether to show the button only when user is logged out
     * Default: false (always show if action is provided)
     */
    showOnlyWhenLoggedOut?: boolean;
  };
  /**
   * Whether the user is currently logged in (used with showOnlyWhenLoggedOut)
   */
  isLoggedIn?: boolean;
}

/**
 * EmptyState Component
 *
 * A reusable component for displaying consistent "not found" and empty state messages
 * throughout the application. Based on the main 404 page design.
 *
 * Features:
 * - Centered layout with consistent spacing
 * - Customizable icon (defaults to sad face)
 * - Title and optional description text
 * - Optional action button with conditional visibility
 *
 * @example
 * // Basic usage with no button
 * <EmptyState title="No applications found" />
 *
 * @example
 * // With description and action button
 * <EmptyState
 *   title="No Listings Found"
 *   description="Try adjusting your search filters"
 *   action={{
 *     label: "Clear Filters",
 *     onClick: () => clearAllFilters()
 *   }}
 * />
 *
 * @example
 * // With conditional button visibility (only show when logged out)
 * <EmptyState
 *   title="404: Page Not Found"
 *   action={{
 *     label: "Return to Homepage",
 *     onClick: () => navigate('/'),
 *     showOnlyWhenLoggedOut: true
 *   }}
 *   isLoggedIn={user !== null}
 * />
 */
export const EmptyState = ({
  icon,
  title,
  description,
  action,
  isLoggedIn = false,
}: EmptyStateProps) => {
  // Determine if the button should be shown
  const shouldShowButton =
    action && (!action.showOnlyWhenLoggedOut || !isLoggedIn);

  return (
    <Center>
      <Flex direction="column" align="center" justify="center" mt={100}>
        {/* Icon - defaults to sad face if not provided */}
        {icon || <IconMoodSad size={100} />}

        {/* Title - main message */}
        <Title order={1} className="text-3xl font-bold" mt="md">
          {title}
        </Title>

        {/* Description - optional secondary message */}
        {description && (
          <Text c="dimmed" mt="sm">
            {description}
          </Text>
        )}

        {/* Action button - conditionally rendered */}
        {shouldShowButton && (
          <Button onClick={action.onClick} mt="lg" size="md">
            {action.label}
          </Button>
        )}
      </Flex>
    </Center>
  );
};
