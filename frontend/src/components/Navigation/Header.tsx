import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Flex,
  Group,
  ScrollArea,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { AppDispatch, RootState } from '@/store/store';
import { clearUser } from '@/store/userSlice';
import { AvatarIcon } from './Avatar';
import { LightDarkToggle } from './LightDarkToggle';
import { Logo } from './Logo';
import classes from '../ComponentStyles/Header.module.css';

export function Navbar() {
  const user = useSelector((state: RootState) => state.userSlice.user);
  const loggedIn = useSelector((state: RootState) => state.userSlice.isLoggedIn);
  const isBusinessUser = user?.profileType === 'business';
  const dispatch = useDispatch<AppDispatch>();

  const jumpTo = useNavigate();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { colorScheme } = useMantineColorScheme();

  const logoutHandler = () => {
    jumpTo('/');
    dispatch(clearUser());
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
    notifications.show({
      title: 'Success',
      message: 'Logged out successfully!',
      color: 'green',
    });
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
    <Box pos="sticky" className={clsx(classes.navbarTop, { [classes.navbarScrolled]: scrolled })}>
      <header
        className={clsx(
          colorScheme === 'light' ? classes.navbarLight : classes.navbarDark,
          classes.header
        )}
      >
        <Flex justify="space-between" align="center" h="100%" px={10}>
          <Logo />

          <Group visibleFrom="md" gap={5}>
            <Link to="/" className={classes.link}>
              <Text fw={700}>Home</Text>
            </Link>

            <Link to="/search" className={classes.link}>
              <Text fw={700}>Job Board</Text>
            </Link>

            {loggedIn && (
              <Link to="/favorites" className={classes.link}>
                <Text fw={700}>Favorites</Text>
              </Link>
            )}

            

            {loggedIn && (
              <Link to="/my-applications" className={classes.link}>
                <Text fw={700}>My Applications</Text>
              </Link>
            )}

            {loggedIn && isBusinessUser && (
              <Link to="/my-listings" className={classes.link}>
                <Text fw={700}>My Listings</Text>
              </Link>
            )}

            <Link to="/about" className={classes.link}>
              <Text fw={700}>About</Text>
            </Link>
            
            {user?.isAdmin && (
              <Link to="/admin" className={classes.link}>
                <Text fw={700}>Admin Controls</Text>
              </Link>
            )}
          </Group>

          <Group>
            <Group visibleFrom="xs">
              {!loggedIn && (
                <Button component={Link} to="/login" variant="outline" color="blue">
                  Login
                </Button>
              )}
              {!loggedIn && (
                <Button component={Link} to="/register" color="blue" variant="filled">
                  Register
                </Button>
              )}

              {loggedIn && (
                <Button variant="outline" color="black" onClick={logoutHandler}>
                  Logout
                </Button>
              )}
            </Group>

            <Group>
              {loggedIn && <AvatarIcon />}
              <LightDarkToggle />
              <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="md" />
            </Group>
          </Group>
        </Flex>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="60%"
        padding="md"
        title="IsraJobs"
        hiddenFrom="md"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-sm">
          <Divider />
          <Flex direction="column" my={20}>
            {loggedIn && (
              <Group my="md" pl="md" align="self-end">
                <AvatarIcon closeDrawer={closeDrawer} />
                <Text fz={15}>
                  {user?.profileType === 'jobseeker'
                    ? `${user?.jobseekerProfile?.firstName} ${user?.jobseekerProfile?.lastName}`
                    : user?.businessProfile?.name}
                </Text>
              </Group>
            )}

            <Link to="/" className={classes.link} onClick={closeDrawer}>
              <Text fz={15} c="indigo" fw={700}>
                HOME
              </Text>
            </Link>

            <Link to="/about" className={classes.link} onClick={closeDrawer}>
              <Text fz={15} c="indigo" fw={700}>
                ABOUT
              </Text>
            </Link>

            {loggedIn && (
              <Link to="/favorites" className={classes.link} onClick={closeDrawer}>
                <Text fz={15} c="indigo" fw={700}>
                  FAVORITES
                </Text>
              </Link>
            )}

            {user?.profileType === 'business' && (
              <Link to="/my-listings" className={classes.link} onClick={closeDrawer}>
                <Text fz={15} c="indigo" fw={700}>
                  MY LISTINGS
                </Text>
              </Link>
            )}

            {user?.isAdmin && (
              <Link to="/admin" className={classes.link} onClick={closeDrawer}>
                <Text fz={15} c="indigo" fw={700}>
                  ADMIN CONTROLS
                </Text>
              </Link>
            )}
          </Flex>
          <Divider my="md" />

          <Flex justify="space-evenly" ta="center" p="sm" gap={5} direction="column">
            {!loggedIn && (
              <Button
                component={Link}
                to="/login"
                c="black"
                onClick={closeDrawer}
                w="95%"
                variant="outline"
              >
                Login
              </Button>
            )}

            {!loggedIn && (
              <Button w="95%" component={Link} to="/register" onClick={closeDrawer}>
                Register
              </Button>
            )}

            {loggedIn && (
              <Button
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
