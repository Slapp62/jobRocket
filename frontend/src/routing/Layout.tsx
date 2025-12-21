import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { Flex } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { MobileBottomNav } from '@/components/Navigation/MobileNav.tsx';
import { useAuthInit } from '@/hooks/UseAuthInit.ts';
import { useScrollToTop } from '@/hooks/useScrollToTop.ts';
import { AppDispatch, RootState } from '@/store/store.ts';
import { setupAxiosInterceptors } from '@/utils/axiosConfig.ts';
import { Footer } from '../components/Navigation/Footer.tsx';
import { Navbar } from '../components/Navigation/Header.tsx';

export function Layout() {
  const isMobile = useMediaQuery('(max-width: 700px)');
  const isBusiness = useSelector(
    (state: RootState) => state.userSlice.user?.profileType === 'business'
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Setup axios interceptors once on mount
  useEffect(() => {
    setupAxiosInterceptors(dispatch, navigate);
  }, [dispatch, navigate]);

  // persist log in between sessions
  useAuthInit();

  //ensure top scrolled on page change
  useScrollToTop();

  return (
    <>
      <Flex direction="column" mih="100vh">
        <Navbar />

        <main style={{ flex: 1, margin: 0 }}>
          <Outlet />
        </main>

        <Footer />

        {isMobile && <MobileBottomNav />}
      </Flex>
    </>
  );
}
