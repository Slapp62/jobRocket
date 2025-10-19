import {
  Box, Burger, Button, Divider, Drawer, Flex, Text, Group, ScrollArea,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '../ComponentStyles/Navigation.module.css';
import { LightDarkToggle } from './LightDarkToggle'
import { Logo } from './Logo';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { clearUser } from '@/store/userSlice';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { AvatarIcon } from './Avatar';
  
  export function Navbar() {
    const user = useSelector((state: RootState) => state.userSlice.user);
    const loggedIn = useSelector((state: RootState) => state.userSlice.isLoggedIn)
    const isBusinessUser = user?.isBusiness;
    const dispatch = useDispatch<AppDispatch>();
    
    const jumpTo = useNavigate();
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const { colorScheme } = useMantineColorScheme();
  
    const logoutHandler = () => {
      jumpTo('/');
      dispatch(clearUser());
      sessionStorage.removeItem('token');
      localStorage.removeItem('token');
      toast.success('Logged out successfully!');
    }

    const [scrolled, setScrolled] = useState(false);
    
    useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 10);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    return (
      <Box pos="sticky" className={clsx(classes.navbarTop, {[classes.navbarScrolled]: scrolled} )}>
        <header className={clsx(colorScheme === 'light' ? classes.navbarLight : classes.navbarDark, classes.header)}>
          <Flex justify="space-between" h='100%' >
            <Logo/>

            <Group visibleFrom="md" gap={5}>
                <Link  to="/" className={classes.link}>
                    <Text fw={700}>Home</Text>
                </Link>

                <Link to="/about" className={classes.link} >
                    <Text fw={700}>About</Text>
                </Link>

                {loggedIn && ( 
                <Link to="/favorites" className={classes.link} >
                    <Text fw={700}>Favorites</Text>
                </Link>)}

                {loggedIn && isBusinessUser && (
                <Link to="/my-listings" className={classes.link} >
                    <Text fw={700}>My Listings</Text>
                </Link>)}
                
                {user?.isAdmin && (
                <Link to='/admin' className={classes.link}>
                    <Text fw={700}>Admin Controls</Text>
                </Link>)}
            </Group>

            <Group>
              <Group visibleFrom="xs">
                {!loggedIn && <Button component={Link} to='/login' variant="outline">Login</Button>}
                {!loggedIn && <Button component={Link} to='/register'>Register</Button>}

                {loggedIn && <Button variant="outline" onClick={logoutHandler}>Logout</Button>}
              </Group>

              <Group >
                {loggedIn && <AvatarIcon/>}
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
        <ScrollArea h="calc(100vh - 80px" mx="-sm" >
            <Divider/>
                <Flex direction="column" my={20}>
                    {loggedIn && 
                    <Group my="md" pl='md' align='self-end'>
                        <AvatarIcon closeDrawer={closeDrawer}/>
                        <Text fz={15}>{user?.name.first} {user?.name.last}</Text>
                    </Group>}

                    <Link to="/" className={classes.link} onClick={closeDrawer}>
                        <Text fz={15} c='indigo' fw={700}>HOME</Text>
                    </Link>

                    <Link to="/about" className={classes.link} onClick={closeDrawer}>
                        <Text fz={15}  c='indigo' fw={700}>ABOUT</Text>
                    </Link>

                    {loggedIn &&  <Link to="/favorites" className={classes.link} onClick={closeDrawer}>
                        <Text fz={15}  c='indigo'  fw={700}>FAVORITES</Text>
                    </Link>}

                    {user?.isBusiness && <Link to="/my-listings" className={classes.link} onClick={closeDrawer} >
                        <Text fz={15}  c='indigo'  fw={700}>MY LISTINGS</Text>
                    </Link>}
                    
                    {user?.isAdmin && <Link to='/admin' className={classes.link} onClick={closeDrawer}>
                        <Text fz={15}  c='indigo'  fw={700}>ADMIN CONTROLS</Text>
                    </Link>}
                </Flex>
            <Divider my="md" />

            

            <Flex justify="space-evenly" ta="center" p="sm" gap={5} direction="column">
              {!loggedIn && 
               <Button component={Link} to='/login' onClick={closeDrawer} w="95%" variant="outline">Login</Button>}

              {!loggedIn && 
              <Button w="95%" component={Link} to='/register' onClick={closeDrawer}>Register</Button>}

              {loggedIn && 
                <Button variant="outline" onClick={() => {
                    logoutHandler(); 
                    closeDrawer()}}
                >Logout
                </Button>}
            </Flex>
          </ScrollArea>
        </Drawer>
      </Box>
    
    );
  }