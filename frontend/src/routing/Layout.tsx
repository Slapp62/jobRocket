import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Flex } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { MobileBottomNav } from '@/components/Navigation/MobileNav.tsx';
import { useAuthInit } from '@/hooks/UseAuthInit.ts';
import { useScrollToTop } from '@/hooks/useScrollToTop.ts';
import { RootState } from '@/store/store.ts';
import { Footer } from '../components/Navigation/Footer.tsx';
import { Navbar } from '../components/Navigation/Header.tsx';

export function Layout() {
  const isMobile = useMediaQuery('(max-width: 700px)');
  const isBusiness = useSelector(
    (state: RootState) => state.userSlice.user?.profileType === 'business'
  );

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

        {isMobile && isBusiness && <MobileBottomNav />}

        <ToastContainer
          position={isMobile ? 'top-right' : 'bottom-right'}
          toastClassName="custom-toast"
          newestOnTop={!isMobile}
          theme="light"
          autoClose={3000}
          closeOnClick
        />
      </Flex>
    </>
  );
}
