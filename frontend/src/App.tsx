import '@mantine/core/styles.css';
import './App.css'; 
import { MantineProvider } from '@mantine/core';
import { AppRouter } from './routing/AppRouter';
import { theme } from './theme';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {

  return (
    <MantineProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <AppRouter/>
        </PersistGate>
      </Provider>
    </MantineProvider>
  );
}
