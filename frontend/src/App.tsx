import '@mantine/core/styles.css';
import './App.css';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { MantineProvider } from '@mantine/core';
import { AppRouter } from './routing/AppRouter';
import { persistor, store } from './store/store';
import { theme } from './theme';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRouter />
        </PersistGate>
      </Provider>
    </MantineProvider>
  );
}
