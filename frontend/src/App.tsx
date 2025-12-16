import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './App.css';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { AppRouter } from './routing/AppRouter';
import { persistor, store } from './store/store';
import { theme } from './theme';
import { useMediaQuery } from '@mantine/hooks';

export default function App() {
  const isMobile = useMediaQuery('(max-width: 726px)')

  return (
    <MantineProvider theme={theme}>
      <Notifications position={isMobile ? 'top-right' : 'bottom-right'} />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRouter />
        </PersistGate>
      </Provider>
    </MantineProvider>
  );
}
