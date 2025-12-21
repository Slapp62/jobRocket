import { IconCards, IconDashboard, IconFile, IconForms, IconHeart, IconLayoutDashboard, IconLogin, IconLogin2, IconPlus, IconRegistered, IconSearch, IconUser, IconUserSearch } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ActionIcon, Group } from '@mantine/core';
import { RootState } from '@/store/store';

export const MobileBottomNav = () => {
  const isAdmin = useSelector((state: RootState) => state.userSlice.user?.isAdmin);
  const isBusiness = useSelector((state: RootState) => state.userSlice.user?.profileType === 'business');
  const isJobseeker = useSelector((state: RootState) => state.userSlice.user?.profileType === 'jobseeker');
  const isLoggedIn = useSelector((state: RootState) => state.userSlice.user);

  return (
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
      <ActionIcon
        component={Link}
        bg='rocketOrange.1'
        to="/search"
        variant="subtle"
        color="rocketRed"
        radius={10}
        size={35}
        style={{ boxShadow: '0px 0px 5px 2px rgba(0, 0, 0, 0.11)' }}
      >
        <IconSearch />
      </ActionIcon>

      {!isLoggedIn && <ActionIcon
        component={Link}
        bg='rocketOrange.1'
        to="/login"
        variant="subtle"
        color="rocketRed"
        radius={10}
        size={40}
        style={{ boxShadow: '0px 0px 5px 2px rgba(0, 0, 0, 0.11)' }}
      >
        <IconLogin />
      </ActionIcon>}

      {!isLoggedIn && <ActionIcon
        component={Link}
        bg='rocketOrange.1'
        to="/register"
        variant="subtle"
        color="rocketRed"
        radius={10}
        size={40}
        style={{ boxShadow: '0px 0px 5px 2px rgba(0, 0, 0, 0.11)' }}
      >
        <IconUser />
      </ActionIcon>}

      {isJobseeker && <ActionIcon
        component={Link}
        bg='rocketOrange.1'
        to="/favorites"
        variant="subtle"
        color="rocketRed"
        radius={10}
        size={40}
        style={{ boxShadow: '0px 0px 5px 2px rgba(0, 0, 0, 0.11)' }}
      >
        <IconHeart />
      </ActionIcon>}

      {isJobseeker && <ActionIcon
        component={Link}
        bg='rocketOrange.1'
        to="/my-applications"
        variant="subtle"
        color="rocketRed"
        radius={10}
        size={40}
        style={{ boxShadow: '0px 0px 5px 2px rgba(0, 0, 0, 0.11)' }}
      >
        <IconFile />
      </ActionIcon>}

      {isBusiness && <ActionIcon
        component={Link}
        bg='rocketOrange.1'
        to="/dashboard"
        variant="subtle"
        color="rocketRed"
        radius={10}
        size={40}
        style={{ boxShadow: '0px 0px 5px 2px rgba(0, 0, 0, 0.11)' }}
      >
        <IconLayoutDashboard />
      </ActionIcon>}

      {isBusiness && <ActionIcon
        component={Link}
        bg='rocketOrange.1'
        to="/create-listing"
        variant="subtle"
        color="rocketRed"
        radius={10}
        size={40}
        style={{ boxShadow: '0px 0px 5px 2px rgba(0, 0, 0, 0.11)' }}
      >
        <IconPlus />
      </ActionIcon>}

      {isAdmin && <ActionIcon
          component={Link}
          bg='rocketOrange.1'
          to="/admin"
          variant="subtle"
          color="black"
          radius={10}
          size={40}
          style={{ boxShadow: '0px 0px 5px 2px rgba(0, 0, 0, 0.11)' }}
        >
          <IconUserSearch />
        </ActionIcon>
      }
    </Group>
  );
};
