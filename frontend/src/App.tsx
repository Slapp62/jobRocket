import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './App.css';

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { localStorageColorSchemeManager, MantineProvider } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';
import { AppRouter } from './routing/AppRouter';
import { persistor, store } from './store/store';
import { theme, cssVariablesResolver } from './theme';
import { CookieBanner } from './components/CookieBanner/CookieBanner';
import { initializeGoogleAnalytics, trackError } from './utils/analytics';

const colorSchemeManager = localStorageColorSchemeManager({
  key: 'jobrocket-color-scheme',
});

export default function App() {
  const isMobile = useMediaQuery('(max-width: 726px)');

  // Initialize Google Analytics when app loads (if user previously consented)
  useEffect(() => {
    initializeGoogleAnalytics();

    // Listen for consent changes from CookieBanner
    const handleConsentChange = () => {
      initializeGoogleAnalytics();
    };

    // Global error handler for uncaught JavaScript errors
    const handleError = (event: ErrorEvent) => {
      console.error('Uncaught error:', event.error);
      trackError(event.error || event.message, {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      });
    };

    // Global handler for unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
      trackError(event.reason || 'Unhandled Promise Rejection', {
        type: 'unhandled_rejection',
      });
    };

    window.addEventListener('cookieConsentUpdated', handleConsentChange);
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('cookieConsentUpdated', handleConsentChange);
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return (
    <MantineProvider theme={theme} colorSchemeManager={colorSchemeManager} defaultColorScheme="auto" cssVariablesResolver={cssVariablesResolver}>
      <Notifications position={isMobile ? "top-center" : "bottom-right"} />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRouter />
          <CookieBanner />
        </PersistGate>
      </Provider>
    </MantineProvider>
  );
}
