import { useEffect, useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import axios from 'axios';
import clsx from 'clsx';
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
  Text,
  Tooltip,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { AppDispatch, RootState } from '@/store/store';
import { clearUser } from '@/store/userSlice';
import bgStyles from '@/styles/bgStyles.module.css';
import { AvatarIcon } from './Avatar';
import { Logo } from './Logo';
import classes from '../ComponentStyles/Header.module.css';

export function Navbar() {
  const user = useSelector((state: RootState) => state.userSlice.user);
  const isMobile = useMediaQuery('(max-width: 726px)');
  const loggedIn = useSelector((state: RootState) => state.userSlice.isLoggedIn);
  const isBusinessUser = user?.profileType === 'business';
  const dispatch = useDispatch<AppDispatch>();

  const jumpTo = useNavigate();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

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
    <Box bg="rocketRed.7" pos="sticky" pt={5}>
      <header>
        <Flex justify="space-between" align="center" h="100%" px="sm">
          <Logo />

          <Group visibleFrom="md" gap={5}>
            <Button fz="md" variant="subtle" c="white" component={Link} to="/">
              Home
            </Button>
            <Button fz="md" variant="subtle" c="white" component={Link} to="/search">
              Job Board
            </Button>

            {loggedIn && user?.profileType === 'jobseeker' && (
              <Button fz="md" variant="subtle" c="white" component={Link} to="/favorites">
                Favorites
              </Button>
            )}

            {loggedIn && user?.profileType === 'jobseeker' && (
              <Button fz="md" variant="subtle" c="white" component={Link} to="/my-applications">
                Applications
              </Button>
            )}

            {loggedIn && user?.profileType === 'business' && (
              <Button fz="md" variant="subtle" c="white" component={Link} to="/dashboard">
                Dashboard
              </Button>
            )}

            <Button fz="md" variant="subtle" c="white" component={Link} to="/about">
              About Us
            </Button>

            {user?.isAdmin && (
              <Button fz="md" variant="subtle" c="white" component={Link} to="/admin">
                Admin Controls
              </Button>
            )}
          </Group>

          <Group>
            <Group visibleFrom="xs">
              {!loggedIn && (
                <Button component={Link} to="/login" variant="outline" color="white">
                  Login
                </Button>
              )}
              {!loggedIn && (
                <Button component={Link} to="/register" variant="rocketOrangeFilled">
                  Register
                </Button>
              )}

              {isBusinessUser && (
                <ActionIcon
                  variant="outline"
                  color="white"
                  size="35px"
                  radius="md"
                  onClick={() => jumpTo('/create-listing')}
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
                    <IconPlus stroke={3} />
                  </Tooltip>
                </ActionIcon>
              )}

              {loggedIn && (
                <Button variant="outline" color="white" onClick={logoutHandler}>
                  Logout
                </Button>
              )}
            </Group>

            <Group>
              {loggedIn && !isMobile && <AvatarIcon />}
              <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="md" />
            </Group>
          </Group>
        </Flex>
      </header>

      {/* MobileView */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="60%"
        padding="md"
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <img src="/flavicon-color.png" height={30} alt="JobRocket Logo" />
            JobRocket
          </div>
        }
        hiddenFrom="md"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-sm">
          <Divider />
          <Stack my={20} gap={5}>
            <Button fz="md" variant="subtle" c="rocketRed" component={Link} to="/" onClick={closeDrawer}>
              Home
            </Button>
            <Button fz="md" variant="subtle" c="rocketRed" component={Link} to="/search" onClick={closeDrawer}>
              Job Board
            </Button>

            {loggedIn && user?.profileType === 'jobseeker' && (
              <Button fz="md" variant="subtle" c="rocketRed" component={Link} to="/favorites" onClick={closeDrawer}>
                Favorites
              </Button>
            )}

            {loggedIn && user?.profileType === 'jobseeker' && (
              <Button fz="md" variant="subtle" c="rocketRed" component={Link} to="/my-applications" onClick={closeDrawer}>
                Applications
              </Button>
            )}

            {loggedIn && user?.profileType === 'business' && (
              <Button fz="md" variant="subtle" c="rocketRed" component={Link} to="/dashboard" onClick={closeDrawer}>
                Dashboard
              </Button>
            )}

            <Button fz="md" variant="subtle" c="rocketRed" component={Link} to="/about" onClick={closeDrawer}>
              About Us
            </Button>

            {user?.isAdmin && (
              <Button fz="md" variant="subtle" c="rocketRed" component={Link} to="/admin" onClick={closeDrawer}>
                Admin Controls
              </Button>
            )}
          </Stack>
          <Divider my="md" />

          <Flex justify="space-evenly" ta="center" p="sm" gap={5} direction="column">
            {!loggedIn && (
              <Button
                component={Link}
                to="/login"
                color="rocketOrange"
                onClick={closeDrawer}
                w="95%"
                variant="outline"
              >
                Login
              </Button>
            )}

            {!loggedIn && (
              <Button
                w="95%"
                variant="rocketRedFilled"
                component={Link}
                to="/register"
                onClick={closeDrawer}
              >
                Register
              </Button>
            )}

            {loggedIn && (
              <Button
                color="dark"
                variant="outline"
                onClick={() => {
                  logoutHandler();
                  closeDrawer();
                }}
              >
                Logout
              </Button>
            )}
          </Flex>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
