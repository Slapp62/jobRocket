import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './App.css';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { localStorageColorSchemeManager, MantineProvider } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';
import { AppRouter } from './routing/AppRouter';
import { persistor, store } from './store/store';
import { theme } from './theme';

const colorSchemeManager = localStorageColorSchemeManager({
  key: 'jobrocket-color-scheme',
});

export default function App() {
  const isMobile = useMediaQuery('(max-width: 726px)');

  return (
    <MantineProvider theme={theme} colorSchemeManager={colorSchemeManager} defaultColorScheme="auto">
      <Notifications position={isMobile ? "top-center" : "bottom-right"} />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRouter />
        </PersistGate>
      </Provider>
    </MantineProvider>
  );
}
