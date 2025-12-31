import {
  IconFile,
  IconHeart,
  IconLayoutDashboard,
  IconLogin,
  IconPlus,
  IconSearch,
  IconUser,
  IconUserSearch,
} from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { Group, useComputedColorScheme } from '@mantine/core';
import { RootState } from '@/store/store';
import { MobileNavIcon } from './MobileNavIcon';

export const MobileBottomNav = () => {
  const isAdmin = useSelector((state: RootState) => state.userSlice.user?.isAdmin);
  const isBusiness = useSelector(
    (state: RootState) => state.userSlice.user?.profileType === 'business'
  );
  const isJobseeker = useSelector(
    (state: RootState) => state.userSlice.user?.profileType === 'jobseeker'
  );
  const isLoggedIn = useSelector((state: RootState) => state.userSlice.user);
  const computedColorScheme = useComputedColorScheme('light');

  // Theme-aware colors for navigation bar
  const isDark = computedColorScheme === 'dark';
  const bgColor = isDark ? 'rocketBlack.9' : 'white';
  const borderColor = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.11)';

  return (
    <nav aria-label="Mobile bottom navigation">
      <Group
        pos="fixed"
        bottom={0}
        bg={bgColor}
        w="100%"
        justify="space-evenly"
        align="center"
        h={68}
        px="xs"
        style={{
          borderTop: `1px solid ${borderColor}`,
          zIndex: 999,
          boxShadow: isDark ? '0 -2px 8px rgba(0, 0, 0, 0.3)' : '0 -2px 8px rgba(0, 0, 0, 0.08)',
        }}
      >
        {/* Job Board - Always visible */}
        <MobileNavIcon icon={IconSearch} label="Job Board" to="/search" />

        {/* Not logged in users */}
        {!isLoggedIn && (
          <>
            <MobileNavIcon icon={IconLogin} label="Login" to="/login" />
            <MobileNavIcon icon={IconUser} label="Register" to="/register"  />
          </>
        )}

        {/* Jobseeker navigation */}
        {isJobseeker && (
          <>
            <MobileNavIcon icon={IconHeart} label="Favorites" to="/favorites" />
            <MobileNavIcon icon={IconFile} label="Applications" to="/my-applications" />
          </>
        )}

        {/* Business navigation */}
        {isBusiness && (
          <>
            <MobileNavIcon icon={IconLayoutDashboard} label="Dashboard" to="/dashboard" />
            <MobileNavIcon icon={IconPlus} label="Create Listing" to="/create-listing" />
          </>
        )}

        {/* Admin navigation */}
        {isAdmin && <MobileNavIcon icon={IconUserSearch} label="Admin" to="/admin" />}
      </Group>
    </nav>
  );
};
