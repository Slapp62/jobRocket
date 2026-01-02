import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Flex } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { AuthContext } from '@/context/AuthContext';
import { MobileBottomNav } from '@/components/Navigation/MobileNav.tsx';
import { useScrollToTop } from '@/hooks/useScrollToTop.ts';
import { useSessionRestore } from '@/hooks/useSessionRestore.ts';
import { trackPageView } from '@/utils/analytics';
import { AnnouncementBanner } from '../components/Navigation/AnnouncementBanner.tsx';
import { Footer } from '../components/Navigation/Footer.tsx';
import { Navbar } from '../components/Navigation/Header.tsx';

export function Layout() {
  const isMobile = useMediaQuery('(max-width: 700px)');
  const navigate = useNavigate();
  const location = useLocation();

  // Restore user session from localStorage on app load (runs once)
  // Also populates Redux from valid session (e.g., after Google OAuth redirect)
  const { isInitializing } = useSessionRestore();

  // Track page views when route changes
  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location.pathname, location.search]);

  // Ensure top scrolled on page change
  useScrollToTop();

  return (
    <AuthContext.Provider value={{ isInitializing }}>
      {/* ACCESSIBILITY: Skip to main content link - allows keyboard users to bypass navigation
          This is legally required under WCAG 2.0 Level AA (Israeli Standard 5568)
          The link is hidden off-screen until focused via keyboard (Tab key) */}
      <a
        href="#main-content"
        style={{
          position: 'absolute',
          left: '-9999px',
          zIndex: 999,
          padding: '1em',
          backgroundColor: '#fff',
          border: '2px solid #000',
          textDecoration: 'none',
          fontWeight: 'bold',
          color: '#000',
        }}
        onFocus={(e) => {
          e.currentTarget.style.left = '0';
          e.currentTarget.style.top = '0';
        }}
        onBlur={(e) => {
          e.currentTarget.style.left = '-9999px';
        }}
      >
        Skip to main content
      </a>

      {/* Announcement Banner - displayed site-wide above header */}
      <AnnouncementBanner
        id="welcome-2025"
        message="We are still testing features. If you notice something that doesn't work, please let us know."
        actionText="Contact Us"
        onAction={() => navigate('/about#contact')}
      />

      <Flex direction="column" mih="100vh">
        {/* ACCESSIBILITY: Header landmark - identifies the site banner/header region
            The role="banner" helps screen reader users navigate the page structure */}
        <header role="banner">
          <Navbar />
        </header>

        {/* ACCESSIBILITY: Main landmark with ID for skip link
            The role="main" identifies the primary content area
            The id="main-content" is the target for the skip link above */}
        <main role="main" id="main-content" style={{ flex: 1, margin: 0 }}>
          <Outlet />
        </main>

        {/* ACCESSIBILITY: Footer landmark - identifies the site footer region
            The role="contentinfo" helps screen reader users find footer content */}
        <footer role="contentinfo">
          <Footer />
        </footer>

        {isMobile && <MobileBottomNav />}
      </Flex>
    </AuthContext.Provider>
  );
}
