import { IconCards, IconDashboard, IconFile, IconForms, IconHeart, IconLayoutDashboard, IconLogin, IconLogin2, IconPlus, IconRegistered, IconSearch, IconUser, IconUserSearch } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ActionIcon, Group, Stack, Text } from '@mantine/core';
import { RootState } from '@/store/store';

export const MobileBottomNav = () => {
  const isAdmin = useSelector((state: RootState) => state.userSlice.user?.isAdmin);
  const isBusiness = useSelector((state: RootState) => state.userSlice.user?.profileType === 'business');
  const isJobseeker = useSelector((state: RootState) => state.userSlice.user?.profileType === 'jobseeker');
  const isLoggedIn = useSelector((state: RootState) => state.userSlice.user);

  return (
    // ACCESSIBILITY: Wrap mobile navigation in nav element with aria-label
    // This helps screen reader users identify this as the mobile navigation
    <nav aria-label="Mobile bottom navigation">
      <Group
        pos="fixed"
        bottom={0}
        bg="white"
        w="100%"
        justify="space-evenly"
        align="center"
        h={60}
        style={{ borderTop: '1px solid rgba(0, 0, 0, 0.11)', zIndex: 999 }}
      >
      {/* ACCESSIBILITY: Each icon button needs aria-label since visual text is separate
          The Text component provides visual label but isn't connected to the button */}
      <Stack justify="center" align="center" gap={0}>
        <ActionIcon
          component={Link}
          bg='rocketOrange.1'
          to="/search"
          variant="subtle"
          color="rocketRed"
          radius={10}
          size={30}
          style={{ boxShadow: '0px 0px 5px 2px rgba(0, 0, 0, 0.11)' }}
          aria-label="Job Board"
        >
          <IconSearch aria-hidden="true" />
        </ActionIcon>
        <Text c="rocketRed" fz='xs' aria-hidden="true">Job Board</Text>
      </Stack>

      {!isLoggedIn && (
        <Stack justify="center" align="center" gap={0}>
        <ActionIcon
          component={Link}
          bg='rocketOrange.1'
          to="/login"
          variant="subtle"
          color="rocketRed"
          radius={10}
          size={30}
          style={{ boxShadow: '0px 0px 5px 2px rgba(0, 0, 0, 0.11)' }}
          aria-label="Login"
        >
          <IconLogin aria-hidden="true" />
        </ActionIcon>
        <Text c="rocketRed" fz='xs' aria-hidden="true">Login</Text>
      </Stack>
      )}
      
      {!isLoggedIn && (
        <Stack justify="center" align="center" gap={0}>
        <ActionIcon
          component={Link}
          bg='rocketOrange.1'
          to="/register"
          variant="subtle"
          color="rocketRed"
          radius={10}
          size={30}
          style={{ boxShadow: '0px 0px 5px 2px rgba(0, 0, 0, 0.11)' }}
          aria-label="Register"
        >
          <IconUser aria-hidden="true" />
        </ActionIcon>
        <Text c="rocketRed" fz='xs' aria-hidden="true">Register</Text>
      </Stack>
      )}

      {isJobseeker &&
      <Stack justify="center" align="center" gap={0}>
      <ActionIcon
        component={Link}
        bg='rocketOrange.1'
        to="/favorites"
        variant="subtle"
        color="rocketRed"
        radius={10}
        size={40}
        style={{ boxShadow: '0px 0px 5px 2px rgba(0, 0, 0, 0.11)' }}
        aria-label="Favorites"
      >
        <IconHeart aria-hidden="true" />
      </ActionIcon>
      <Text c="rocketRed" fz='xs' aria-hidden="true">Favorites</Text>
      </Stack>}

      {isJobseeker &&
      <Stack justify="center" align="center" gap={0}>
      <ActionIcon
        component={Link}
        bg='rocketOrange.1'
        to="/my-applications"
        variant="subtle"
        color="rocketRed"
        radius={10}
        size={40}
        style={{ boxShadow: '0px 0px 5px 2px rgba(0, 0, 0, 0.11)' }}
        aria-label="Applications"
      >
        <IconFile aria-hidden="true" />
      </ActionIcon>
      <Text c="rocketRed" fz='xs' aria-hidden="true">Applications</Text>
      </Stack>}

      {isBusiness &&
      <Stack justify="center" align="center" gap={0}>
      <ActionIcon
        component={Link}
        bg='rocketOrange.1'
        to="/dashboard"
        variant="subtle"
        color="rocketRed"
        radius={10}
        size={40}
        style={{ boxShadow: '0px 0px 5px 2px rgba(0, 0, 0, 0.11)' }}
        aria-label="Dashboard"
      >
        <IconLayoutDashboard aria-hidden="true" />
      </ActionIcon>
      <Text c="rocketRed" fz='xs' aria-hidden="true">Dashboard</Text>
      </Stack>}

      {isBusiness &&
        <Stack justify="center" align="center" gap={0}>
        <ActionIcon
          component={Link}
          bg='rocketOrange.1'
          to="/create-listing"
          variant="subtle"
          color="rocketRed"
          radius={10}
          size={40}
          style={{ boxShadow: '0px 0px 5px 2px rgba(0, 0, 0, 0.11)' }}
          aria-label="Create new job listing"
        >
          <IconPlus aria-hidden="true" />
        </ActionIcon>
        <Text c="rocketRed" fz='xs' aria-hidden="true">Create Listing</Text>
        </Stack>
      }

      {isAdmin &&
        <Stack justify="center" align="center" gap={0}>
        <ActionIcon
            component={Link}
            bg='rocketOrange.1'
            to="/admin"
            variant="subtle"
            color="black"
            radius={10}
            size={40}
            style={{ boxShadow: '0px 0px 5px 2px rgba(0, 0, 0, 0.11)' }}
            aria-label="Admin controls"
          >
            <IconUserSearch aria-hidden="true" />
          </ActionIcon>
          <Text c="rocketRed" fz='xs' aria-hidden="true">Admin</Text>
        </Stack>
      }
      </Group>
    </nav>
  );
};
