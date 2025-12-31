import type { Icon as TablerIcon } from '@tabler/icons-react';
import { Link, useLocation } from 'react-router';
import { ActionIcon, Stack, Text, useComputedColorScheme } from '@mantine/core';

interface MobileNavIconProps {
  /** The Tabler icon component to render */
  icon: React.ComponentType<React.ComponentProps<TablerIcon>>;
  /** Text label shown below icon + accessible label for screen readers */
  label: string;
  /** Route path to navigate to */
  to: string;
  /** Visual variant of the ActionIcon - defaults to 'subtle' */
  variant?: 'subtle' | 'outline' | 'light' | 'filled';
  /** Icon size in pixels - defaults to 40 for optimal touch targets */
  size?: number;
}

/**
 * Reusable mobile navigation icon component
 *
 * Combines an ActionIcon with a text label in a vertical stack.
 * Automatically detects and highlights the active route.
 * Maintains theme-aware styling and accessibility best practices.
 */
export function MobileNavIcon({
  icon: Icon,
  label,
  to,
  variant = 'subtle',
  size = 40,
}: MobileNavIconProps) {
  const computedColorScheme = useComputedColorScheme('light');
  const isDark = computedColorScheme === 'dark';
  const location = useLocation();

  // Check if this nav item is currently active
  // Match exact path or paths that start with the route (e.g., /dashboard/*)
  const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));

  // Theme-aware colors
  const textColor = isDark ? 'rocketOrange.4' : 'rocketGray.9';
  const buttonBg = isDark ? 'rocketBlack.8' : 'rocketGray.2';
  const activeBg = isDark ? 'rocketBlack.7' : 'rocketGray.3';
  const borderColor = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.11)';

  return (
    <Stack justify="center" align="center" gap={2}>
      <ActionIcon
        component={Link}
        to={to}
        variant={variant}
        color={textColor}
        bg={isActive ? activeBg : buttonBg}
        radius={10}
        size={30}
        style={{
          boxShadow: `0px 0px 5px 2px ${borderColor}`,
          transition: 'all 0.2s ease',
        }}
        aria-label={label}
        aria-current={isActive ? 'page' : undefined}
      >
        <Icon aria-hidden="true" />
      </ActionIcon>
      <Text
        c={textColor}
        fz="xs"
        fw={isActive ? 600 : 400}
        aria-hidden="true"
        style={{
          transition: 'font-weight 0.2s ease',
        }}
      >
        {label}
      </Text>
    </Stack>
  );
}
