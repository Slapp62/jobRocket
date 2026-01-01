import { useEffect, useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  ActionIcon,
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Flex,
  Group,
  ScrollArea,
  Stack,
  Tooltip,
  useComputedColorScheme,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { AppDispatch, RootState } from '@/store/store';
import { clearUser, setUser, toggleAdminView } from '@/store/userSlice';
import { Logo } from './Logo';
import { LightDarkToggle } from './LightDarkToggle';

export function Navbar() {
  const user = useSelector((state: RootState) => state.userSlice.user);
  const isMobile = useMediaQuery('(max-width: 726px)');
  const loggedIn = useSelector((state: RootState) => state.userSlice.isLoggedIn);
  const isBusinessUser = user?.profileType === 'business';
  const dispatch = useDispatch<AppDispatch>();
  const computedColorScheme = useComputedColorScheme('light');

  const jumpTo = useNavigate();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  // Theme-aware colors
  const drawerLinkColor = 'rocketBlack.6';
  const buttonBorderColor = computedColorScheme === 'light' ? 'black' : 'white';
  const buttonTextColor = computedColorScheme === 'light' ? 'black' : 'white';

  const logoutHandler = async () => {
    try {
      await axios.post('/api/users/logout');
      dispatch(clearUser());
      jumpTo('/');
      notifications.show({
        title: 'Success',
        message: 'Logged out successfully!',
        color: 'green',
      });
    } catch (error) {
      // Even if logout fails, clear local state
      dispatch(clearUser());
      notifications.show({
        title: 'Warning',
        message: 'Logged out locally',
        color: 'yellow',
      });
    }
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      bg={computedColorScheme === 'light' ? 'rocketGray.2' : 'rocketBlack.9'}
      pos="sticky"
      pt={5}
    >
      <header>
        <Flex justify="space-between" align="center" h="100%" px="sm">
          <Logo />

          {/* ACCESSIBILITY: Wrap navigation links in nav element with descriptive label
              This helps screen reader users identify and navigate to the main navigation */}
          <nav aria-label="Main navigation">
            <Group visibleFrom="md" gap={5}>
              <Button fz="md" variant="rocketSubtle" c={buttonTextColor} component={Link} to="/">
                Home
              </Button>
              <Button fz="md" variant="rocketSubtle" c={buttonTextColor} component={Link} to="/search">
                Job Board
              </Button>

              {loggedIn && user?.profileType === 'jobseeker' && (
                <Button
                  fz="md"
                  variant="rocketSubtle"
                  c={buttonTextColor}
                  component={Link}
                  to="/favorites"
                >
                  Favorites
                </Button>
              )}

              {loggedIn && user?.profileType === 'jobseeker' && (
                <Button
                  fz="md"
                  variant="rocketSubtle"
                  c={buttonTextColor}
                  component={Link}
                  to="/my-applications"
                >
                  Applications
                </Button>
              )}

              {loggedIn && user?.profileType === 'business' && (
                <Button
                  fz="md"
                  variant="rocketSubtle"
                  c={buttonTextColor}
                  component={Link}
                  to="/dashboard"
                >
                  Dashboard
                </Button>
              )}

              <Button fz="md" variant="rocketSubtle" c={buttonTextColor} component={Link} to="/about">
                About Us
              </Button>

              {user?.isAdmin && (
                <Button fz="md" variant="rocketSubtle" c={buttonTextColor} component={Link} to="/admin">
                  Admin Controls
                </Button>
              )}
            </Group>
          </nav>

          <Group>
            <Group visibleFrom="xs">
              {/* rocketSubtle/Dark mode toggle - desktop */}
              <LightDarkToggle />

              {!loggedIn && (
                <Button
                  component={Link}
                  to="/login"
                  variant="rocketOutline"
                >
                  Login
                </Button>
              )}
              {!loggedIn && (
                <Button component={Link} to="/register" variant="rocketFilled">
                  Register
                </Button>
              )}

              {/* ACCESSIBILITY: Icon-only button needs aria-label for screen readers
                  The tooltip is visual-only and not accessible to keyboard/screen reader users */}
              {isBusinessUser && (
                <ActionIcon
                  variant="subtle"
                  size="35px"
                  radius="md"
                  onClick={() => jumpTo('/create-listing')}
                  aria-label="Create new job listing"
                >
                  <Tooltip
                    label="New listing"
                    py={2}
                    px={8}
                    radius="md"
                    offset={10}
                    fz={12}
                    bg="rocketYellow.1"
                    c="black"
                  >
                    <IconPlus stroke={3} aria-hidden="true" />
                  </Tooltip>
                </ActionIcon>
              )}

              {loggedIn && (
                <Button
                  variant="rocketOutline"                  
                  onClick={logoutHandler}
                >
                  Logout
                </Button>
              )}
            </Group>

            <Group>
              {loggedIn && !isMobile && (
                <Button
                  variant="rocketOutline"
                  onClick={() => {
                    dispatch(toggleAdminView(false));
                    jumpTo(`/edit-profile/${user?._id}`);
                  }}
                >
                  My Account
                </Button>
              )}

              {/* rocketSubtle/Dark mode toggle - mobile (next to burger) */}
              <Box hiddenFrom="xs">
                <LightDarkToggle />
              </Box>

              {/* ACCESSIBILITY: Burger menu needs aria-label and aria-expanded for screen readers
                  aria-expanded tells screen readers if the mobile menu is currently open */}
              <Burger
                c={buttonTextColor}
                opened={drawerOpened}
                onClick={toggleDrawer}
                hiddenFrom="md"
                aria-label={drawerOpened ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={drawerOpened}
                aria-controls="mobile-navigation-drawer"
              />
            </Group>
          </Group>
        </Flex>
        <Divider
          size="xs"
          color={
            computedColorScheme === 'light'
              ? 'var(--mantine-color-rocketGray-4)'
              : 'var(--mantine-color-rocketBlack-6)'
          }
        />
      </header>

      {/* ACCESSIBILITY: Mobile navigation drawer needs proper ARIA attributes
          aria-label identifies the drawer's purpose for screen readers
          Mantine Drawer already includes role="dialog" and aria-modal="true" */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="60%"
        padding="md"
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <img src="/rocketGradient-180px-square-noBG.png" height={30} alt="JobRocket Logo" />
            JobRocket
          </div>
        }
        hiddenFrom="md"
        zIndex={1000000}
        aria-label="Mobile navigation menu"
        id="mobile-navigation-drawer"
      >
        <ScrollArea h="calc(100vh - 80px" mx="-sm">
          <Divider />
          <Stack my={20} gap={5}>
            <Button
              fz="md"
              variant="rocketSubtle"
              component={Link}
              to="/"
              onClick={closeDrawer}
            >
              Home
            </Button>

            <Button
              fz="md"
              variant="rocketSubtle"
              component={Link}
              to="/search"
              onClick={closeDrawer}
            >
              Job Board
            </Button>

            {loggedIn && user?.profileType === 'jobseeker' && (
              <Button
                fz="md"
                variant="rocketSubtle"
                component={Link}
                to="/favorites"
                onClick={closeDrawer}
              >
                Favorites
              </Button>
            )}

            {loggedIn && user?.profileType === 'jobseeker' && (
              <Button
                fz="md"
                variant="rocketSubtle"
                component={Link}
                to="/my-applications"
                onClick={closeDrawer}
              >
                Applications
              </Button>
            )}

            {loggedIn && user?.profileType === 'business' && (
              <Button
                fz="md"
                variant="rocketSubtle"
                component={Link}
                to="/dashboard"
                onClick={closeDrawer}
              >
                Dashboard
              </Button>
            )}

            <Button
              fz="md"
              variant="rocketSubtle"
              component={Link}
              to="/about"
              onClick={closeDrawer}
            >
              About Us
            </Button>

            {user?.isAdmin && (
              <Button
                fz="md"
                variant="rocketSubtle"
                component={Link}
                to="/admin"
                onClick={closeDrawer}
              >
                Admin Controls
              </Button>
            )}
          </Stack>
          <Divider my="md" />

          <Flex justify="space-evenly" ta="center" mx="auto" p="sm" gap={5} direction="column">
            {!loggedIn && (
              <Button
                variant="rocketOutline"
                component={Link}
                to="/login"
                onClick={closeDrawer}
                
              >
                Login
              </Button>
            )}

            {!loggedIn && (
              <Button
                variant="rocketFilled"
                component={Link}
                to="/register"
                onClick={closeDrawer}
              >
                Register
              </Button>
            )}

            {loggedIn && (
              <Button
                variant="rocketFilled"
                onClick={() => {
                  logoutHandler();
                  closeDrawer();
                }}
              >
                Logout
              </Button>
            )}

            {loggedIn && (
              <Button
                variant="rocketOutline"
                onClick={() => {
                  dispatch(toggleAdminView(false));
                  jumpTo(`/edit-profile/${user?._id}`);
                  closeDrawer();
                }}
              >
                My Account
              </Button>
            )}
          </Flex>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
