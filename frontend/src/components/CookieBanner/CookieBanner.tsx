import { useState, useEffect } from 'react';
import { Paper, Text, Anchor, Button, Stack, Group, Collapse } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconCookie } from '@tabler/icons-react';
import { getCookieConsent, setCookieConsent, type CookieConsent } from './cookieConsent';

/**
 * CookieBanner Component
 *
 * Amendment 13 compliant cookie consent banner for Israel's Privacy Protection Law.
 * Appears on first visit to request explicit consent for analytics cookies.
 *
 * Compliance Features:
 * - Explicit opt-in consent (no pre-checked boxes)
 * - Clear explanation of cookie purposes
 * - Easy to accept or decline
 * - Allows customization of preferences
 * - Essential cookies explained (no consent required by law)
 * - Analytics cookies require consent before loading
 *
 * Legal Notes:
 * - Essential cookies (session, CSRF) don't require consent under Amendment 13
 * - Analytics cookies (Google Analytics) require explicit consent before loading
 * - Consent choice is stored in localStorage
 * - When you add Google Analytics, check consent before initializing
 */
export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    // Check if user has already made a consent choice
    const consent = getCookieConsent();

    if (!consent) {
      // No consent choice yet - show banner after small delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    // User accepts both essential and analytics cookies
    const consent: CookieConsent = {
      essential: true, // Always true (required for site to function)
      analytics: true, // User explicitly accepted
      timestamp: new Date().toISOString(),
    };
    setCookieConsent(consent);
    setIsVisible(false);

    // Notify app that consent was granted so GA can initialize immediately
    window.dispatchEvent(new Event('cookieConsentUpdated'));
  };

  const handleDeclineAnalytics = () => {
    // User declines analytics (essential cookies still work - no consent needed)
    const consent: CookieConsent = {
      essential: true, // Always true (required for site to function)
      analytics: false, // User explicitly declined
      timestamp: new Date().toISOString(),
    };
    setCookieConsent(consent);
    setIsVisible(false);

    // Analytics will not be loaded - no action needed
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Paper
      shadow="xl"
      p={isMobile ? 'sm' : 'md'}
      radius="md"
      withBorder
      style={{
        position: 'fixed',
        bottom: isMobile ? '70px' : '20px', // Above mobile bottom nav (60px height + 10px gap)
        left: isMobile ? '10px' : 'auto',
        right: isMobile ? '10px' : '20px',
        maxWidth: isMobile ? 'calc(100% - 20px)' : '420px',
        zIndex: 1000,
        backgroundColor: 'var(--mantine-color-body)',
      }}
    >
      <Stack gap={isMobile ? 'sm' : 'md'}>
        {/* Header */}
        <Group gap="xs" align="flex-start" wrap="nowrap">
          <IconCookie size={isMobile ? 20 : 24} style={{ marginTop: '2px', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <Text size="sm" fw={600} mb={4}>
              Cookie Preferences
            </Text>
            {!isMobile && (
              <Text size="xs" c="dimmed">
                We use cookies to improve your experience and analyze site usage.
              </Text>
            )}
          </div>
        </Group>

        {/* Main content - simplified on mobile */}
        {!isMobile ? (
          <Text size="xs">
            We use <strong>Google Analytics</strong> to understand how you use JobRocket
            and improve the platform. You can accept or decline - it won't affect your ability to use
            the site.
          </Text>
        ) : (
          <Text size="xs">
            We use analytics to improve JobRocket. Accept or decline below.
          </Text>
        )}

        {/* Details section (collapsible) */}
        <Collapse in={showDetails}>
          <Stack gap="xs" p="xs" style={{ backgroundColor: 'var(--mantine-color-default-hover)', borderRadius: '4px' }}>
            <Text size="xs" fw={500}>
              What we'll track if you accept:
            </Text>
            <Text size="xs" c="dimmed">
              • Pages you visit
              <br />
              • How you found JobRocket
              <br />
              • Your general location (city/country)
              <br />
              • Device and browser type
            </Text>

            <Text size="xs" fw={500} mt="xs">
              What we won't track:
            </Text>
            <Text size="xs" c="dimmed">
              • Your name, email, or personal info
              <br />
              • Your applications or profile content
              <br />• Your precise location or IP address
            </Text>

            <Text size="xs" mt="xs" c="dimmed" fs="italic">
              Note: We use essential cookies for login and security - these don't require your
              consent and are always active.
            </Text>
          </Stack>
        </Collapse>

        {/* Toggle details link */}
        <Anchor
          size="xs"
          onClick={() => setShowDetails(!showDetails)}
          style={{ cursor: 'pointer' }}
        >
          {showDetails ? 'Hide details' : 'Show details'}
        </Anchor>

        {/* Action buttons */}
        <Group grow>
          <Button onClick={handleAcceptAll} size={isMobile ? 'xs' : 'sm'} variant="filled">
            {isMobile ? 'Accept' : 'Accept Analytics'}
          </Button>
          <Button onClick={handleDeclineAnalytics} size={isMobile ? 'xs' : 'sm'} variant="outline" c="rocketOrange">
            Decline
          </Button>
        </Group>

        {/* Privacy policy link */}
        <Text size="xs" ta="center" c="dimmed">
          <Anchor href="/privacy-policy" size="xs" underline="always">
            Read our Privacy Policy
          </Anchor>
        </Text>
      </Stack>
    </Paper>
  );
}
