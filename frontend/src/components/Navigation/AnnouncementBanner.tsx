import { useState, useEffect } from 'react';
import { Box, Button, Text, Flex, CloseButton, useComputedColorScheme } from '@mantine/core';
import { IconBell } from '@tabler/icons-react';

interface AnnouncementBannerProps {
  /** Unique identifier for this announcement - change this to show a new announcement */
  id: string;
  /** The message to display in the banner */
  message: string;
  /** Optional action button text */
  actionText?: string;
  /** Optional action button click handler */
  onAction?: () => void;
  /** Optional custom background color */
  backgroundColor?: string;
  /** Optional custom text color */
  textColor?: string;
}

export function AnnouncementBanner({
  id,
  message,
  actionText,
  onAction,
  backgroundColor,
  textColor,
}: AnnouncementBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const computedColorScheme = useComputedColorScheme('light');

  const storageKey = `announcement-dismissed-${id}`;

  useEffect(() => {
    // Check if the announcement has been dismissed
    const isDismissed = localStorage.getItem(storageKey);
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, [storageKey]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(storageKey, 'true');
  };

  if (!isVisible) {
    return null;
  }

  // Default colors based on theme
  const defaultBgColor = computedColorScheme === 'light' ? 'rocketYellow.1' : 'dark.6';
  const defaultTextColor = computedColorScheme === 'light' ? 'dark.9' : 'gray.1';

  return (
    <Box
      bg={backgroundColor || defaultBgColor}
      c={textColor || defaultTextColor}
      py="sm"
      px="md"
      style={{
        borderBottom: computedColorScheme === 'light' ? '1px solid #dee2e6' : '1px solid #373A40',
      }}
    >
      <Flex
        align="center"
        justify="space-between"
        gap="md"
        maw={1200}
        mx="auto"
        wrap="wrap"
      >
        <Flex align="center" gap="sm" style={{ flex: 1, minWidth: 0 }}>
          <IconBell size={20} aria-hidden="true" />
          <Text size="sm" style={{ flex: 1 }}>
            {message}
          </Text>
        </Flex>

        <Flex align="center" gap="xs">
          {actionText && onAction && (
            <Button
              size="xs"
              variant="outline"
              onClick={onAction}
              color={computedColorScheme === 'light' ? 'rocketRed.7' : 'rocketOrange.4'}
            >
              {actionText}
            </Button>
          )}
          <CloseButton
            onClick={handleDismiss}
            aria-label="Dismiss announcement"
            size="sm"
          />
        </Flex>
      </Flex>
    </Box>
  );
}
